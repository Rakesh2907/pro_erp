import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../../server';
import { useSelector } from "react-redux";
import { toast }  from 'react-toastify';

const ReplyForm = ({ postId, hideForm, onReplySubmit}) => {

  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/timeline/reply`, {
        postId,
        ...formData,
        user
      }, { withCredentials: true });
  
      if (response.data.message) {
        setFormData({ description: '' });
        toast.success(response.data.message);
        hideForm();
        // Call onReplySubmit with the new reply data
        if (onReplySubmit) {
          onReplySubmit(response.data.reply); // Assuming response.data.reply contains the new reply data
        }
      } else {
        toast.error('Error submitting reply:', response.data.error);
      }
  
    } catch (error) {
      // Check if the error response exists and contains a message
      if (error.response && error.response.data && error.response.data.error) {
        toast.error('Error submitting reply:', error.response.data.error);
      } else {
        // If no specific error message is available, use a generic message
        toast.error('Error submitting reply: An error occurred.');
      }
    }
  };
  

  return (
    <div id={`reply-form-container-${postId}`}>
      <form className="reply-form general-form" onSubmit={handleSubmit}>
        <div className="mb15 p15 box">
          <div className="box-content avatar avatar-sm pr15">
            <img src="images/user/user-01.png" alt="..." />
          </div>
          <div className="box-content form-group">
            <textarea
              name="description"
              rows="4"
              placeholder="Write a reply..."
              className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <footer className="rounded-tl rounded-tr border-gray-300 bg-gray-500 !important clear-both">
              <button
                className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-send icon-16"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Post Reply
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;