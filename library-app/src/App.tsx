import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from './redux/ReduxStore';
import HomePage from './pages/HomePage/HomePage';

function App() {

  const loggedInUser = useSelector((state:RootState) => state.authentication.loggedInUser);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser])

  return (
    <div>
      <HomePage />
    </div>
  )
}

export default App
