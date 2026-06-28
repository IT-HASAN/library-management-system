import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice';
import { Book, MenuBook, Search, Login, AccountCircle, Menu, Close } from '@mui/icons-material';
export const Header:React.FC = () => {
  
  const searchRef = useRef<HTMLInputElement>(null);
  const authState = useSelector((state:RootState) => state.authentication);

  const navigate = useNavigate();

  const dispatch:AppDispatch = useDispatch();

  const [mobileMenuClicked, setMobileMenuClicked] = useState(false);
  const handleMobileMenuClicked = () => setMobileMenuClicked(!mobileMenuClicked);
  const closeMobileMenu = () => setMobileMenuClicked(false);

  const handleEnterKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
      setMobileMenuClicked(false);
    }
  }

  const handleSearchIconClicked = () => {
    if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
    }
  }

  const navigateToProfile = () => {
    if (authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
  }

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  }
  
  return (
    <header>
      <Link to="/" className="logo-site-title">
        <Book sx={{
          fontSize: "3rem"
        }} />
        <h1 style={{
          lineHeight: "1",
          color: "#000000"
        }}>
          MERN Library
        </h1>
      </Link>
      <nav className={mobileMenuClicked ? "show-mobile-nav" : "hide-mobile-nav"}>
        <Link to="/catalog" style={{
          width: "100%", 
          textDecoration: "none"
          }}
        >
          <button className="navbar-btn" onClick={closeMobileMenu}>
            <MenuBook sx={{
              fontSize: "1.5rem"
            }}/>
            View Catalog
          </button>
        </Link>
        <div className="navbar-search-box">
          <input className="navbar-search-input" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={searchRef} />
          <Search onClick={() => {handleSearchIconClicked(); closeMobileMenu();}}
            sx={{
              cursor: "pointer",
              fontSize: "2rem"
            }}
          />
        </div>
        {authState.loggedInUser ?
          <button className="logged-in-user navbar-btn" onClick={() => {navigateToProfile(); closeMobileMenu();}}>
            <AccountCircle sx={{
              fontSize: "1.5rem"
            }}/>
            {authState.loggedInUser.firstName}
          </button>
          :
          <button className='navbar-btn' onClick={() => {toggleLogin(); closeMobileMenu();}}>
            <Login sx={{
              fontSize: "1.5rem"
            }}/>
            Login
          </button>
        }
      </nav>
      <span className="mobile-nav" onClick={handleMobileMenuClicked}>
        {mobileMenuClicked ?
          <Close sx={{
            fontSize: "3rem"
          }} /> 
          : <Menu sx={{
            fontSize: "3rem"
          }} /> 
        }  
      </span>
    </header>
  )
}