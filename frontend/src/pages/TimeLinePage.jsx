import React from 'react';
import HomePage from './HomePage';

const TimeLinePage = () => {
  return (
    <div>
       <HomePage> 
        <div className="table table-fixed border-spacing-0 w-full">     {/* <!-- box --> */}
          <div className="table-cell align-top h-full float-none overflow-x-hidden"> {/* <!-- box-content --> */}

              <form className="block mt-0 isolate-unicode general-form">
                <div className="table border-spacing-0 w-full"> {/* <!-- box --> */}
                  <div className="align-top h-full float-none overflow-x-hidden w-20 pr-4 !important table-cell !important">
                      <img src="images/user/user-01.png" alt="..."  className="h-auto max-w-full rounded-full"/>
                  </div> 
                  <div className="table-cell align-top h-full float-none overflow-x-hidden bg-white mb-15 rounded-5">
                      <textarea rows="3" placeholder="Share idea or documents" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                      <footer className="rounded-tl rounded-tr border-gray-300 bg-gray-500 !important clear-both">
                        <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 float-left">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-camera icon-16">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          Upload File
                        </button>
                        <button className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-send icon-16"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Post</button>
                    </footer>
                  </div> 
                </div>
              </form>  
          </div>
          {/*<div style={{width: '250px', minHeight: '100%'}} className="table-cell align-top h-full float-none overflow-x-hidden bg-white">
             dsd sda dasd
  </div>*/}
        </div>  
       </HomePage>
    </div>
  )
}

export default TimeLinePage