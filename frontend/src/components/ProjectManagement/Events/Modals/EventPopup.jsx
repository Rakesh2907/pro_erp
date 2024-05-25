import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import AddNewEvent from './AddNewEvent';
import EditEvent from './EditEvent';
import AtSymbolIcon from '@mui/icons-material/AlternateEmail';


const EventPopup = ({ isOpen, onClose, onSave, selectedDate, selectedEvent, initialMode }) => { 
  const { user } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); // Add endDate state
  const [selectedClient, setSelectedClient] = useState(null);
  const [shareWithOptions, setShareWithOptions] = useState('only_me');
  const [selectedSpecificMembers, setSelectedSpecificMembers] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState(''); // Add endTime state
  const [repeat, setRepeat] = useState(false);
  const [repeatEvery, setRepeatEvery] = useState('');
  const [selectedEveryParam, setSelectedEveryParam] = useState('');
  const [cycles, setCycles] = useState('');
  const [title, setTitle] = useState(''); // Add title state
  const [description, setDescription] = useState(''); // Add description state
  const [location, setLocation] = useState(''); // Add location state
  const [label, setLabel] = useState(''); // Add label state
  const [color, setColor] = useState('gray');
  const [mode, setMode] = useState(initialMode);
  

  useEffect(() => {
    // Update startDate when selectedDate changes
    setStartDate(selectedDate ? new Date(selectedDate) : null);
  }, [selectedDate]); // Re-run effect when selectedDate changes
  
  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedClient(null);
    setShareWithOptions('only_me');
    setSelectedSpecificMembers(null);
    setStartTime('');
    setEndTime('');
    setRepeat(false);
    setRepeatEvery('');
    setSelectedEveryParam('');
    setCycles('');
    setTitle('');
    setDescription('');
    setLocation('');
    setLabel('');
    setColor('gray');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.id = 'event-modal-open';
    } else {
      document.body.id = '';
    }
    return () => {
      document.body.id = ''; 
    };
  }, [isOpen]);


  const handleTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleClientChange = (selectedOption) => { 
    setSelectedClient(selectedOption);
  };

  const handleShareWithOptionsChange = (value) => {
    setShareWithOptions(value);
  };

  const handleSpecificMembersChange = (selectedOption) => { 
    setSelectedSpecificMembers(selectedOption);
  };

  const handleEvaryParamChange = (value) => {
    setSelectedEveryParam(value);
  }
  
  // Custom input component for read-only behavior
  const CustomDatePickerInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly // Make the input read-only
      ref={ref}
      className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      required
    />
  ));
  
  const handleEditEventSubmit = async(e) => {
    e.preventDefault();
    const event_id = selectedEvent._id;

    if (!startDate || !endDate) {
      toast.error('Please select both start date and end date.');
      return;
    }
  
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be greater than end date.');
      return;
    }
    
    const selectedClientValue = selectedClient || '';
    const selectedSpecificMembersValue = selectedSpecificMembers ? selectedSpecificMembers : [];
    const selectedEveryParamValue = selectedEveryParam || '';
  
    const EditformDataToSend = {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      label,
      client: selectedClientValue,
      shareWithOptions,
      specificMembers: selectedSpecificMembersValue,
      repeat,
      repeatEvery,
      selectedEveryParam: selectedEveryParamValue,
      cycles,
      color,
      loginUser: user,
      eventId:event_id
    };
    onSave(EditformDataToSend);
  }
  

  const handleEventSubmit = async (e) => {
    e.preventDefault();
  
    if (!startDate || !endDate) {
      toast.error('Please select both start date and end date.');
      return;
    }
  
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be greater than end date.');
      return;
    }
  
    const selectedClientValue = selectedClient?.value || '';
    const selectedSpecificMembersValue = selectedSpecificMembers ? selectedSpecificMembers.map(member => member.value) : [];
    const selectedEveryParamValue = selectedEveryParam?.value || '';
  
    const formDataToSend = {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      label,
      client: selectedClientValue,
      shareWithOptions,
      specificMembers: selectedSpecificMembersValue,
      repeat,
      repeatEvery,
      selectedEveryParam: selectedEveryParamValue,
      cycles,
      color,
      loginUser: user,
    };
    
    onSave(formDataToSend);
    resetForm();
  }


  return (
    <>
    { mode === 'add' ? (
       <AddNewEvent 
          isOpen={isOpen} 
          onClose={onClose} 
          handleEventSubmit={handleEventSubmit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          CustomDatePickerInput={CustomDatePickerInput}
          startTime={startTime}
          handleTimeChange={handleTimeChange}
          endDate={endDate}
          setEndDate={setEndDate}
          endTime={endTime}
          handleEndTimeChange={handleEndTimeChange}
          location={location}
          setLocation={setLocation}
          label={label}
          setLabel={setLabel}
          selectedClient={selectedClient}
          handleClientChange={handleClientChange}
          shareWithOptions={shareWithOptions}
          handleShareWithOptionsChange={handleShareWithOptionsChange}
          selectedSpecificMembers={selectedSpecificMembers}
          handleSpecificMembersChange={handleSpecificMembersChange}
          repeat={repeat}
          setRepeat={setRepeat}
          selectedEveryParam={selectedEveryParam}
          handleEvaryParamChange={handleEvaryParamChange}
          cycles={cycles}
          setCycles={setCycles}
          color={color}
          setColor={setColor}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setSelectedClient={setSelectedClient}
          setRepeatEvery={setRepeatEvery}
       /> ) : mode === 'edit' ? (
           <EditEvent
              selectedEvent={selectedEvent}
              isOpen={isOpen} 
              onClose={onClose} 
              handleEditEventSubmit={handleEditEventSubmit}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              startDate={startDate}
              setStartDate={setStartDate}
              CustomDatePickerInput={CustomDatePickerInput}
              startTime={startTime}
              handleTimeChange={handleTimeChange}
              endDate={endDate}
              setEndDate={setEndDate}
              endTime={endTime}
              handleEndTimeChange={handleEndTimeChange}
              location={location}
              setLocation={setLocation}
              label={label}
              setLabel={setLabel}
              selectedClient={selectedClient}
              handleClientChange={handleClientChange}
              shareWithOptions={shareWithOptions}
              handleShareWithOptionsChange={handleShareWithOptionsChange}
              selectedSpecificMembers={selectedSpecificMembers}
              handleSpecificMembersChange={handleSpecificMembersChange}
              repeat={repeat}
              repeatEvery={repeatEvery}
              setRepeat={setRepeat}
              selectedEveryParam={selectedEveryParam}
              handleEvaryParamChange={handleEvaryParamChange}
              cycles={cycles}
              setCycles={setCycles}
              color={color}
              setColor={setColor}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setSelectedClient={setSelectedClient}
              setShareWithOptions={setShareWithOptions}
              setSelectedSpecificMembers={setSelectedSpecificMembers}
              setSelectedEveryParam={setSelectedEveryParam}
              setRepeatEvery={setRepeatEvery}
           />
       ) : (
        <Dialog open={isOpen} className="custom-dialog">
            <DialogHeader>View Event Details</DialogHeader> 
            <DialogBody className="custom-dialog-body">
               <h4 className="mt0 float-start">
                    <span className="float-start mr10">
                        <AtSymbolIcon style={{ fontSize: 20 }} />
                    </span>
                    {selectedEvent.title}
               </h4>
            </DialogBody>
            <DialogFooter className="justify-between">
            <Button
              variant="text"
              color="red"
              onClick={onClose}
              className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right"
            >
              <span>Close</span>
            </Button>
            <Button 
                type="button" 
                variant="gradient" 
                color="green" 
                className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right"
                onClick={() => setMode('edit')}
            >
              <span>Edit</span>
            </Button>
          </DialogFooter>
        </Dialog>
       ) 
      }
    </>
  );
};

export default EventPopup;