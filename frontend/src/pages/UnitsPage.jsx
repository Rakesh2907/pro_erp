import React from 'react';
import HomePage from './HomePage';
import UnitsDataGrid from '../components/InventoryManagement/Master/Units/UnitsDataGrid';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const UnitsPage = () => {
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
          <UnitsDataGrid />
      </HomePage>
    </div>
  )
}

export default UnitsPage;
