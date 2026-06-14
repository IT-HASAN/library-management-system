import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookHistoryItem.css';
import type { LoanRecord } from '../../../../models/LoanRecord';

interface BookHistoryItemProps {
  record: LoanRecord;
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

export const BookHistoryItem:React.FC<BookHistoryItemProps> = ({record}) => {
  const navigate = useNavigate();

  const visitProfile  = () => {
    navigate(`/profile/${record.patron}`);
  }

  return (
    <div className="book-history-item">
      <h4>Status: <span className={record.status === 'AVAILABLE' ? 'green' : 'red'}>{record.status}</span></h4>
      <div className="book-history-item-group">
        <p>
          <b>Patron:</b> <span style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline'
            }}
            onClick={visitProfile}
          >{record.patron}</span>
        </p>
        <p><b>Loan Date:</b> {formatLoanDate(record.loanedDate)}</p>
        {record.status === 'AVAILABLE' && record.returnedDate && <p><b>Return Date:</b> {formatLoanDate(record.returnedDate)}</p>}
      </div>
      <div className="book-history-item-group">
        <p><b>Loaner:</b> {record.employeeOut}</p>
        <p><b>Return By Date:</b> {formatLoanDate(record.dueDate)}</p>
        {record.status === 'AVAILABLE' && record.employeeIn && <p><b>Returner:</b> {record.employeeIn}</p>}
      </div>
    </div>
  )
}