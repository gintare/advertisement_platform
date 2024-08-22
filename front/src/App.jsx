import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import UserContext, { UserProvider } from './Context/UserContext/UserContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';

function App() {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);

  return (
    <>
      <ToastContainer autoClose={3000} position='top-center' />
      <Header />
      
        <Routes>
          <Route path='/' element={<Navigate to='/register' />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
