import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select'; // Import react-select
import DatePickerCustomHeader from '../../../../common/DatePickerCustomHeader';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Radio, Switch } from "@material-tailwind/react";
          
const AddNewEvent = ({
    isOpen,
    onClose,
    handleEventSubmit,
    title,
    setTitle,
    description,
    setDescription,
    startDate,
    setStartDate,
    CustomDatePickerInput,
    startTime,
    handleTimeChange,
    endDate,
    setEndDate,
    endTime,
    handleEndTimeChange,
    location,
    setLocation,
    label,
    setLabel,
    selectedClient,
    handleClientChange,
    shareWithOptions,
    handleShareWithOptionsChange,
    selectedSpecificMembers,
    handleSpecificMembersChange,
    repeat,
    repeatEvery,
    setRepeat,
    selectedEveryParam,
    handleEvaryParamChange,
    cycles,
    setCycles,
    color,
    setColor,
    setStartTime,
    setEndTime,
    setSelectedClient,
    setRepeatEvery
   }) => {

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

  return (
    <div>
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
                            value={repeatEvery}
                            onChange={(e) => setRepeatEvery(e.target.value)}
                            placeholder="e.g., 2"
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
      </Dialog> 
    </div>
  )
}

export default AddNewEvent
  