const express = require("express");
const { getMenuDetails, getSubMenuDetails, getRoutesDetails } = require("../model/mymenu");
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
 
  // load sub-menus
  router.get(
    "/get_sub_menus/:id",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      
      const id = req.params.id;
      try {

        const sub_menus = await getSubMenuDetails(id);
  
        res.status(200).json({
          success: true,
          sub_menus,
        });

      }catch (error){
         return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // load routes
  router.get(
    "/getroutes",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
       
      try{

        const dynamic_routers = await getRoutesDetails();

        res.status(200).json({
          success: true,
          dynamic_routers,
        });

      }catch (error){
        return next(new ErrorHandler(error.message, 500));
      }

    })
  );
  
  module.exports = router; 