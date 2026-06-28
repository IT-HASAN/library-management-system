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
      <p><b>Title:</b> <span className="book-title">{record.item.title}</span></p>
      <p><b>Status:</b> {record.status === 'AVAILABLE' ? <span className="returned">RETURNED</span> : <span className="loaned">LOANED</span>}</p>
      <p><b>Loan Date:</b> {formatLoanDate(record.loanedDate)}</p>
      <p><b>Return By Date:</b> {formatLoanDate(record.dueDate)}</p>
      {record.returnedDate && <p><b>Date Returned:</b> {formatLoanDate(record.returnedDate)}</p>}
    </div>
  )
}