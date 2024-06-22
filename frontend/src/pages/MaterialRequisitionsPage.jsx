import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const MaterialRequisitionsPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb
              items={[
                { label: 'Home', link: '/home' },
                { label: 'Dashboard', link: '/inventory_management' },
                { label: 'Material Requisition(s)', link: '/material_requisitions' }
              ]}
          />
       </HomePage>
    </div>
  )
}

export default MaterialRequisitionsPage;
