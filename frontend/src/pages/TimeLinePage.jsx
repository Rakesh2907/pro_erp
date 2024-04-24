import React, { useState } from 'react';
import HomePage from './HomePage';
import PostBlog from '../components/ProjectManagement/TimeLine/PostBlog';
import PostTimeLine from '../components/ProjectManagement/TimeLine/PostTimeLine';

const TimeLinePage = () => {
  const [postAdded, setPostAdded] = useState(false);
  
  const handleNewPost = () => {
    setPostAdded(true);
  };
 
  return (
    <div>
      <HomePage>
        <div className="table table-fixed border-spacing-0 w-full">     {/* <!-- box --> */}
          <div className="table-cell align-top h-full float-none overflow-x-hidden"> {/* <!-- box-content --> */}
            <div id="timeline-content" className="p-4 clearfix mb-5 overflow-hidden !important overflow-anchor-none touch-action-auto " style={{ position: 'relative' }}>
               <PostBlog handleNewPost={handleNewPost} /> 
               <PostTimeLine keyProp={postAdded ? 'postAdded' : 'postNotAdded'} />
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
