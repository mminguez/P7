const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadBookDataAndImage = upload.fields([
  { name: 'book', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

module.exports = {
  uploadBookDataAndImage,
};
