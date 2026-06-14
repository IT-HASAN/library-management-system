import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UpdateUserForm.css';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import type { User } from '../../../../models/User';
import { Create } from '@mui/icons-material';
import { resetUser, updateUser } from '../../../../redux/slices/AuthenticationSlice';

export const UpdateUserForm:React.FC = () => {
  const userState = useSelector((state:RootState) => state.authentication);
  const dispatch:AppDispatch = useDispatch();
  
  const profileUser = userState.profileUser;
  const [user, setUser] = useState<User | undefined>(profileUser);
  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);

  const navigate = useNavigate();

  const updateUserState = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDisplayUpdate(true);
    
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      }
    });
  };

  const submitUpdatedUser = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user) dispatch(updateUser(user));
    setDisplayUpdate(false);
  }
  
  const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    dispatch(resetUser("loggedInUser"));
    dispatch(resetUser("profileUser"));
    navigate("/");
  }

  return (
    <form className="update-user-form">
      <div className="update-user-input-group">
        <label htmlFor="firstName">First Name:</label>
        <div className="update-user-input-container">
          <input className="update-user-input" name="firstName" value={user?.firstName ?? ""} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} />
          {userState.loggedInUser?._id === userState.profileUser?._id && <Create />}
        </div>
      </div>
      <div className="update-user-input-group">
        <label htmlFor="lastName">Last Name:</label>
        <div className="update-user-input-container">
          <input className="update-user-input" name="lastName" value={user?.lastName ?? ""} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} />
          {userState.loggedInUser?._id === userState.profileUser?._id && <Create />}
        </div>
      </div>
      <div className="update-user-input-group">
        <label htmlFor="email">Email:</label>
        <div className="update-user-input-container">
          <input className="update-user-input" name="email" value={user?.email ?? ""} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id} />
          {userState.loggedInUser?._id === userState.profileUser?._id && <Create />}
        </div>
      </div>
      {displayUpdate ? <button className="profile-button" onClick={submitUpdatedUser}>Update Profile</button> : <></>}
      {userState.loggedInUser?._id === userState.profileUser?._id ? <button className="profile-button" onClick={logout}>Logout of Account</button> : <></>}
    </form>
  )
}