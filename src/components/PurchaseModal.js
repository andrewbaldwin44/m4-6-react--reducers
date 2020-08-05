import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { BookingContext } from "./BookingContext";

function PurchaseModal() {
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");

  const {
    state: { seatNumber, row, price },
    actions: { resetBookingProccess, purchaseTicketRequest }
  } = useContext(BookingContext);

  const handleClose = () => {
    resetBookingProccess();
  }

  const updateCreditCard = event => {
    setCreditCard(event.target.value);
  }

  const updateExpiration = event => {
    setExpiration(event.target.value);
  }

  const handleFormSubmit = event => {
    // seatId, creditCard, expiration
    event.preventDefault();
    purchaseTicketRequest({ seatNumber, creditCard, expiration });
  }

  return (
    <Dialog
      open={seatNumber !== null}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
      <DialogContent>
        <SubTitle>
          You're purchasing <Bold>1</Bold> ticket for the price of ${price}
        </SubTitle>
        <Grid>
          <span className='header'>Row</span>
          <span className='header'>Seat</span>
          <span className='header'>Price</span>
          <span>{row}</span>
          <span>{seatNumber}</span>
          <span>{price}</span>
        </Grid>
      </DialogContent>
      <FormSection>
        <Bold>
          Enter payment details
        </Bold>
        <Form onSubmit={handleFormSubmit}>
          <TextField
            label="Credit card"
            variant="outlined"
            onInput={updateCreditCard}
            required
          />
          <SmallField
            label="Expiration"
            variant="outlined"
            onInput={updateExpiration}
            required
          />
          <SubmitButton onClick={handleClose} variant="contained" color="primary" type="submit">
            Purchase
          </SubmitButton>
        </Form>
      </FormSection>
    </Dialog>
  )
}

const SubTitle = styled.span`
  color: black;

`;

const Bold = styled.span`
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  padding: 50px 20px;
  grid-row-gap: 20px;

  .header {
    font-weight: bold;
  }

  span {
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
    padding-left: 10px;
  }
`;

const FormSection = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #eeeeee;
  height: 150px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 460px;
`;

const SmallField = styled(TextField)`
  width: 100px;
`;

const SubmitButton = styled(Button)`
  height: 100%;
`;

export default PurchaseModal;
