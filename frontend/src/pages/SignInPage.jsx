import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/SignIn'

const SignInPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/home");
    }
  }, [isAuthenticated,navigate])

  return (
    <div>
        <Login/>
    </div>
  )
}

export default SignInPage;
