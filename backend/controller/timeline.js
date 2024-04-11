const express = require("express");
const { insertPostDetails } = require("../model/timeline");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Dynamically create the uploads folder if it doesn't exist
const uploadsFolder = path.join(__dirname, '../../myuploads/timeline');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsFolder); // Use the dynamically created uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

    // Check if the file extension is in the allowed list
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedFileExtensions.includes(ext)) {
      cb(null, true);
    } else {
      const error = new Error('Invalid file type. Only JPG, JPEG, PNG, and PDF files are allowed.');
      error.code = 'INVALID_FILE_TYPE';
      cb(error);
    }
  },
});

// Middleware to handle Multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: 'Multer error: ' + err.message });
  } else if (err && err.code === 'INVALID_FILE_TYPE') {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  } else {
    next(); // Pass control to the next middleware
  }
};

router.post(
  '/upload-files',
  upload.array('files'),
  handleMulterErrors,
  async (req, res) => { // Use async keyword for asynchronous operations
    const { description, file_names } = req.body;
    const fileNames = req.files.map((file) => file.filename);

    try {
      if (description) {
        // Call the insertPostDetails function and wait for it to complete
        const post_id = await insertPostDetails(description, file_names);
        if(post_id){
          res.status(200).json({
              success: true,
              files: fileNames, 
              post_id,
              'message': 'Post saved successfully.' 
            });
        }
        // Respond with file names, post ID, or any other data
       
      }else if(fileNames){
          res.status(200).json({
            success: true,
            files: fileNames, 
            'message': 'File(s) Uploaded successfully.'
          });
      }

    } catch (error) {
      console.error('Error inserting post details:', error);
      res.status(500).json({ error: 'Error inserting post details' });
    }
  }
);

module.exports = router;