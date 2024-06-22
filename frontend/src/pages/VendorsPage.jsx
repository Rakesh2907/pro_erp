import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const VendorsPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb 
              items={[
                { label: 'Home', link: '/home' },
                { label: 'Dashboard', link: '/inventory_management' },
                { label: 'Vendor(s) Manager', link: '/vendors' }
              ]}
          />
       </HomePage>
    </div>
  )
}

export default VendorsPage;
