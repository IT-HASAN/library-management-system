import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { loginUser, resetLoginError } from '../../../../redux/slices/AuthenticationSlice';
import './LoginForm.css';

interface LoginFormProps {
  toggleRegister():void;
}

export const LoginForm:React.FC<LoginFormProps> = ({toggleRegister}) => {
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

  useEffect(() => {
    return (() => {
      dispatch(resetLoginError());
    });
  }, [dispatch])

  return (
    <form className="login-form">
      <h2>Please Login</h2>
      {auth.loginError ? <p className="login-form-error">Username or password incorrect</p> : <></>}
      <div className="login-form-input-group">
        <label htmlFor="email">Email</label>
        <input 
          className="login-form-input"
          name="email"
          required
          ref={emailRef}
        />
      </div>
      <div className="login-form-input-group">
        <label htmlFor="password">Password</label>
        <input 
          className="login-form-input"
          name="password"
          type="password"
          required
          ref={passwordRef}
        />
      </div>
      <button type="button" className="login-form-submit" onClick={handleLoginUser}>Login</button>
      <p>
        Don't have an account?
        <span className="login-form-register" onClick={toggleRegister}>Create one here</span>
      </p>
    </form>
  )
}