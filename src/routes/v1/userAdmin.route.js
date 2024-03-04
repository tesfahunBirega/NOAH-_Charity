const express = require('express');
// const validate = require('../../middlewares/validate');
// const { postValidation } = require('../../validations');
const { userAdminController } = require('../../controllers');
const { uploadOptions } = require('../../middlewares/multerUpload');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploade = multer({ storage });
const router = express.Router();

router.route('/').post(uploade.single('path'), userAdminController.createUserAdmin).get(userAdminController.getUsersAdmin);

router
  .route('/:postId')
  .get(userAdminController.getUserAdmin)
  .patch(userAdminController.updateUserAdmin)
  .delete(userAdminController.deleteUserAdmin);

module.exports = router;
