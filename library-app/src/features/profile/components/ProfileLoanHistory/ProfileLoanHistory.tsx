import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileLoanHistory.css';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { ProfileLoanRecord } from '../ProfileLoanRecord/ProfileLoanRecord';
import { fetchRecordsForUser, resetLoanHistory } from '../../../../redux/slices/AuthenticationSlice';

export const ProfileLoanHistory:React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  
  const user = useSelector((state:RootState) => state.authentication.profileUser);

  const records = useSelector((state:RootState) => state.authentication.loanHistory);

  const loadingLoanHistory = useSelector(
    (state: RootState) => state.authentication.loadingLoanHistory
  );

  const loanHistoryError = useSelector(
    (state: RootState) => state.authentication.loanHistoryError
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchRecordsForUser(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    return () => {
      dispatch(resetLoanHistory());
    };
  }, [dispatch]);

  return (
    <div className="profile-loan-history">
      <h3 className="profile-loan-header">{user?.firstName}'s Item Loan History:</h3>
      {loadingLoanHistory ? (
        <h2>Loading loan history...</h2>
      ) : loanHistoryError ? (
        <h2>Failed to load loan history</h2>
      ) : (
        records.map((record) => {
          return (
            <ProfileLoanRecord key={record._id} record={record} />
          )
        })
      )}
    </div>
  )
}