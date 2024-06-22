import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const PurchaseRequisitionsPage = () => {
  return (
    <div>
       <HomePage>
          <Breadcrumb
              items={[
                { label: 'Home', link: '/home' },
                { label: 'Dashboard', link: '/inventory_management' },
                { label: 'Purchase Requisition(s)', link: '/purchase_requisitions' }
              ]}
          />
       </HomePage>
    </div>
  )
}

export default PurchaseRequisitionsPage;
