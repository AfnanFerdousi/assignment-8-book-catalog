import express from "express";
import categoryController from "./category.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/create-category", auth("admin"), categoryController.createCategory);
router.get("/", categoryController.getAllCategories)
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id', auth("admin"), categoryController.updateCategory);
router.delete('/:id', auth("admin"), categoryController.deleteCategory);

export default router;