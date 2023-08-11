import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

function InitApiRoute(app) {
  router.get("/liked/:email", UserController.getLikedMovies);
  router.post("/add", UserController.addToLikedMovies);
  router.put("/remove", UserController.removeFromLikedMovies);
  return app.use("/api/v1", router);
}

export default InitApiRoute;
