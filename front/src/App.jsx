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
import { CategoriesProvider } from './Context/CategoriesContext/CategoriesContext';
import EditAdversementPage from './pages/EditAdversementPage/EditAdversementPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { AdvertisementProvider } from './Context/AdvertisementContext/AdvertisementContext';
import AddsPage from './pages/AddsPage/AddsPage';

function App() {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);

  return (
    <>
      <ToastContainer autoClose={3000} position='top-center' />
      <CategoriesProvider>
      <AdvertisementProvider>
      <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/editAdversement' element={<EditAdversementPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/ads' element={<AddsPage />} />
        </Routes>
      <Footer />
      </AdvertisementProvider>
      </CategoriesProvider>
    </>
  );
}

export default App;
