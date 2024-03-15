import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../images/icons/dashboard.png';
import SelfServiceIcon from '../../images/icons/hrm/self-service.png';
import LeaveIcon from '../../images/icons/hrm/leave.png';
import TimeIcon from '../../images/icons/hrm/calendar.png';




const SiderBarNavigation = () => {
    
  return (
    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
      <li>
        <NavLink
            to="/hrm"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        > 
            <img src={DashboardIcon} alt="Project Management" className='w-8'/>
            DashBoard
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/self_service"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={SelfServiceIcon} alt="Inventory Management" className='w-8'/>  
            Self Service
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/leave"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={LeaveIcon} alt="Human Resource Management" className='w-8'/>  
            Leave
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/time"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={TimeIcon} alt="Customer Relationship Management" className='w-8'/>    
            Time
        </NavLink>
       </li>
    </ul>            
  )
}

export default SiderBarNavigation
