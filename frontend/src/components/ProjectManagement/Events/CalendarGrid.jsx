import React, { useEffect, useRef } from 'react';
//import axios from 'axios'; // Import Axios
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // Needed for dragging/dropping events

const CalendarGrid = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    let calendarInstance = null;
  
    const fetchData = async () => {
      try {
        // Make API call to fetch events data
        //const response = await axios.get('https://your-api-url/events');
        const eventData = []; // Assuming response.data is an array of events
        
        calendarInstance = new Calendar(calendarRef.current, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          },
          events: eventData, // Set fetched events data here
        });
  
        calendarInstance.render();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchData();
  
    return () => {
      if (calendarInstance) {
        calendarInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div
        ref={calendarRef}
        className="bg-white p-4 m-4 w-full"
      ></div>
    </div>
  );
};

export default CalendarGrid;
