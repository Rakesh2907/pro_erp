import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";


const AddUnit = ({open, onClose }) => {


 
    

  return (
    <Dialog open={open} onClose={onClose}>
         <DialogHeader>Add New Unit</DialogHeader>
         <DialogBody className="custom-dialog-body">
              
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
    </Dialog>
  )
}

export default AddUnit;  