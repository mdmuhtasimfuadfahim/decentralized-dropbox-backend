const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000 // 100000000 Bytes = 100 MB
  },
}).single('file');

module.exports = {
  upload,
}