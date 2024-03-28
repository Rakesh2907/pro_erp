import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  SignInPage, 
  SignUpPage, 
  ActivationPage, 
  HomePage
} from "./routes/Routes.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { server } from './server.js';
//import { useSelector } from 'react-redux';


// Function to fetch route data from the database
const fetchRoutes = async () => {
  try {
    const response = await axios.get(`${server}/menu/getroutes`, {
      withCredentials: true,
    });
    return response.data.dynamic_routers;
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
};



// Function to load route components dynamically
const loadRoutes = async () => {
  const routesData = await fetchRoutes();

  return routesData.map(route => ({
    ...route,
    component: React.lazy(() => import(`./pages/${route.components_page}`)),
  }));
};

const App = () => {
  
  //const user = useSelector(state => state.user);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    Store.dispatch(loadUser());
    const fetchAndSetRoutes = async () => {
      try {
        
        //if (user.isAuthenticated) {
          const fetchedRoutes = await loadRoutes();
          setRoutes(fetchedRoutes);
          
        //} else {
          //console.log('User data is empty. Routes will not be fetched.');
        //}
      } catch (error) {
        console.error('Error fetching and setting routes:', error);
      }
    };

    fetchAndSetRoutes();

  }, []);

 /* {routes.map((route, index) => (
     console.log(route.url)
  ))}
*/

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/activation/:activation_token" element={<ActivationPage />}/>
          <Route path="/home" 
           element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>  
           }
         />
         {routes.map((route, index) => (
          <Route
            key={index}
            path={`/${route.url}`} 
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <route.component />
                </Suspense>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
