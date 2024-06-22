import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const MaterialsPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb 
             items={[
              { label: 'Home', link: '/home' },
              { label: 'Dashboard', link: '/inventory_management' },
              { label: 'Material(s) Manager', link: '/materials' }
            ]}
          />
       </HomePage>
    </div>
  )
}

export default MaterialsPage;
