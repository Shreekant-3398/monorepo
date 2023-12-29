const baseRepo = requireUtil("baseRepo");
const tablename = "users";

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const username= reqBody.username;
  const password_hash= reqBody.password_hash;

  return {username,password_hash};
};

const authorize = async ({ prepareResult }) => {
  try {
    if (0) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  const { username, password_hash } = prepareResult;

  if (!username || !password_hash) {
    throw new Error("username or password is missing");
  }
  try {
    return await baseRepo.createUser(tablename,prepareResult);
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return handleResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
