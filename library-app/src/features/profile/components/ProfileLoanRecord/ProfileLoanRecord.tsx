import React from 'react';
import './ProfileLoanRecord.css';
import type { LoanRecordPopulated } from '../../../../models/LoanRecord';

interface ProfileLoanRecordProps {
  record: LoanRecordPopulated;
}

function formatLoanDate(date: string): string {
  return new Date(date)
    .toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    .replace(',', '');
}

export const ProfileLoanRecord:React.FC<ProfileLoanRecordProps> = ({record}) => {
  return (
    <div className="profile-record">
      <h4>Title: {record.item.title}</h4>
      <h4>Status: {record.status === 'AVAILABLE' ? 'RETURNED' : 'LOANED'}</h4>
      <p>Loan Date: {formatLoanDate(record.loanedDate)}</p>
      <p>Return by Date: {formatLoanDate(record.dueDate)}</p>
      {record.returnedDate && <p>Date Returned: {formatLoanDate(record.returnedDate)}</p>}
    </div>
  )
}