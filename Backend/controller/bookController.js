const Book = require('../models/Book')
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const url = require('url');

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

    if (isNaN(bookData.year)){
        return res.status(400).json({ msg: 'Year should be a number' });
    }

    if (req.files && req.files.image && req.files.image.length > 0) {
        const imageFile = req.files.image[0];

        const filename = `book-${Date.now()}.webp`;
        const outputPath = path.join(__dirname, '..', 'uploads', filename);

        await sharp(imageFile.buffer)
            .resize(450, 450)
            .toFormat('webp')
            .webp({ quality: 70 })
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
        const existingRatingIndex = book.ratings.findIndex(r => r.userId === ratingData.userId);



        const allRatings = book.ratings || [];
        console.log(ratingData.rating);
        console.log(allRatings.length);
        ratingData.grade = parseInt(ratingData.rating);
        if (ratingData.rating < 1 || ratingData.rating > 5) {
            return res.status(403).json({ message: 'unauthorized request' });
        }
        const totalRatings = allRatings.length + 1;
        const avgRating = totalRatings === 0 ? 0 : (allRatings.reduce((sum, r) => sum + r.grade, 0) + ratingData.grade) / totalRatings;
        console.log(avgRating);
        if (existingRatingIndex !== -1) {
            book.ratings[existingRatingIndex] = ratingData;
        } else {
            book.ratings.push(ratingData);
        }
        book.averageRating = avgRating;

        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;

    if (req.body.book) {
        const updatedBookData = JSON.parse(req.body.book);
        if (isNaN(updatedBookData.year)) {
            return res.status(400).json({ msg: 'Year should be a number' });
        }
        Object.assign(bookData, updatedBookData);
    } else {
        if (isNaN(bookData.year)) {
            return res.status(400).json({ msg: 'Year should be a number' });
        }
    }
    
    

    if (req.files && req.files.image && req.files.image.length > 0) {
        const book = await Book.findById(id);
        if (book.imageUrl) {
            const imagePath = path.join(__dirname, '..', 'uploads', path.basename(url.parse(book.imageUrl).pathname));
            fs.unlink(imagePath, (err) => {
                if (err) console.error(`Failed to delete image: ${err}`);
            });
        }
        const imageFile = req.files.image[0];
        const filename = `book-${Date.now()}.webp`;
        const outputPath = path.join(__dirname, '..', 'uploads', filename);

        await sharp(imageFile.buffer)
            .resize(450, 450)
            .toFormat('webp')
            .webp({ quality: 70 })
            .toFile(outputPath);

        bookData.imageUrl = `http://localhost:4000/uploads/${filename}`;
    }
    
    try {
        const response = await Book.findByIdAndUpdate(id, bookData, { new: true });
        if (!response) throw new Error('Something went wrong');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id);
        if (book.imageUrl) {
            const imagePath = path.join(__dirname, '..', 'uploads', path.basename(url.parse(book.imageUrl).pathname));
            fs.unlink(imagePath, (err) => {
                if (err) console.error(`Failed to delete image: ${err}`);
            });
        }
        const removed = await Book.findByIdAndDelete(id)
        if (!removed) throw new Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

