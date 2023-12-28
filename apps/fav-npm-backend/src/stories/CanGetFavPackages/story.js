const baseRepo = requireUtil("baseRepo");
const tablename = "fav_npm_1";

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  return {};
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  try {
    return await baseRepo.findAll(tablename);
  } catch (err) {
    console.error('Error fetching packages:', err);
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