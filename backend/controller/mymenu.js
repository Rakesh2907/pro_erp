const express = require("express");
const { getMenuDetails, getSubMenuDetails, getRoutesDetails } = require("../model/mymenu");
const ProMenu = require("../model/mongodb/mymenu");
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
      
        //const menus = await getMenuDetails(id);
        
        const menus = await ProMenu.find({ 
          module_id: id,
          $or: [
            { parent_menu_id: null },
            { parent_menu_id: { $exists: false } } // Include documents where parent_menu_id does not exist
          ]
        }).sort({ menu_order: 1 });

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
      
      const parent_menu_id = req.params.id;
      try {

        //const sub_menus = await getSubMenuDetails(parent_menu_id);

        const sub_menus = await ProMenu.find({ 
          parent_menu_id: parent_menu_id,
        }).sort({ menu_order: 1 });

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

        //const dynamic_routers = await getRoutesDetails();
         // Await the result of the query directly
        const dynamic_routers = await ProMenu.find({ components_load: 1});

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