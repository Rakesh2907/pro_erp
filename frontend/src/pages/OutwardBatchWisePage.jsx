import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const OutwardBatchWisePage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb 
               items={[
                { label: 'Home', link: '/home' },
                { label: 'Dashboard', link: '/inventory_management' },
                { label: 'Outward(s)', link: '/outward_batch_wise' }
              ]}
          />
       </HomePage>
    </div>
  )
}

export default OutwardBatchWisePage;
