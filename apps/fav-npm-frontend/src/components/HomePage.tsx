import { useState, FC } from "react";
import { ReuseButton , ReuseLabel, ReuseInputBox} from "@repo/ui";
import { useThrottle } from "./throttle";

interface Favorite {
  name: string;
  description: string;
}

const Homepage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const throttle = useThrottle(query);
  const [selectPKG, setSelectPKG] = useState<string>("");
  const [favReason, setFavReason] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    // Validate if a package is selected
    if (!selectPKG) {
      setErrorMessage("Please select a package from the list.");
      return;
    }
  
    // Validate if a reason is provided
    if (!favReason.trim()) {
      setErrorMessage("Please enter a reason why this is your favorite.");
      return;
    }
  
    // Reset error message
    setErrorMessage("");
  console.log(selectPKG,"select")
    // Create the data object to send in the request body
    const data = {
      name: selectPKG,
      description: favReason
    };
  
    try {
      const response = await fetch("http://localhost:3000/add-fav-packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        await response.json();
        setShowConfirmationModal(true)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add package.");
      }
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package. Please try again.");
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleConfirmation = (confirmed: boolean): void => {
    // Hide the confirmation modal
    setShowConfirmationModal(false);

    // If user clicks "Yes," add the selected package to favorites
    if (confirmed) {
      // Get existing favorites from localStorage or initialize an empty array
      
      const existingFavorites: Favorite[] = JSON.parse(localStorage.getItem("favorites") || "[]");

      // Add the selected package and reason to the array
      const newFavorite: Favorite = {
        name: selectPKG,
        description: favReason,
      };

      // Push the newFavorite object to the existing array
      existingFavorites.push(newFavorite);

      // Store the updated array in localStorage
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));

      alert("Package added to favorites!");
    }
  };

  return (
    <div className="w-4/5 m-auto">
      <strong><ReuseLabel classname="block mb-1 text-left" text={"Search For NPM Packages"} /></strong>
      <ReuseInputBox
        type="text"
        name=""
        classname="mt-1 px-3 py-2 bg-white border border-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Search here"
        value={query}
        handleChange={handleQueryChange}
      />
      <br />
      <strong><ReuseLabel classname="block mb-1 text-left" text={"Results"} /></strong>
      <div className="h-52 overflow-y-auto text-left">
        {throttle?.map((pkg, i) => (
          <label key={i} className="block mb-2.5">
            <ReuseInputBox
              type="radio"
              name="package"
              value={pkg.package.name}
              classname="mr-1.5"
              handleChange={(value) => setSelectPKG(value)}
              checked={selectPKG === pkg.package.name}
            />
            {pkg.package.name}
          </label>
        ))}
      </div>
      <br />
      <br />
      <strong><ReuseLabel classname="block mb-1 text-left" text={"why is this your Fav?"} /></strong>
      <textarea
        rows={4}
        cols={50}
        className="mt-1 px-3 py-2 bg-white border border-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Enter your text here..."
        value={favReason}
        onChange={(e) => setFavReason(e.target.value)}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex justify-end mt-5">
      <ReuseButton
        classname={
          "w-1/7 bg-violet-600 hover:bg-blue-300 px-3 py-1 border-0 rounded text-white"
        }
        text={"Submit"}
        handleSubmit={handleSubmit}
      />
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Are you sure you want to submit?</p>
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
    </div>
  );
};

export default Homepage;
