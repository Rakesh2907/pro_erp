import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../server';

const Dashboard = () => {
    const [loadedModules, setLoadedModules] = useState([]);

    useEffect(() => {
        axios.get(`${server}/module/getmodules`, {
            withCredentials: true,
        }).then(response => {
            setLoadedModules(response.data.modules); // Corrected to 'modules'
        }).catch(error => {
            console.error("Error fetching modules:", error);
        });
    },[]);

    const loadDynamicNavigation = (module_id) => {
        localStorage.setItem('module_id', module_id);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {loadedModules.map((moduleComponent, index) => (
                <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <div className="flex">
                        <img src={`/images/icons/${moduleComponent.module_icon}`} alt="Module Icon" className="w-10 h-10 mr-4" />
                        <h6 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{moduleComponent.module_name}</h6>
                    </div>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{moduleComponent.description}</p>
                    <a href={`/${moduleComponent.key}`} className="inline-flex font-medium items-center text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" onClick={() => loadDynamicNavigation(moduleComponent.module_id)}>
                        Open
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;