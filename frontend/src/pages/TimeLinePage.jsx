import React from 'react';
import HomePage from './HomePage';

const TimeLinePage = () => {
  return (
    <div>
      <HomePage>
        <div className="table table-fixed border-spacing-0 w-full">     {/* <!-- box --> */}
          <div className="table-cell align-top h-full float-none overflow-x-hidden"> {/* <!-- box-content --> */}
            <div id="timeline-content" className="p-4 clearfix mb-5 overflow-hidden !important overflow-anchor-none touch-action-auto " style={{ position: 'relative' }}>
              <div id="post-form-container">
                <form className="block mt-0 isolate-unicode mb-10">
                  <div className="table border-spacing-0 w-full"> {/* <!-- box --> */}
                    <div className="align-top h-full float-none overflow-x-hidden w-20 pr-4 !important table-cell !important">
                      <img src="images/user/user-01.png" alt="..." className="h-auto max-w-full rounded-full" />
                    </div>
                    <div className="table-cell align-top h-full float-none overflow-x-hidden bg-white mb-15 rounded-5">
                      <textarea rows="3" placeholder="Share idea or documents" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                      <footer className="rounded-tl rounded-tr border-gray-300 bg-gray-500 !important clear-both">
                        <button className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 float-left">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-camera icon-16">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          Upload File
                        </button>
                        <button className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send icon-16"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Post</button>
                      </footer>
                    </div>
                  </div>
                </form>
              </div>
              <div id="post_timeline" className="list-none w-full min-h-full mx-auto relative">
                <div id="post-content-container-6" className="post-content">
                  <div className="clearfix">
                    <div className="clearfix post-date">
                      <span className='bg-blue-500 text-white py-2 px-5 pb-2 rounded-lg'>30/03/2024</span>
                    </div>
                    <div className="mb-5 clearfix transition-all duration-1000 my-4 relative flex flex-col min-w-0 overflow-wrap-normal bg-white bg-clip-border border border-solid border-black border-opacity-25 rounded">  {/* card */}
                      <div className="p-4"> {/** Card-body */}
                        <div className="clearfix my-2">
                          <div className="d-flex">
                            <div className="w-100">
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-2">
                                  <span className="avatar avatar-sm">
                                    <img src="images/user/user-01.png" alt="..." />
                                  </span>
                                </div>
                                <div className="w-100">
                                  <div className="mt5">
                                    <a href="/Rakesh_ahirrao" className="text-zinc-950">Rakesh Ahirrao</a>
                                  </div>
                                  <small>
                                    <span className="text-off">30/03/2024 01:39:58 pm</span>
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                              >
                                <svg
                                  className="w-2.5 h-2.5 ms-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                  />
                                </svg>
                              </button>

                              <div
                                id="dropdown"
                                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                              >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                  <li>
                                    <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                      Dashboard
                                    </a>
                                  </li>

                                </ul>
                              </div>


                            </div>
                          </div>
                        </div>
                        <p>RDU is modular. In the Quick Start example, the only prop needed to perform uploads is getUploadParams. onChangeStatus is included to show how a file's status changes as it's dropped and uploaded. onSubmit gives users a button to submit files that are done uploading.Want to disable the file input? Pass null for InputComponent. Don't want to show file previews? Pass null for PreviewComponent. Don't need a submit button after files are uploaded? Pass null for SubmitButtonComponent, or simply omit the onSubmit prop.Don't want to upload files? Omit getUploadParams, and you'll have a dropzone that calls onChangeStatus every time you add a file. This callback receives a fileWithMeta object and the file's status. If status is 'done', the file has been prepared and validated. Add it to an array of accepted files, or do whatever you want with it.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <div className="clearfix">
                    <div className="post-date clearfix">
                      <span className='bg-blue-500 text-white py-2 px-5 pb-2 rounded-lg'>30/03/2024</span>
                    </div>
                    <div className="mb-5 clearfix transition-all duration-1000 my-4 relative flex flex-col min-w-0 overflow-wrap-normal bg-white bg-clip-border border border-solid border-black border-opacity-25 rounded">  {/* card */}
                      <div className="p-4"> {/** Card-body */}
                        <div className="clearfix my-2">
                          <div className="d-flex">
                            <div className="w-100">
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-2">
                                  <span className="avatar avatar-sm">
                                    <img src="images/user/user-01.png" alt="..." />
                                  </span>
                                </div>
                                <div className="w-100">
                                  <div className="">

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div style={{width: '250px', minHeight: '100%'}} className="table-cell align-top h-full float-none overflow-x-hidden bg-white">
             User List
  </div>*/}
        </div>

      </HomePage>
    </div>
  )
}

export default TimeLinePage
