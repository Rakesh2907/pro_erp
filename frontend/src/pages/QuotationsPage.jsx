import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const QuotationsPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb 
             items={[
              { label: 'Home', link: '/home' },
              { label: 'Dashboard', link: '/inventory_management' },
              { label: 'Quotation(s)', link: '/quotations' }
            ]}
          />
       </HomePage>
    </div>
  )
}

export default QuotationsPage;
