const express = require('express');
const validate = require('../../middlewares/validate');
const { Validation } = require('../../validations');
const { postController } = require('../../controllers');
// const authMiddleware = require('../../middlewares/authMiddleware');
const app = express();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploade = multer({ storage });
app.use('/public', express.static(path.join(__dirname, 'public')));
const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createPost), uploade.single('image'), postController.createPost)
  .get(validate(Validation.getPosts), postController.getAllPosts);

module.exports = router;
