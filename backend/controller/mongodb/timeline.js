const express = require("express");
const {Post , Reply } = require("../../model/mongodb/timeline");
const router = express.Router();
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../../middleware/auth");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");

// Dynamically create the uploads folder if it doesn't exist
const uploadsFolder = path.join(__dirname, '../../../myuploads/timeline');
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
  '/reply',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
      const { postId, description, user } = req.body;

      try {
            const login_user_id = user._id;
            
            if (description && postId) {

              const reply = new Reply({
                reply_description: description,
                post_id: postId,
                created_by: user,
            });
    
             const savedReply= await reply.save();   

              if(savedReply._id){
                  res.status(200).json({ 
                    message: 'Reply received successfully!',
                    reply: reply
                 });
              }
            }else{
              res.status(500).json({ error: 'Error : Decriptions is empty' });
            }
      } catch (error) {
            console.error('Error inserting post details:', error);
            res.status(500).json({ error: 'Error inserting Reply details' });
      }     

  })
);

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
        //const post_id = await insertPostDetails(description, file_names, decoded.id);

        const post = new Post({
            post_description: description,
            post_files: Array.isArray(file_names) ? file_names : [file_names],
            created_by: decoded.id,
        });

        const savedPost = await post.save(); 

        if(savedPost._id){

            response = {
              success: true,
              message: 'Post saved successfully.',
              postId: savedPost._id,
              files: file_names,
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

// Define route to get all posts
router.get(
    '/getposts',
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        // Fetch all posts from MongoDB
        const posts = await Post.find().sort({ created: -1 });
  
        // Fetch replies for each post
        const postsWithReplies = await Promise.all(
          posts.map(async (post) => {
            const replies = await Reply.find({ post_id: post._id });
            return { ...post.toObject(), replies };
          })
        );
  
        res.status(200).json({
          success: true,
          posts: postsWithReplies,
        });
      } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

module.exports = router;