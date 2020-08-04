import React, { useContext } from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { BookingContext } from "./BookingContext";

function PurchaseModal() {
  const {
    state: { selectedSeatID },
    actions: { resetBookingProccess }
  } = useContext(BookingContext);

  console.log(selectedSeatID);

  const handleClose = () => {
    resetBookingProccess();
  }

  return (
    <Wrapper
      open={selectedSeatID !== null}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Thank you for selecting seat ${selectedSeatID}`}
          </DialogContentText>
      </DialogContent>
    </Wrapper>
  )
}

const Wrapper = styled(Dialog)`
  background-color: transparent;
`;

export default PurchaseModal;
