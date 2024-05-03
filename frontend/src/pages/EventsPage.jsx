import React, { useState } from 'react';
import HomePage from './HomePage';
import CalendarGrid from '../components/ProjectManagement/Events/CalendarGrid';
import EventPopup from '../components/ProjectManagement/Events/EventPopup';

const EventsPage = () => {
 
  const [showPopup, setShowPopup] = useState(false);
  

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <HomePage>
        {/* Calendar Grid */}
        <CalendarGrid />

        {/* Event Popup */}
        {showPopup && (
          <EventPopup
            isOpen={showPopup}
            onClose={handlePopupClose}
          />
        )}
      </HomePage>
    </div>
  );
};

export default EventsPage;
