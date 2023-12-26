require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port:process.env.DB_PORT
  }
});
const prepare = ({ reqQuery, reqBody, reqParams }) => {
  return {};
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  try {
    const packages = await knex('fav_npm_1').select('*');
    return {
      result: packages,
    };
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