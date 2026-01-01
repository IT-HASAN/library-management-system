import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../redux/ReduxStore';
import { loginUser } from '../../../../redux/slices/AuthenticationSlice';

import './LoginForm.css';
import type { User } from '../../../../models/User';

export const LoginForm:React.FC = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useSelector((state:RootState) => state.authentication);
  const dispatch:AppDispatch = useDispatch();

  const handleLoginUser = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
      dispatch(loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  }

  return (
    <form className="login-form">
      <h2>Please Login</h2>
      {auth.error ? <p className="login-form-error">Username or password incorrect</p> : <></>}
      <div className="login-form-input-group">
        <h6>Email</h6>
        <input 
          className="login-form-input" 
          placeholder="email"
          name="email"
          required
          ref={emailRef}
        />
      </div>
      <div className="login-form-input-group">
        <h6>Password</h6>
        <input 
          className="login-form-input" 
          placeholder="password"
          name="password"
          type="password"
          required
          ref={passwordRef}
        />
      </div>
      <button className="login-form-submit" onClick={handleLoginUser}>Login</button>
      <p>
        Don't have an account?
        <span className="login-form-register">Create one here.</span>
      </p>
    </form>
  )
}