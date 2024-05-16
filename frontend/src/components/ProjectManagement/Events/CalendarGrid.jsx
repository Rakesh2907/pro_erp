import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // Needed for dragging/dropping events
import EventPopup from './Modals/EventPopup';
import { server } from '../../../server';
import axios from 'axios';
import { toast } from 'react-toastify';

const CalendarGrid = () => {
  const calendarRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchData = useCallback(async (calendarInstance) => {
    try {
      const response = await axios.get(`${server}/events/getevent`, { withCredentials: true });
      const eventData = response.data.events;

      const transformedEvents = eventData.map(event => ({
        start: event.startDate,
        end: event.endDate,
        title: event.title,
        color: event.color
      }));

      calendarInstance = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        events: transformedEvents,
        dateClick: handleDateClick,
        displayEventTime: false,
      });

      calendarInstance.render();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);
  
  const calendarInstance = null;

  useEffect(() => {
    fetchData(calendarInstance);
  
    return () => {
      if (calendarInstance) {
        calendarInstance.destroy();
      }
    };
  },[fetchData]);
  
  const handleDateClick = (info) => {  
    setSelectedDate(info.dateStr);
    setModalOpen(true);
  };


  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = async (formDataToSend) => {
      try {
        const res = await axios.post(`${server}/events/save_event`, formDataToSend, { withCredentials: true });
        toast.success(res.data.message);
        setModalOpen(false);
        fetchData(calendarInstance);
      } catch (error) {
        console.error('Error saving event:', error);
        toast.error(error.response?.data?.message || 'An error occurred');
      }
  };

 
  return (
    <div className="flex justify-center w-full">
      <div ref={calendarRef} className="bg-white p-4 m-4 w-full"></div>
      <EventPopup isOpen={modalOpen} onClose={handleModalClose} onSave={handleModalSave} selectedDate={selectedDate}/>
    </div>
  );
};

export default CalendarGrid;
