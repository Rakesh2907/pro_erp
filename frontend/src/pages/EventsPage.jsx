import React from 'react';
import HomePage from './HomePage';
import CalendarGrid from '../components/ProjectManagement/Events/CalendarGrid';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const EventsPage = () => {
 
  return (
    <div>
      <HomePage>
      <Breadcrumb
            items={[
              { label: 'Events' },
            ]}
      />  
        {/* Calendar Grid */}
        <CalendarGrid />
      </HomePage>
    </div>
  );
};

export default EventsPage;
