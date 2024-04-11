import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { server } from '../server';
import { toast }  from 'react-toastify';

const FileUpload = ({ onFileUpload, uploadedFiles, setUploadedFiles , setUploadProgress, usedFileUpload, formData}) => {
    //const [uploadedFiles, setUploadedFiles] = useState([]);

    const onDrop = useCallback(async (acceptedFiles) => {
        // Ensure acceptedFiles is an array
        if (!Array.isArray(acceptedFiles)) {
            console.error('Accepted files is not an array');
            return;
        }

        const updatedFiles = [...uploadedFiles, ...acceptedFiles];
        setUploadedFiles(updatedFiles);
        onFileUpload(updatedFiles); // Pass updated files to the parent component

        //const formData = new FormData();
        updatedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${server}/`+usedFileUpload+`/upload-files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });
            console.log(response.data); // Handle response from server
            setUploadProgress(0);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadProgress(0); 
        }
    }, [onFileUpload, uploadedFiles, setUploadedFiles, setUploadProgress, usedFileUpload, formData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'], 
            'image/jpeg': ['.jpg', '.jpeg'] ,
            'application/pdf': ['.pdf', '.PDF']
        },
    });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <button
                    className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 float-left"
                    onClick={(e) => {
                        e.preventDefault(); 
                    }}
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
                        className="feather feather-camera icon-16"
                    >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    Upload File
                </button>
            )}
        </div>
    );
};

export default FileUpload;