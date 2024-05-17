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

//Update Event
router.post(
  '/update_event',
  isAuthenticated,
  upload.none(),
  catchAsyncErrors(async (req, res, next) => {
    const formData = req.body;
    const event_id = formData.eventId;
    // Soft delete previous event
    await Event.findByIdAndUpdate(event_id, { deletedAt: new Date() });

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
    const editedEvent = new Event({
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
      repeat: formData.repeat,
      repeatEvery: formData.repeat === false ? '' : formData.repeatEvery,
      selectedEveryParam: formData.repeat === false ? '' : selectedEveryParamValue,
      cycles: formData.repeat === false ? '' : cyclesValue,
      color: formData.color,
      loginUser: formData.loginUser,
    });

     await editedEvent.save();

    res.status(200).json({ message: 'Event updated successfully' });
  })
)


// Save New Event
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
      repeat: formData.repeat,
      repeatEvery: formData.repeatEvery,
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
      const events = await Event.find({ deletedAt: null });
      res.status(200).json({ success: true, events });
    } catch (error) {
      // Handle errors
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  '/vieweventdetails/:eventId',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.eventId;
    try {
      const event = await Event.findById(eventId);
      if (event) {
        // Return the event details if found
        res.json(event);
      } else {
        // Return 404 if event is not found
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      // Handle any errors that occur during the query
      console.error('Error fetching event details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);

module.exports = router;