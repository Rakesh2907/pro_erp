import React, { useEffect, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import SidebarLinkGroup from '../Layouts/SideBar/SidebarLinkGroup';
import { server } from '../../server';
import axios from 'axios';

const SiderBarNavigation = ({ onOpen, loadedMenus }) => {
  const location = useLocation();
  const { pathname } = location;

  const [subMenusMap, setSubMenusMap] = useState({});

  useEffect(() => {
    // Initialize submenus map
    const initialSubMenusMap = {};
    loadedMenus.forEach(menu => {
      if (menu.sub_menu === '1') {
        initialSubMenusMap[menu.menu_id] = [];
      }
    });
    setSubMenusMap(initialSubMenusMap);
  }, [loadedMenus]);

  const loadSubNavigation = (menu_id) => {
    axios.get(`${server}/menu/get_sub_menus/${menu_id}`, {
      withCredentials: true,
    }).then(response => {
      setSubMenusMap(prevState => ({
        ...prevState,
        [menu_id]: response.data.sub_menus
      }));
    });
  };

  //console.log("After Fetch : "+JSON.stringify(subMenusMap, null, 2));

  return (
    <div className={`translate transform overflow-hidden`}>
      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5">
        {loadedMenus.map((menuComponent, index) => (
          menuComponent.sub_menu === '0' ? (
            <li key={index}>
              <NavLink
                to={`/${menuComponent.url}`}
                className={({ isActive }) =>
                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                  (isActive && '!text-white')
                }
              >
                <img src={`${menuComponent.menu_icon}`} alt={`${menuComponent.menu_name}`} className='w-8' title={`${menuComponent.menu_name}`} />
                {menuComponent.menu_name}
              </NavLink>
            </li>
          ) : (
            <SidebarLinkGroup
              key={index}
              activeCondition={
                pathname === `/${menuComponent.url}` || pathname.includes(`/${menuComponent.url}`)
              }
            >
               {(handleClick, onOpen) => {
                 //console.log(menuComponent.url);
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === `/${menuComponent.url}`  ||
                          pathname.includes(`/${menuComponent.url}`)) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={() => {
                             loadSubNavigation(menuComponent.menu_id)
                             handleClick()
                        }}
                      >
                        <img src={`${menuComponent.menu_icon}`} alt={`${menuComponent.menu_name}`} className='w-8' title={`${menuComponent.menu_name}`} />
                        {menuComponent.menu_name}
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            onOpen && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !onOpen && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        {subMenusMap[menuComponent.menu_id] && subMenusMap[menuComponent.menu_id].map((subMenuComponent, index) => (
                          <li key={index}>
                            <NavLink
                              to={`/${subMenuComponent.url}`}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              {subMenuComponent.menu_name}
                            </NavLink>
                          </li>
                        ))}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
            </SidebarLinkGroup>
          )
        ))}
      </ul>
    </div>
  );
};

export default SiderBarNavigation