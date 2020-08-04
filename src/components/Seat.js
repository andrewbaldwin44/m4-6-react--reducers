import React, { useContext } from 'react';
import styled from 'styled-components';

import { getSeatNum } from '../helpers';
import SeatAvailable from '../assets/SeatAvailable.svg';
import { SeatContext } from './SeatContext';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

function Seat({ rowName, seatIndex }) {
  const {
    state: { bookedSeats }
  } = useContext(SeatContext);

  const seatNumber = getSeatNum(seatIndex)
  const isBooked = bookedSeats[seatNumber];
  const seatNum = getSeatNum(seatIndex);
  const seatID = `${rowName}-${seatNumber}`;

  const toolTipContent = isBooked
    ? 'Unavailable'
    : `Row ${rowName}, Seat ${seatNum} - $185`;

  return (
    <Tippy content={toolTipContent}>
      <SeatSelect>
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
