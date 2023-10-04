import express from "express"
import auth from "../../middleware/auth";
import bookController from "./book.controller";
const router = express.Router();

router.post("/create-book", auth("admin"), bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get('/:id', bookController.getSingleBook);
router.patch('/:id', auth("admin"), bookController.updateBook);
router.delete('/:id', auth("admin"), bookController.deleteBook);

export default router;