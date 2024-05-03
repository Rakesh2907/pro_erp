import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventPopup = ({ isOpen, onClose, selectedDate }) => {
   
  const [startDate, setStartDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  //const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(''); // State for start time

  const overlayStyles = {
    display: isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
  };

  const modalStyles = {
    width: '100%', // Adjust width as needed
    maxWidth: '500px', // Set a maximum width if necessary
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
  };

  const handleTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="startDate">
            Start Date:
          </label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            dateFormat="dd-MM-yyyy"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="startTime">
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={handleTimeChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={onClose}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
