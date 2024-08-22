import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserNameFromToken } from '../../utils/jwt';

import './Navigation.css';
import { useContext, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';

const Navigation = () => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const { isLoggedIn, logoutHandler, userName, role } = useContext(UserContext);

  // const token = localStorage.getItem('token');
  // const navigate = useNavigate();
  // const isLoggedIn = !!localStorage.getItem('token');
  // // const userName = getUserNameFromToken(token);
  // const userName = isLoggedIn ? getUserNameFromToken(token) : null;

  // const logoutHandler = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('role');
  //   localStorage.removeItem('username');
  //   toast.success('Logged out!');
  //   navigate('/login', { replace: true });
  // };

  const onCategorySelectChangeHandler = async (e) => {
  };

  const accountPath = role === 'ADMIN' ? '/admin' : '/profile';

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand text-light' to='/'>
          Logo
        </NavLink>

        <button
          className='navbar-toggler mb-2'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='d-flex align-items-center search-select-container'>
            
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search title...'
              aria-label='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              onChange={onCategorySelectChangeHandler}
              className='form-select categories-select'
              aria-label='Select recipe category'
            >
              <option value='0'>Select recipe category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className='navbar-nav ms-auto text-end gap-2'>
            {isLoggedIn ? (
              <>
                <NavLink className='username w-100' to={accountPath}>
                  Account: {userName}
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/recipes'
                >
                  Recipes
                </NavLink>
                <button
                  className='logout'
                  onClick={() => {
                    logoutHandler();
                    toast.success('You have been logged out successfully.');
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/recipes'
                >
                  Recipes
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/login'
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/register'
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
