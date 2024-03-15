import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, SignUpPage, ActivationPage, HomePage, ProjectManagementPage, HRMPage, InventoryManagementPage } from "./routes/Routes.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useEffect } from 'react';



const App = () => {

 useEffect(()=>{
    Store.dispatch(loadUser());
 },[]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>} />
          <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
         />
         <Route 
           path="/home" 
           element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>  
           }
         />
         <Route 
            path="/project_management"
            element={
              <ProtectedRoute>
                <ProjectManagementPage/>
              </ProtectedRoute>  
            }
        />
        <Route 
            path="/hrm"
            element={
              <ProtectedRoute>
                <HRMPage/>
              </ProtectedRoute>  
            }
        />
        <Route 
            path="/inventory_management"
            element={
              <ProtectedRoute>
                <InventoryManagementPage/>
              </ProtectedRoute>  
            }
        />
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
