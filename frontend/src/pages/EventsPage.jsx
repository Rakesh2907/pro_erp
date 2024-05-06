import React from 'react';
import HomePage from './HomePage';
import CalendarGrid from '../components/ProjectManagement/Events/CalendarGrid';
//import EventPopup from '../components/ProjectManagement/Events/EventPopup';

const EventsPage = () => {
 
  return (
    <div>
      <HomePage>
        {/* Calendar Grid */}
        <CalendarGrid />
      </HomePage>
    </div>
  );
};

export default EventsPage;
