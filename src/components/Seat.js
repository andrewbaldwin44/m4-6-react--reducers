import React, { useContext } from 'react';
import styled from 'styled-components';

import { getSeatNum } from '../helpers';
import SeatAvailable from '../assets/SeatAvailable.svg';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

function Seat({ rowName, seatIndex }) {
  const {
    state: { seats }
  } = useContext(SeatContext);

  const {
    actions: { beginBookingProcess }
  } = useContext(BookingContext);

  const seatNumber = getSeatNum(seatIndex)
  const seatID = `${rowName}-${seatNumber}`;

  const seat = seats[seatID];
  const { price, isBooked } = seat;

  const toolTipContent = isBooked
    ? 'Unavailable'
    : `Row ${rowName}, Seat ${seatNumber} - $${price}`;

  const handleSeatSelect = event => {
    const seatInformation = {
      seat: seatNumber,
      price
    }

    beginBookingProcess(seatInformation);
  }

  return (
    <Tippy content={toolTipContent}>
      <SeatSelect
        onClick={handleSeatSelect}
        disabled={isBooked}
      >
        <SeatImage src={SeatAvailable} isBooked={isBooked} />
      </SeatSelect>
    </Tippy>
  )
}

const SeatSelect = styled.button`
  background-color: transparent;
  border: none;
`;

const SeatImage = styled.img`
  cursor: pointer;
  filter: ${props => props.isBooked ? 'grayscale(100%)': ''};
`;

export default Seat;
