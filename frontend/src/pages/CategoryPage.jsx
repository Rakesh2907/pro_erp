import React from 'react';
import HomePage from './HomePage';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const CategoryPage = () => {
  return (
    <div>
      <HomePage>
        <Breadcrumb
              items={[
                { label: 'Home', link: '/home' },
                { label: 'Dashboard', link: '/inventory_management' },
                { label: 'Category Manager', link: '/categories' }
              ]}
        />
      </HomePage>
    </div>
  )
}

export default CategoryPage;
