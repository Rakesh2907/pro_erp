import React, { useState } from 'react';
import HomePage from './HomePage';
import UnitsDataGrid from '../components/InventoryManagement/Master/Units/UnitsDataGrid';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Button } from "@material-tailwind/react";
import AddUnit from '../components/InventoryManagement/Master/Units/Modals/AddUnit';

const UnitsPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <HomePage>
        <Breadcrumb
          items={[
            { label: 'Home', link: '/home' },
            { label: 'Dashboard', link: '/inventory_management' },
            { label: 'Units Manager', link: '/units' }
          ]}
        />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">&nbsp;</h1>
          <Button
            id="save_button"
            type="button"
            variant="gradient"
            color="blue"
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
            onClick={handleClickOpen}
          >
            <span>Add New Unit</span>
          </Button>
        </div>
        <UnitsDataGrid />
        {<AddUnit open={open} onClose={handleClose} />}
      </HomePage>
    </div>
  );
};

export default UnitsPage;
