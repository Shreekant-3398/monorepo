const baseRepo = requireUtil("baseRepo");
const tablename = "fav_npm_1";

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  return {
    uuid: reqParams.id, // Assuming uuid is passed as a URL parameter
    description: reqBody.description, // Extract description from request body
  };
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  console.log(prepareResult, "show");
  try {
    const { uuid, description } = prepareResult;

    // Check if uuid and description are provided
    if (!uuid || !description) {
      throw new Error("UUID or description is missing");
    }
    return await baseRepo.update(tablename, { uuid }, { description });
  } catch (err) {
    console.error("Error updating description:", err);
    throw err;
  }
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
