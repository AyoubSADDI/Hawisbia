const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const upload = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();




router.post('/upload-images', upload.array('image'), async (req, res) => {

  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  if (req.method === 'POST') {
    const urls = []
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })

  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }
})

router.post('/upload-audio', upload.array('audio'), async (req, res) => {

  const uploader = async (path) => await cloudinary.uploads(path, 'audio');

  if (req.method === 'POST') {
    const urls = []
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    res.status(200).json({
      message: 'audio uploaded successfully',
      data: urls
    })

  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }
})

module.exports = router;