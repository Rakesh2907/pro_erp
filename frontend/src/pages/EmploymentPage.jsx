import React from 'react'
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const EmploymentPage = () => {
  return (
    <div>
      <HomePage>
         <Breadcrumb
            items={[
              { label: 'Home', link: '/home' },
              { label: 'Dashboard', link: '/hrm' },
              { label: 'Self Services', link: '/self_services' },
              { label: 'Employment', link: '/self_services/employment' }
            ]}
        />
      </HomePage>
    </div>
  )
}

export default EmploymentPage
