const { Router } = require('express');
const Book = require('../../models/Book');
const authMiddleware = require('../../middleware/auth');
const { uploadBookDataAndImage } = require('../../middleware/upload');
const {
  getBooks,
  getBestRatingBooks,
  getBookById,
  createBook,
  addRatingToBook,
  updateBook,
  deleteBook,
} = require('../../controller/bookController');

const router = Router();

router.get('/', getBooks);
router.get('/bestrating', getBestRatingBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, uploadBookDataAndImage, createBook);
router.post('/:id/rating', authMiddleware, addRatingToBook);
router.put('/:id', authMiddleware, uploadBookDataAndImage, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
