import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DropdownUser = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const logoutHandler = () => {
    axios
    .get(`${server}/user/logout`, { withCredentials: true })
    .then((res) => {
      toast.success(res.data.message);
      window.location.reload(true);
      navigate("/");
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  }

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
          <span className="block text-xs">{user?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src="images/user/user-01.png" alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562ZM20.3125 19.1063C20.3125 19.5469 19.9688 19.8906 19.5312 19.8906H2.46875C2.03125 19.8906 1.6875 19.5469 1.6875 19.1063V16.3437C1.6875 14.9656 6.125 13.9844 11 13.9844C15.875 13.9844 20.3125 14.9656 20.3125 16.3437V19.1063ZM11 12.9656C6.46875 12.9656 2.625 14.3344 2.625 16.3437V19.1063C2.625 19.2875 2.78125 19.4437 2.96875 19.4437H19.0312C19.2188 19.4437 19.375 19.2875 19.375 19.1063V16.3437C19.375 14.3344 15.5312 12.9656 11 12.9656Z"
                  fill=""
                />
              </svg>
              <span>Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.625 11C2.625 9.78125 3.65625 8.75 4.875 8.75H17.125C18.3438 8.75 19.375 9.78125 19.375 11V16.3438C19.375 17.5625 18.3438 18.5938 17.125 18.5938H4.875C3.65625 18.5938 2.625 17.5625 2.625 16.3438V11ZM13.5 10.3125C14.1562 10.3125 14.6875 9.78125 14.6875 9.125C14.6875 8.46875 14.1562 7.9375 13.5 7.9375C12.8438 7.9375 12.3125 8.46875 12.3125 9.125C12.3125 9.78125 12.8438 10.3125 13.5 10.3125ZM4.875 17.1875C4.59375 17.1875 4.35938 16.9531 4.35938 16.6719V11C4.35938 10.7188 4.59375 10.4844 4.875 10.4844H17.125C17.4062 10.4844 17.6406 10.7188 17.6406 11V16.6719C17.6406 16.9531 17.4062 17.1875 17.125 17.1875H4.875Z"
                  fill=""
                />
              </svg>
              <span>Settings</span>
            </Link>
          </li>
        </ul>

        <div className="flex flex-col gap-5 px-6 py-4">
          <Link
            onClick={logoutHandler}
            className="text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            Sign out
          </Link>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
