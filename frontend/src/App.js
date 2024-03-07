import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, SignUpPage } from "./routes/Routes.js";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
