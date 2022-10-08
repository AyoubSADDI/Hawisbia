const express = require('express');
const router = express.Router();
const multer = require("multer");


// import controller
const { requireSignin, adminMiddleware,ownerMiddleware } = require('../controllers/auth.controller');
const { readController, updateController,allController,updateAdminController } = require('../controllers/user.controller');

const uploadController = require('../controllers/upload.controller');





router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, updateController);
router.get('/user/all', allController);
router.put('/owner/update', requireSignin, ownerMiddleware,updateController);
router.put('/admin/update', requireSignin, adminMiddleware, updateController);
router.put('/admin/user/update', requireSignin, adminMiddleware, updateAdminController);

const path = require("path");




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(req.file);
    });
  });
module.exports = router;