require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

const prepare = ({ reqQuery, reqBody, reqParams }) => {
  // console.log("check for the payload", reqBody);
  return reqBody;
};

const authorize = ({ prepareResult }) => {
  return false;
};

const handle = async ({ prepareResult, storyName }) => {
  const name = prepareResult.name;
  const desc = prepareResult.description;

  if (!name || !desc) {
    throw new Error("Package name or description is missing");
  }

  // Check if the package name already exists
  const existingPackage = await knex("fav_npm_1").where("name", name).first();
  if (existingPackage) {
    return {
      result: "Package already added in favourites",
    };
  } else {
    await knex("fav_npm_1").insert({
      name: name,
      description: desc,
    });

    return {
      result: `Package created with Package_name as ${name} and Package_desc as ${desc}`,
    };
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
