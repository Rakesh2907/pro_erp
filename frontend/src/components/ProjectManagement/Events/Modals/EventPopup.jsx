import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; // Import react-select
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";

const EventPopup = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [startDate, setStartDate] = useState(null); // Initialize with null
  const [selectedClient, setSelectedClient] = useState(null);
  const [shareWithOptions, setShareWithOptions] = useState('only_me'); 
  const [selectedSpecificMembers, setSelectedSpecificMembers] = useState(null);
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    // Update startDate when selectedDate changes
    setStartDate(selectedDate ? new Date(selectedDate) : null);
    
  }, [selectedDate]); // Re-run effect when selectedDate changes
  
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

   // Sample client options
   const clientOptions = [
    { value: 'client1', label: 'Client 1' },
    { value: 'client2', label: 'Client 2' },
    { value: 'client3', label: 'Client 3' },
  ];

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };
  
  const handleShareWithOptionsChange = (value) => {
    setShareWithOptions(value);
  };

  const handleSpecificMembersChange = (selectedOption) => {
    setSelectedSpecificMembers(selectedOption);
  };

  const specificMembersOptions = [
    { value: 'member1', label: 'Member 1' },
    { value: 'member2', label: 'Member 2' },
    { value: 'member3', label: 'Member 3' },
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
  />
));

const CustomHeader = ({ date, decreaseMonth, increaseMonth, changeMonth, changeYear}) => {

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= currentYear + 20; i++) {
    years.push(i);
  }


  const months = Array.from({ length: 12 }, (_, i) => new Date(date.getFullYear(), i, 1));

  const handleMonthChange = e => {
    const selectedMonth = parseInt(e.target.value, 10);
    changeMonth(selectedMonth);
  };

  const handleYearChange = e => {
    const selectedYear = parseInt(e.target.value, 10);
    changeYear(selectedYear);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      <button onClick={decreaseMonth} type="button" className="react-datepicker__navigation react-datepicker__navigation--previous" aria-label="Previous Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">Previous Month</span></button>
      <select value={date.getMonth()} onChange={handleMonthChange} style={{ marginLeft: '60px'}}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month.toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      
      <select value={date.getFullYear()} onChange={handleYearChange} style={{ marginRight: '60px'}}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
     
      <button onClick={increaseMonth} type="button" className="react-datepicker__navigation react-datepicker__navigation--next" aria-label="Next Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">Next Month</span></button>
    </div>
  );
};


  return (
    <>
      <Dialog open={isOpen} className="custom-dialog">
        <DialogHeader>Add New Event</DialogHeader>
        <DialogBody>
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
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                  <CustomHeader
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                dateFormat="dd-MM-yyyy"
                customInput={<CustomDatePickerInput />} 
                showIcon={true}
                calendarIconClassname='icon_cal'
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                  <CustomHeader
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
                value={startTime}
                onChange={handleTimeChange}
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
                <Radio
                  name="share_with"
                  label="Only me"
                  value="only_me"
                  checked={shareWithOptions === 'only_me'}
                  onChange={() => handleShareWithOptionsChange('only_me')}
                /> &nbsp;
                <Radio
                  name="share_with"
                  label="All team members"
                  value="all_team_members"
                  checked={shareWithOptions === 'all_team_members'}
                  onChange={() => handleShareWithOptionsChange('all_team_members')}
                /> &nbsp;
                <Radio
                  name="share_with"
                  label="Specific members and teams:"
                  value="specific_members_teams"
                  checked={shareWithOptions === 'specific_members_teams'}
                  onChange={() => handleShareWithOptionsChange('specific_members_teams')}
                /> &nbsp;
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
          </div>  
        </DialogBody>
        <DialogFooter className="justify-between">
          <Button
            variant="text"
            color="red"
            onClick={onClose}
            className="text-white bg-[#EB311D] hover:bg-[#EB311D]/90 focus:ring-4 focus:ring-[#EB311D]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#EB311D]/50 me-2 mb-2 float-right"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClose} className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EventPopup;