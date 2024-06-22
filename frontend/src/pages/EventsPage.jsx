import React from 'react';
import HomePage from './HomePage';
import CalendarGrid from '../components/ProjectManagement/Events/CalendarGrid';

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
