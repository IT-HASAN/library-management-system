import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/ReduxStore';
import { LoginRegisterModal } from '../../features/authentication';

export default function HomePage():JSX.Element {

  const displayLogin = useSelector((state:RootState) => state.modal.displayLogin);

  return (
    <div className="page">
      Home page
      {displayLogin ? <LoginRegisterModal /> : <></>}
    </div>
  )
}