const baseRepo = requireUtil("baseRepo");
const tablename = "fav_npm_1";

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  return {
    uuid: reqParams.id // Assuming uuid is passed as a URL parameter
  };
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  try {
    const { uuid } = prepareResult;

    // Check if uuid is provided
    if (!uuid) {
      throw new Error('UUID is missing');
    }

    // Delete all records in the fav_npm table with the specified uuid
    return await baseRepo.remove(tablename,{uuid})
  } catch (err) {
    console.error('Error deleting records:', err);
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
