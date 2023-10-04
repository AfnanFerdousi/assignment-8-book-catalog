import express from "express"
import auth from "../../middleware/auth";
import bookController from "./book.controller";
const router = express.Router();

router.post("/create-book", auth("admin"), bookController.createBook);
router.get("/", bookController.getAllBooks);

export default router;