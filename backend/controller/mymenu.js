const express = require("express");
const { getMenuDetails } = require("../model/mymenu");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

// load menus
router.get(
    "/getmenus/:id",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
    
      const id = req.params.id;  

      try {
         console
        const menus = await getMenuDetails(id);
  
        res.status(200).json({
          success: true,
          menus,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  module.exports = router; 