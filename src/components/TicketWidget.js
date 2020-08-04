import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { ReactComponent as SeatAvailable } from "../assets/SeatAvailable.svg";
import { SeatContext } from './SeatContext';

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded }
  } = useContext(SeatContext);

  if (hasLoaded) {
    return (
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                return (
                  <SeatWrapper key={seatId}>
                    <SeatAvailable />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  }
  else {
    return (
      <CircularProgress />
    )
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 8px;
  background: #eee;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
