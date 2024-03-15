import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../images/icons/dashboard.png';
import InventoryIcon from '../../images/icons/inventory/grocery-store.png';

const SideBarNavigation = () => {
  return (
    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
      <li>
        <NavLink
            to="/inventory_management"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        > 
            <img src={DashboardIcon} alt="Dashboard" className='w-8' title='Dashboard'/>
            DashBoard
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/store"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={InventoryIcon} alt="Store" className='w-8' title='Store'/>  
            Store
        </NavLink>
        </li>
    </ul>            
  )
}

export default SideBarNavigation
