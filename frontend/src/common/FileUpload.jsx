import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { server } from '../server';

const FileUpload = ({ onFileUpload }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onDrop = useCallback(async (acceptedFiles) => {
        // Ensure acceptedFiles is an array
        if (!Array.isArray(acceptedFiles)) {
            console.error('Accepted files is not an array');
            return;
        }

        const updatedFiles = [...uploadedFiles, ...acceptedFiles];
        setUploadedFiles(updatedFiles);
        onFileUpload(updatedFiles); // Pass updated files to the parent component

        const formData = new FormData();
        updatedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            // Replace 'YOUR_UPLOAD_ENDPOINT' with your actual upload endpoint URL
            const response = await axios.post(`${server}/timeline/upload_files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Handle response from server
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }, [onFileUpload, uploadedFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // Update accept to allow specific MIME types, e.g., 'image/*', 'application/pdf', etc.
        //accept: 'image/*, application/pdf', // Allow images and PDF files
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
                        e.preventDefault(); // Prevent page reload
                        // Add your file upload logic here
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