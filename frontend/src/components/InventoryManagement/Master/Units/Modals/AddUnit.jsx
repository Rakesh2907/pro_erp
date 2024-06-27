import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";


const AddUnit = ({ open, onClose }) => {
    const [units, setUnits] = useState('');
    const [description, setDescription] = useState('');

    const handleUnitSubmit = async (e) => {
        e.preventDefault();
    }

    return (
      <div>
        <Dialog open={open} onClose={onClose}>
          <form id="event-form" onSubmit={handleUnitSubmit}>
            <DialogHeader>Add New Unit</DialogHeader>
            <DialogBody className="custom-dialog-body">
                <div className="modal">
                    <div className="flex mb-4">
                        <div className="w-3/12 pr-2">
                            <label className="block mb-2" htmlFor="units">
                                Units:
                            </label>
                        </div>
                        <div className="w-9/12">
                            <input
                                id="units"
                                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
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
                <Button id="save_button" type="submit" variant="gradient" color="green" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right">
                    <span>Save</span>
                </Button>
            </DialogFooter>
          </form> 
        </Dialog>
        </div>    
    )
}

export default AddUnit;  