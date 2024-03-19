import React from 'react';
import { NavLink } from 'react-router-dom';
import ProMgm from '../../images/icons/project-management.png';
//import InvMgm from '../../images/icons/stock-keeping-unit.png';
//import HrmIcon from '../../images/icons/human-resource.png';
//import CRMIcon from '../../images/icons/management.png';

const SiderBarNavigation = ({ onOpen, loadedMenus }) => {

  return (
    <div
      className={`translate transform overflow-hidden ${!onOpen && 'hidden'
        }`}
    >
      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-1">
        {loadedMenus.map((menuComponent, index) => (
          <li key={index}>
            <NavLink
              to={`/${menuComponent.url}`}
              className={({ isActive }) =>
                'group relative flex items-center gap-2.5 rounded-md px-3 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                (isActive && '!text-white')
              }
            >
              <img src={ProMgm} alt={`${menuComponent.menu_name}`} className='w-8' title={`${menuComponent.menu_name}`} />
              {menuComponent.menu_name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default SiderBarNavigation