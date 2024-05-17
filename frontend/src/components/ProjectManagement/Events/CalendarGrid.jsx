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
  const calendarInstanceRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mode, setMode] = useState('add');

  const fetchData = useCallback(async (currentViewDate) => {
    try {
      const response = await axios.get(`${server}/events/getevent`, { withCredentials: true });
      const eventData = response.data.events;

      const transformedEvents = eventData.map(event => ({
        start: event.startDate,
        end: event.endDate,
        title: event.title,
        color: event.color,
        id: event._id
      }));

      if (!calendarInstanceRef.current) {
        const newCalendarInstance = new Calendar(calendarRef.current, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          },
          events: transformedEvents,
          dateClick: handleDateClick,
          eventClick: handleEventClick,
          displayEventTime: false,
        });

        calendarInstanceRef.current = newCalendarInstance;
        newCalendarInstance.render();
      } else {
        const calendarInstance = calendarInstanceRef.current;
        calendarInstance.removeAllEvents();
        calendarInstance.addEventSource(transformedEvents);

        if (currentViewDate) {
          calendarInstance.gotoDate(currentViewDate);
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      if (calendarInstanceRef.current) {
        calendarInstanceRef.current.destroy();
      }
    };
  }, [fetchData]);

  const handleDateClick = (info) => {
    setSelectedEvent(null);
    setSelectedDate(info.dateStr);
    setModalOpen(true);
    setMode('add');
  };

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    axios.get(`${server}/events/vieweventdetails/${eventId}`, { withCredentials: true })
      .then(response => {
        setSelectedEvent(response.data); // Store event details in state
        setModalOpen(true); // Open the modal to display event details
        setMode('view');
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
        toast.error('Error fetching event details');
      });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = async (formDataToSend) => {
    const saveButton = document.getElementById('save_button');
    saveButton.disabled = true;

    const currentViewDate = calendarInstanceRef.current ? calendarInstanceRef.current.getDate() : null;

    try {
      if (formDataToSend.eventId) {
        const res = await axios.post(`${server}/events/update_event`, formDataToSend, { withCredentials: true });
        toast.success(res.data.message);
      } else {
        const res = await axios.post(`${server}/events/save_event`, formDataToSend, { withCredentials: true });
        toast.success(res.data.message);
      }

      setModalOpen(false);
      await fetchData(currentViewDate);
    } catch (error) {
      console.error('Error saving/updating event:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      saveButton.disabled = false;
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div ref={calendarRef} className="bg-white p-4 m-4 w-full"></div>
      {modalOpen && (
        <EventPopup 
          isOpen={modalOpen} 
          onClose={handleModalClose} 
          onSave={handleModalSave} 
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          initialMode={mode}
        />
      )}
    </div>
  );
};

export default CalendarGrid;