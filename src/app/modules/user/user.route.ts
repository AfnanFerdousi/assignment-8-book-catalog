import express from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get('/', auth("admin") ,userController.getUsers)
router.get("/:id", auth("admin"),userController.getSingleUser);
router.delete("/:id",auth("admin"), userController.deleteUser);
router.patch("/:id",auth("admin"), userController.updateUser);

export default router;
