import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; // Import react-select
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Radio, Switch } from "@material-tailwind/react";
import DatePickerCustomHeader from '../../../../common/DatePickerCustomHeader';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";


const EventPopup = ({ isOpen, onClose, onSave, selectedDate, selectedEvent }) => {
  const { user } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); // Add endDate state
  const [selectedClient, setSelectedClient] = useState(null);
  const [shareWithOptions, setShareWithOptions] = useState('only_me');
  const [selectedSpecificMembers, setSelectedSpecificMembers] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState(''); // Add endTime state
  const [repeat, setRepeat] = useState(false);
  const [selectedEveryParam, setSelectedEveryParam] = useState('');
  const [cycles, setCycles] = useState('');
  const [title, setTitle] = useState(''); // Add title state
  const [description, setDescription] = useState(''); // Add description state
  const [location, setLocation] = useState(''); // Add location state
  const [label, setLabel] = useState(''); // Add label state
  const [color, setColor] = useState('gray');
  

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

    // Clean up the effect when the component unmounts or isOpen changes
    return () => {
      document.body.id = ''; // Remove the ID when the component unmounts
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

  // Sample client options
  const clientOptions = [
    { value: 'client1', label: 'Client 1' },
    { value: 'client2', label: 'Client 2' },
    { value: 'client3', label: 'Client 3' },
  ];


  const specificMembersOptions = [
    { value: 'member1', label: 'Member 1' },
    { value: 'member2', label: 'Member 2' },
    { value: 'member3', label: 'Member 3' },
    { value: 'member4', label: 'Member 4' },
    { value: 'member5', label: 'Member 5' },
    { value: 'member6', label: 'Member 6' },
    { value: 'member7', label: 'Member 7' },
  ];


  const EveryParamOptions = [
    { value: 'days', label: 'Day(s)' },
    { value: 'weeks', label: 'Weeks(s)' },
    { value: 'months', label: 'Months(s)' },
    { value: 'years', label: 'Year(s)' }
  ];

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
    const selectedSpecificMembersValue = selectedSpecificMembers ? JSON.stringify(selectedSpecificMembers.map(member => member.value)) : '';
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
    { selectedEvent === null ? 
      <Dialog open={isOpen} className="custom-dialog">
        <form id="event-form" onSubmit={handleEventSubmit}>
          <DialogHeader>Add New Event</DialogHeader>
          <DialogBody className="custom-dialog-body">
            <div className="modal">
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="title">
                    Title:
                  </label>
                </div>
                <div className="w-9/12">
                  <input
                    id="title"
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="description">
                    Description:
                  </label>
                </div>
                <div className="w-9/12">
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Description"
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-2/3">
                  <label className="block mb-2" htmlFor="startDate">
                    Start Date:
                  </label>
                </div>
                <div className="w-2/3">
                  <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    dateFormat="dd-MM-yyyy"
                    customInput={<CustomDatePickerInput />}
                    showIcon={true}
                    calendarIconClassname='icon_cal'
                    required={true}
                    renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                      <DatePickerCustomHeader
                        date={date}
                        decreaseMonth={decreaseMonth}
                        increaseMonth={increaseMonth}
                        changeMonth={changeMonth}
                        changeYear={changeYear}
                      />
                    )}
                  />
                </div> &nbsp;
                <div className="w-2/3">
                  <label className="block mb-2" htmlFor="startTime">
                    Start Time:
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={handleTimeChange}
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-2/3">
                  <label className="block mb-2" htmlFor="endDate">
                    End Date:
                  </label>
                </div>
                <div className="w-2/3">
                  <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    dateFormat="dd-MM-yyyy"
                    customInput={<CustomDatePickerInput />}
                    showIcon={true}
                    calendarIconClassname='icon_cal'
                    required={true}
                    renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                      <DatePickerCustomHeader
                        date={date}
                        decreaseMonth={decreaseMonth}
                        increaseMonth={increaseMonth}
                        changeMonth={changeMonth}
                        changeYear={changeYear}
                      />
                    )}
                  />
                </div>&nbsp;
                <div className="w-2/3">
                  <label className="block mb-2" htmlFor="endTime">
                    End Time:
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="location">
                    Location:
                  </label>
                </div>
                <div className="w-9/12">
                  <input
                    id="location"
                    placeholder="Location"
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="label">
                    Label:
                  </label>
                </div>
                <div className="w-9/12">
                  <input
                    id="label"
                    placeholder="Label"
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="client">
                    Client:
                  </label>
                </div>
                <div className="w-9/12">
                  <Select
                    id="client"
                    value={selectedClient}
                    onChange={handleClientChange}
                    options={clientOptions}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="share_with">
                    Share With:
                  </label>
                </div>
                <div className="w-9/12">
                  <div className="gap-2">
                    <Radio
                      name="share_with"
                      label="Only me"
                      value="only_me"
                      checked={shareWithOptions === 'only_me'}
                      onChange={() => handleShareWithOptionsChange('only_me')}
                    />
                    <Radio
                      name="share_with"
                      label="All team members"
                      value="all_team_members"
                      checked={shareWithOptions === 'all_team_members'}
                      onChange={() => handleShareWithOptionsChange('all_team_members')}
                    />
                    <Radio
                      name="share_with"
                      label="Specific members and teams:"
                      value="specific_members_teams"
                      checked={shareWithOptions === 'specific_members_teams'}
                      onChange={() => handleShareWithOptionsChange('specific_members_teams')}
                    />
                  </div>
                  {shareWithOptions === 'specific_members_teams' && (
                    <Select
                      id="specificMembers"
                      value={selectedSpecificMembers}
                      onChange={handleSpecificMembersChange}
                      options={specificMembersOptions}
                      isMulti
                    />
                  )}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">
                  <label className="block mb-2" htmlFor="repeat">
                    Repeat:
                  </label>
                </div>
                <div className="w-9/12">
                  <div className="flex w-max gap-10" style={{ marginLeft: '15px' }}>
                    <Switch
                      color="blue"
                      checked={repeat}
                      onChange={() => setRepeat(!repeat)}
                    />
                  </div>
                </div>
              </div>
              {repeat && (
                <>
                  <div className="flex mb-4">
                    <div className="w-3/12">
                      <label className="block mb-2" htmlFor="repeat_every">
                        Repeat Every:
                      </label>
                    </div>
                    <div className="flex w-9/12 gap-5">
                      <div className='w-6/12'>
                        <input
                          type="number"
                          id="repeat_every"
                          placeholder="e.g., 1 week, 2 days"
                          className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className='w-6/12'>
                        <Select
                          id="every_param"
                          value={selectedEveryParam}
                          onChange={handleEvaryParamChange}
                          options={EveryParamOptions}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="flex mb-4">
                    <div className="w-3/12 pr-2">
                      <label className="block mb-2" htmlFor="cycles">
                        Cycles:
                      </label>
                    </div>
                    <div className="w-9/12">
                      <input
                        type="number"
                        id="cycles"
                        value={cycles}
                        onChange={(e) => setCycles(e.target.value)}
                        placeholder="e.g., 10"
                        className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex mb-4">
                <div className="w-3/12 pr-2">

                </div>
                <div className="w-9/12">
                  <Radio
                    id="gray"
                    name="color"
                    value="gray"
                    color="gray"
                    checked={color === "gray"}
                    onChange={() => setColor("gray")}
                  />
                  <Radio
                    id="blue"
                    name="color"
                    value="blue"
                    color="blue"
                    checked={color === "blue"}
                    onChange={() => setColor("blue")}
                  />
                  <Radio
                    id="green"
                    name="color"
                    value="green"
                    color="green"
                    checked={color === "green"}
                    onChange={() => setColor("green")}
                  />
                  <Radio
                    id="amber"
                    name="color"
                    value="yellow"
                    color="yellow"
                    checked={color === "yellow"}
                    onChange={() => setColor("yellow")}
                  />
                  <Radio
                    id="red"
                    name="color"
                    value="red"
                    color="red"
                    checked={color === "red"}
                    onChange={() => setColor("red")}
                  />
                </div>
              </div>

            </div>
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
            <Button type="submit" variant="gradient" color="green" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right">
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog> : 
        <Dialog open={isOpen} className="custom-dialog">
            <DialogHeader>View Event Details</DialogHeader> 
            <DialogBody className="custom-dialog-body">
               dsadsad s
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
            <Button type="button" variant="gradient" color="green" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right">
              <span>Edit</span>
            </Button>
          </DialogFooter>
        </Dialog>
      }
    </>
  );
};

export default EventPopup;