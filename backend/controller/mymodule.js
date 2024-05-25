const express = require('express');
const ProModule = require('../model/mongodb/mymodule');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated } = require('../middleware/auth');

// Load modules
router.get(
  '/getmodules',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Await the result of the query directly
      const modules = await ProModule.find({ is_deleted: 0 });
      
      res.status(200).json({
        success: true,
        modules, // Corrected to use 'modules'
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;