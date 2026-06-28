import React from 'react';
import './BookSubjects.css';

interface BookSubjectProps {
  subjects: string[]
}

export const BookSubjects:React.FC<BookSubjectProps> = ({subjects}) => {
  return (
    <div className="book-subjects">
      <h2>Book Subjects:</h2>
      <div className="book-info-subjects-box">
        {
          subjects.map((subject, index) => {
            if (index !== subjects.length -1) {
              return <p className="book-info-subject" key={subject}>{subject},</p>
            } else {
              return <p className="book-info-subject" key={subject}>{subject}</p>
            }
          })
        }
      </div>
    </div>
  )
}