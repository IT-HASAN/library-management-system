import type { JSX } from 'react';
import { LoginForm } from '../../features/authentication/components/LoginForm/LoginForm';
import type { User } from '../../models/User';

interface HomePageProps {
  displayLogin: boolean,
  updateLoggedInUser(user:User):void
}

export default function HomePage(props:HomePageProps):JSX.Element {
  return (
    <div className="page">
      Home page
      {props.displayLogin ? <LoginForm updateLoggedInUser={props.updateLoggedInUser}/> : <></>}
    </div>
  )
}