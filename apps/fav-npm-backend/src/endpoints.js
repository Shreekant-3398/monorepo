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
        ["get", "/", "CanGetFavPackages"],
        ["post", "/add-fav-packages", "CanCreateFavPackages"],
        ["put","/fav-packages-update/:id","CanUpdateFavPackages"],
        ["delete","/fav-packages-delete/:id","CanDeleteFavPackages"]
      ],
    },
  ];
};
