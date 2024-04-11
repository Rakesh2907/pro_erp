const express = require("express");
const { insertPostDetails } = require("../model/timeline");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");

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
  isAuthenticated,
  upload.array('files'),
  handleMulterErrors,
  catchAsyncErrors(async (req, res, next) => { // Use async keyword for asynchronous operations
    const {token} = req.cookies;
    
    if (!token) {
      return res.status(401).json({ error: "Please login to continue" });
    }


    try {

      // Decode and verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const { description, file_names } = req.body;
      const fileNames = req.files.map((file) => file.filename);

      if (description) {
        // Call the insertPostDetails function and wait for it to complete
        const post_id = await insertPostDetails(description, file_names, decoded.id);

        if(post_id){

            response = {
              success: true,
              message: 'Post saved successfully.',
              post_id,
              files: fileNames,
            };
        }
      
      }else if(fileNames){
        response = { success: true, message: 'File(s) Uploaded successfully.', files: fileNames };
      }
      res.status(200).json(response);
    } catch (error) {
      console.error('Error inserting post details:', error);
      res.status(500).json({ error: 'Error inserting post details' });
    }
  })
);

module.exports = router;