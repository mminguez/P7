const Book = require('../models/Book');

const isUserAuthorized = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const userId = req.user.userId;
        const bookUserId = book.userId.toString();
        console.log('Book userId:', bookUserId);
        console.log('JWT userId:', userId);
        console.log('book Id:', book.id);

        if (userId !== bookUserId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    isUserAuthorized
};