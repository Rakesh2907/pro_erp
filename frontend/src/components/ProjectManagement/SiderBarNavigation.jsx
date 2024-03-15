import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../images/icons/dashboard.png';
import TimeLineIcon from '../../images/icons/pms/timeline.png';
import EventIcon from '../../images/icons/pms/event.png';
import NotesIcon from '../../images/icons/pms/post-it.png';


const SiderBarNavigation = () => {
    
  return (
    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
      <li>
        <NavLink
            to="/project_management"
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
            to="/time_line"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={TimeLineIcon} alt="Inventory Management" className='w-8'/>  
            TimeLine
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/events"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={EventIcon} alt="Human Resource Management" className='w-8'/>  
            Events
        </NavLink>
        </li>
        <li>
        <NavLink
            to="/notes"
            className={({ isActive }) =>
            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
            (isActive && '!text-white')
            }
        >
            <img src={NotesIcon} alt="Customer Relationship Management" className='w-8'/>    
            Notes
        </NavLink>
       </li>
    </ul>            
  )
}

export default SiderBarNavigation
