const baseRepo = requireUtil("baseRepo");
const tablename = "fav_npm_1";

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  const name = reqBody.name;
  const desc = reqBody.description;
  return { name, desc };
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  const { name, desc } = prepareResult;

  if (!name || !desc) {
    throw new Error("Package name or description is missing");
  }
  let table = await baseRepo.create(tablename, {
    name: name,
    description: desc,
  });
  return table;
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
