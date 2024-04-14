const express = require("express");
const { getModuleDetails } = require("../model/mymodule");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

// load modules
router.get(
    "/getmodules",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const module = await getModuleDetails();
  
        res.status(200).json({
          success: true,
          module,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  module.exports = router; 