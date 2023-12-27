import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {ReuseButton}  from "@repo/ui";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Favourite: FC = () => {
  const [favorites, setFavorites] = useState<any>([]);
  const [_, setEditingIndex] = useState<number | null>(null);
  const [updatedReason, setUpdatedReason] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000") // Replace with your server endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFavorites(data.result);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);

  const handleDelete = (index: number): void => {
    const itemToDelete = favorites[index];
    setShowDeleteConfirmation(true);

    fetch(`http://localhost:3000/fav-packages/${itemToDelete.uuid}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });

    // Display the confirmation modal after initiating the delete
    setShowDeleteConfirmation(true);
    setDeleteIndex(index);
  };

  const handleToggleVisibility = (index: number): void => {
    const updatedFavorites:any = [...favorites];
    updatedFavorites[index].isVisible = !updatedFavorites[index].isVisible;
    setFavorites(updatedFavorites);
  };

  const handleToggleEditing = (index: number): void => {
    setEditingIndex(index);
    setUpdatedReason(favorites[index].description);
    const updatedFavorites:any = [...favorites];
    updatedFavorites[index].isEditing = !updatedFavorites[index].isEditing;
    setFavorites(updatedFavorites);
  };

  const handleEditConfirm = (index: number): void => {
    const updatedFavorites:any = [...favorites];
    updatedFavorites[index].description = updatedReason;
    updatedFavorites[index].isEditing = false;
    setFavorites(updatedFavorites);

    const favoriteToUpdate = updatedFavorites[index];
    fetch(
      `http://localhost:3000/fav-packages/${favoriteToUpdate.uuid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteToUpdate),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Updated data from backend:", data);
      })
      .catch((error) => {
        console.error("Error updating favorite:", error);
      });

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setEditingIndex(null);
  };

  const handleEditCancel = (index: number): void => {
    const updatedFavorites:any = [...favorites];
    updatedFavorites[index].isEditing = false;
    setFavorites(updatedFavorites);
    setEditingIndex(null);
  };

  const handleConfirmation = (confirmed: boolean): void => {
    setShowDeleteConfirmation(false);

    if (confirmed && deleteIndex !== null) {
      // Make sure the deleteIndex is valid before proceeding
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(deleteIndex, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Package deleted successfully");
    }

    // Reset the deleteIndex
    setDeleteIndex(null);
  };

  const handleSubmit = (): void => {
    navigate("/");
  };

  return (<>
    <NavBar/>
    <div>
      <div className="flex justify-between m-16 py-1 align-middle w-4/5 mx-auto">
        <h1>Welcome to Favourite NPM Packages</h1>
        <ReuseButton
          classname={
            "w-1/7 bg-violet-600 hover:bg-blue-500 px-3 py-1 border-0 rounded text-white"
          }
          text={"Add Fav"}
          handleSubmit={handleSubmit}
        />
      </div>
      <ul className="border border-black w-80% m-16 py-1 w-4/5 mx-auto">
        <div className="flex justify-around">
          <li>
            <strong>Package name</strong>
          </li>
          <li>
            <strong>Actions</strong>
          </li>
        </div>
        {favorites.map((fav:any, index:any) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-300 p-4"
          >
            <span className="max-w-sm mx-64">{fav.name}</span>
            <div className="flex items-center justify-end space-x-4 border mx-56 gap-2">
              <FontAwesomeIcon
                icon={fav.isVisible ? faEyeSlash : faEye}
                onClick={() => handleToggleVisibility(index)}
                className="cursor-pointer"
                title={fav.isVisible ? "Hide Reason" : "Show Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faCheck : faEdit}
                onClick={() =>
                  fav.isEditing
                    ? handleEditConfirm(index)
                    : handleToggleEditing(index)
                }
                className="cursor-pointer"
                title={fav.isEditing ? "Confirm Edit" : "Edit Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faTimes : faTrash}
                onClick={() =>
                  fav.isEditing ? handleEditCancel(index) : handleDelete(index)
                }
                className="cursor-pointer"
                title={fav.isEditing ? "Cancel Edit" : "Delete"}
              />
            </div>
            {fav.isVisible && (
              <div className="absolute left-1/4 mt-2 p-2 mx-80 bg-white border border-gray-300 rounded-md">
                <strong>Fav Reason:</strong> {fav.description}
              </div>
            )}
            {fav.isEditing && (
              <div className="absolute left-1/4 mt-2 p-2 bg-white border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={updatedReason}
                  onChange={(e) => setUpdatedReason(e.target.value)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">
              Are you sure you want to delete this package?
            </p>
            <div className="flex justify-between">
              <ReuseButton
                text="Yes"
                handleSubmit={() => handleConfirmation(true)}
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              />
              <ReuseButton
                text="No"
                handleSubmit={() => handleConfirmation(false)}
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div></>
  );
};

export default Favourite;
