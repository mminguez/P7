const Book = require('../models/Book')
const path = require('path');
const sharp = require('sharp');


exports.getBooks = async (req, res) => {
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
}

exports.getBestRatingBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getBookById = async (req, res) => {
    const { id } = req.params
    try {
        const Books = await Book.findById(id)
        if (!Books) throw new Error('No Books')
        res.status(200).json(Books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createBook = async (req, res) => {
    const bookData = JSON.parse(req.body.book);

    if (req.files && req.files.image && req.files.image.length > 0) {
        const imageFile = req.files.image[0];

        const filename = `book-${Date.now()}.jpeg`;
        const outputPath = path.join(__dirname, '..', 'uploads', filename);

        await sharp(imageFile.buffer)
            .resize(640, 640)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(outputPath);

        bookData.imageUrl = `http://localhost:4000/uploads/${filename}`;
    }

    const newBook = new Book(bookData);
    try {
        const Book = await newBook.save();
        if (!Book) throw new Error('Something went wrong saving the Book');
        res.status(200).json(Book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRatingToBook = async (req, res) => {
    const { id } = req.params;
    const ratingData = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        const allRatings = book.ratings || [];
        console.log(ratingData.rating);
        console.log(allRatings.length);
        ratingData.grade = parseInt(ratingData.rating);
        const totalRatings = allRatings.length + 1;
        const avgRating = totalRatings === 0 ? 0 : (allRatings.reduce((sum, r) => sum + r.grade, 0) + ratingData.grade) / totalRatings;
        console.log(avgRating);
        book.ratings.push(ratingData);
        book.averageRating = avgRating;

        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateBook = async (req, res) => {
    const { id } = req.params

    try {
        const response = await Book.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('Something went wrong')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Book.findByIdAndDelete(id)
        if (!removed) throw new Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

