const express = require("express");
const router = express.Router();
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../../middleware/auth");
//const path = require('path');
//const jwt = require("jsonwebtoken");
const multer = require('multer');
const upload = multer();
const Event = require("../../model/mongodb/events");


router.post(
    '/save_event',
    isAuthenticated,
    upload.none(),
    catchAsyncErrors(async (req, res, next) => {
      const formData = req.body;
  
      // Optional fields with default values or fallbacks
      const startTime = formData.startTime || '';
      const endTime = formData.endTime || '';
      const clientValue = formData.client || '';
      const specificMembersValue = formData.specificMembers || [];
      const selectedEveryParamValue = formData.selectedEveryParam || '';
      const locationValue = formData.location || '';
      const labelValue = formData.label || '';
      const cyclesValue = parseInt(formData.cycles, 10) || '';
  
      // Create and save the event
      const event = new Event({
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        startTime: startTime,
        endTime: endTime,
        location: locationValue,
        label: labelValue,
        client: clientValue,
        shareWithOptions: formData.shareWithOptions,
        specificMembers: specificMembersValue,
        repeat: formData.repeat === 'true',
        selectedEveryParam: selectedEveryParamValue,
        cycles: cyclesValue,
        color: formData.color,
        loginUser: formData.loginUser,
      });
  
      // Save the event (uncomment if needed)
       await event.save();
  
      res.status(200).json({ message: 'Event saved successfully' });
    })
);  
  
router.get(
    '/getevent',
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const events = await Event.find(); // Fetch all events from the database
        res.status(200).json({ success: true, events });
      } catch (error) {
        // Handle errors
        return next(new ErrorHandler(error.message, 500));
      }
    })
);

module.exports = router;