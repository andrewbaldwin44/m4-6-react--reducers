import React, { useEffect, useContext } from 'react';

import { SeatContext } from './SeatContext';
import { BookingContext } from "./BookingContext";

import GlobalStyles from './GlobalStyles';
import TicketWidget from "./TicketWidget";
import PurchaseModal from './PurchaseModal';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  const {
    state: { purchased },
    actions: { resetBookingProccess }
  } = useContext(BookingContext);

  useEffect(() => {
   fetch('/api/seat-availability')
    .then(res => res.json())
    .then(data => receiveSeatInfoFromServer(data));
  }, []);

  const handleClose = () => {
    resetBookingProccess();
  }

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />
      <Snackbar open={purchased} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success">
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default App;
