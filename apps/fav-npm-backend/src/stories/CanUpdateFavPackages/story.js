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
  console.log("reqParams",reqParams)
  return {
    uuid: reqParams.id, // Assuming uuid is passed as a URL parameter
    description: reqBody.description // Extract description from request body
  };
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  console.log(prepareResult,"show")
  try {
    const { uuid, description } = prepareResult;

    // Check if uuid and description are provided
    if (!uuid || !description) {
      throw new Error('UUID or description is missing');
    }

    // Update the description field of the record with the specified uuid
    await knex('fav_npm_1')
      .where({ uuid: uuid }) // Filter records by uuid
      .update({ description: description }); // Update the description field

    return {
      result: `Description updated for record with UUID ${uuid}`
    };
  } catch (err) {
    console.error('Error updating description:', err);
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
