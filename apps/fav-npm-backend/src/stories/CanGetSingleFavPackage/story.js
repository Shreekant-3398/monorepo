const baseRepo = requireUtil("baseRepo");
const tablename = "fav_npm_1";

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  return {uuid:reqParams.id};
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
const {uuid}= prepareResult;
  try {
    console.log("prep",prepareResult)
    return await baseRepo.getPackage(tablename,{ uuid },"description");
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