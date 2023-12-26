require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
  }
});

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  // console.log("check for the payload", reqBody);
  return reqBody;
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  
  const name = prepareResult.name;
  const desc = prepareResult.description;

  if (!name || !desc) {
    throw new Error('Package name or description is missing');
  }

  await knex('fav_npm_1').insert({
    name:name,
    description:desc
  });
 
  return {
    result:`Package created with Package_name as ${name} and Package_desc as ${desc}`
  };
};

const respond = ({ handleResult }) => {
  console.log("hande",handleResult)
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};