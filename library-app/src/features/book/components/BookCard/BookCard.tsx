import { useNavigate } from 'react-router-dom';
import './BookCard.css';
import type { Book } from '../../../../models/Book';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { setCurrentBook } from '../../../../redux/slices/BookSlice';
import { setDisplayLoan } from '../../../../redux/slices/ModalSlice';

interface BookCardProps {
  book: Book
}

export const BookCard:React.FC<BookCardProps> = ({book}) => {
  const user = useSelector((state:RootState) => state.authentication.loggedInUser);

  const dispatch:AppDispatch = useDispatch();

  const handleLoan = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(user?.type === 'EMPLOYEE') {
      dispatch(setCurrentBook(book));
      dispatch(setDisplayLoan(true));
    }
  }

  const navigate = useNavigate();

  const displayBook = () => {
    navigate(`/resource/${book.barcode}`);
  }

  const latestRecord = book.records && book.records.length > 0
    ? book.records.reduce((latest, current) => {
        return new Date(current.createdAt).getTime() >
          new Date(latest.createdAt).getTime()
          ? current
          : latest;
      })
    : undefined;

  const available =
    !latestRecord ||
    latestRecord.status === 'AVAILABLE';

  let buttonClass = "book-card-loan-button";

  buttonClass += available
    ? " available"
    : " unavailable";

  if (user?.type === 'EMPLOYEE') {
    buttonClass += available
      ? " checkout"
      : " checkin";
  }

  return (
    <div id="book-card" className="book-card" onClick={displayBook}>
      <img className="book-card-cover" src={book.cover} />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{book.authors.join(', ')}</h3>
        <p className="book-card-description">{book.description}</p>
      </div>
      <button className={buttonClass} onClick={handleLoan}>Status: {available ? "AVAILABLE" : "UNAVAILABLE"}</button>
    </div>
  )
}