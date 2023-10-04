import express from "express";
import categoryController from "./category.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/create-category", auth("admin"), categoryController.createCategory);
router.get("/", categoryController.getAllCategories)

export default router;