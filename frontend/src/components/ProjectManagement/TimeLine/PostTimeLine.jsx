import React from 'react'

const PostTimeLine = () => {
    return (
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
    )
}

export default PostTimeLine
