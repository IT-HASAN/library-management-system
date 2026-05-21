import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import { fetchBookByBarcode } from '../../redux/slices/BookSlice';
import { BookOverview } from '../../features/book';

export default function ResourcePage() {
  const dispatch:AppDispatch = useDispatch();

  const bookState = useSelector((state:RootState) => state.book);

  const { barcode } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (barcode) {
      dispatch(fetchBookByBarcode(barcode));
    }
  }, [dispatch, barcode]);

  useEffect(() => {
    if (!bookState.loadingBookBarcode && bookState.bookBarcodeError) {
      navigate("/catalog");
    }
  }, [bookState.loadingBookBarcode, bookState.bookBarcodeError, navigate]);

  return (
    <>
    {
      bookState.loadingBookBarcode || !bookState.currentBook ? (
        <div className="staging-screen">
          <h2>Loading resource...</h2>
        </div>
      ) : (
      <div className="page">
        <div className="page-container">
          <BookOverview />
        </div>
      </div>
      )
    }
    </>
  )
}
