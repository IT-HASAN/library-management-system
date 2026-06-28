import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import './RegisterLibraryCardForm.css';
import { getLibraryCard } from '../../../../redux/slices/AuthenticationSlice';
import { setDisplayLibraryCard, setDisplayLogin } from '../../../../redux/slices/ModalSlice';

export const RegisterLibraryCardForm:React.FC = () => {
  const userState = useSelector((state:RootState) => state.authentication);

  const dispatch:AppDispatch = useDispatch();

  const handleCreateLibraryCard = () => {
    if (userState.loggedInUser) {
      dispatch (
        getLibraryCard(userState.loggedInUser?._id)
      )
    }
    console.log(userState.libraryCard);
  }
  const handleLoginClick = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  }

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  }

  return (
    <>
      {userState.loggedInUser ?
        <div className="register-library-card-container">
          <h2 className="register-library-card-text">Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}</h2>
          {
            userState.libraryCard ? 
            <>
              <p className="library-card-number-text">Your library card number is: {userState.libraryCard}</p> 
              <button className="register-library-modal-button" onClick={closeModal}>Ok</button>
            </> : 
            <>
              <p className="register-library-card-text">To signup a new library card, or you forgot the ID number on your card, use the button below.</p>
              <button className="register-library-modal-button" onClick={handleCreateLibraryCard}>Get Library Card</button>
            </>
          }
        </div>
        :
        <div className="register-library-card-container">
          <h2 className="register-library-card-text">Register to obtain library card</h2>
          <p className="register-library-card-text">You must be a member of the library to obtain a library card. Use the button below to login to your account or register for free.</p>
          <button className="register-library-modal-button" onClick={handleLoginClick}>Login Here</button>
        </div>
      }
    </>
  ) 
}