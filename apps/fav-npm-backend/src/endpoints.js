module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  return [
    {
      endpoints: [
        ["get", "/fav-packages", "CanGetFavPackages"],
        ["get", "/fav-packages/:id", "CanGetSingleFavPackage"],
        ["post","/user","UserCanRegister"],
        ["post", "/fav-packages", "CanCreateFavPackages"],
        ["put", "/fav-packages/:id", "CanUpdateFavPackages"],
        ["delete", "/fav-packages/:id", "CanDeleteFavPackages"],
      ],
    },
  ];
};
