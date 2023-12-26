require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
});

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
    await knex('fav_npm_1')
      .where({ uuid: uuid }) // Filter records by uuid
      .del(); // Delete the records

    return {
      result: `Deleted all records with UUID ${uuid}`
    };
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
