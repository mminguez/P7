const { Router } = require('express')
const Book = require('../../models/Book')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const Books = await Book.find()
        if (!Books) throw new Error('No Books')
        const sorted = Books.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/bestrating', async (req, res) => {
    try {
        const books = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const Books = await Book.findById(id)
        if (!Books) throw new Error('No Books')
        res.status(200).json(Books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newBook = Book(req.body)
    try {
        const Book = await newBook.save()
        if (!Book) throw new Error('Something went wrong saving the Book')
        res.status(200).json(Book)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:id/rating', async (req, res) => {
    const { id } = req.params;
    const { ratings } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        book.ratings = ratings;
        const allRatings = book.ratings || [];
        const avgRating = allRatings.reduce((sum, r) => sum + r, ratings) / (allRatings.length + 1);
        book.averageRating = avgRating;

        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Book.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('Something went wrong')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Book.findByIdAndDelete(id)
        if (!removed) throw new Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router