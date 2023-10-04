import express from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updateUser);
// router.get('/', auth("admin") ,userController.getUsers)

export default router;
