import React from 'react';
import { NavLink } from 'react-router-dom';
import ProMgm from '../../images/icons/project-management.png';
import InvMgm from '../../images/icons/stock-keeping-unit.png';
import HrmIcon from '../../images/icons/human-resource.png';
import CRMIcon from '../../images/icons/management.png';

const SiderBarNavigation = ({onLoadPMSNavigation, onLoadHRMNavigation, onLoadInventoryNavigation}) => {
    
    return (
      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
        <li>
          <NavLink
            onClick={onLoadPMSNavigation}
            to="/project_management"
            className={({ isActive }) =>
              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
              (isActive && '!text-white')
            }
          > 
            <img src={ProMgm} alt="Project Management" className='w-8'/>
            Projects Management
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={onLoadInventoryNavigation}
            to="/inventory_management"
            className={({ isActive }) =>
              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
              (isActive && '!text-white')
            }
          >
              <img src={InvMgm} alt="Inventory Management" className='w-8'/>  
            Inventory Management
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={onLoadHRMNavigation}
            to="/hrm"
            className={({ isActive }) =>
              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
              (isActive && '!text-white')
            }
          >
            <img src={HrmIcon} alt="Human Resource Management" className='w-8'/>  
            Human Resource Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/crm"
            className={({ isActive }) =>
              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
              (isActive && '!text-white')
            }
          >
            <img src={CRMIcon} alt="Customer Relationship Management" className='w-8'/>    
            Customer Relationship Management
          </NavLink>
        </li>
      </ul>           
    )
  }
  
  export default SiderBarNavigation