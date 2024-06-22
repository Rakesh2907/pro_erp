import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const PurchaseOrderPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb 
             items={[
              { label: 'Home', link: '/home' },
              { label: 'Dashboard', link: '/inventory_management' },
              { label: 'Purchase Order(s)', link: '/purchase_orders' }
            ]}
          />
       </HomePage>
    </div>
  )
}

export default PurchaseOrderPage;
