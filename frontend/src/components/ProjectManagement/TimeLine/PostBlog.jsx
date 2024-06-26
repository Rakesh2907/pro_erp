import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import FileUpload from '../../../common/FileUpload';
import axios from 'axios';
import { server } from '../../../server';
import { toast }  from 'react-toastify';

import { updatePostAdded } from '../../../redux/actions/postblog';

const PostBlog = () => {

  const dispatch = useDispatch();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState('');

  const formData = new FormData();
  
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const removeFile = (e,index) => {
    e.preventDefault();
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };
  
  // Event handler for textarea change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append('description', description);
    uploadedFiles.forEach((file) => {
      formData.append('file_names[]', file.name);
    });
  
    try {
      const res = await axios.post(`${server}/timeline/upload-files`, formData, { withCredentials: true });
      console.log(res);
      
      if (res && res.data && res.data.message) {
        toast.success(res.data.message);
        setDescription('');
        setUploadedFiles([]);
        dispatch(updatePostAdded(true));
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  

  const getFileThumbnail = (file) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    } else if (file.type === 'application/pdf') {
      return 'images/icons/pdf.png'; 
    } else {
      return 'path/to/default-icon.png';
    }
  };

  return (
    <div id="post-form-container">
       <form className="block mt-0 isolate-unicode mb-10" onSubmit={handleSubmit}>
        <div className="table border-spacing-0 w-full">
          <div className="align-top h-full float-none overflow-x-hidden w-20 pr-4 !important table-cell !important">
            <img src="images/user/user-01.png" alt="..." className="h-auto max-w-full rounded-full" />
          </div>
          <div className="table-cell align-top h-full float-none overflow-x-hidden bg-white mb-15 rounded-5">
            <textarea 
              name="description" 
              rows="4" 
              placeholder="Share idea or documents" 
              className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
              required
              value={description}
              onChange={handleDescriptionChange} 
            />
            <ul className="mb-6">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center mb-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                   <img src={getFileThumbnail(file)} alt={file.name} className="w-full h-full object-cover" /> 
                    {uploadProgress > 0 && (
                      <div className="absolute inset-0 bg-black opacity-75 flex items-center justify-center">
                        <div className="text-white">{uploadProgress}%</div>
                      </div>
                    )}
                  </div>
                  <span className="truncate">{file.name}</span>
                  <button className="ml-auto" onClick={(e) => removeFile(e,index)}>&times;</button>
                </li>
              ))}
            </ul>
            <footer className="rounded-tl rounded-tr border-gray-300 bg-gray-500 !important clear-both">
              <FileUpload 
                onFileUpload={handleFileUpload} 
                uploadedFiles={uploadedFiles} 
                setUploadedFiles={setUploadedFiles}
                setUploadProgress={setUploadProgress}
                usedFileUpload={'timeline'}
                formData = {formData}
              />
              <button className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2 float-right" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send icon-16">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Post
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostBlog;