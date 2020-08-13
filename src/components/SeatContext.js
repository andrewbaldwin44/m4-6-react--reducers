import React, { createContext, useReducer } from 'react';

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'receive-seat-info-from-server':
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    case 'mark-seat-as-purchased': {
      return {
        ...state,
        seats: action.seats,
      }
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export function SeatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = data => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  const markSeatAsPurchased = seat => {
    dispatch({
      type: "mark-seat-as-purchased",
      seats: {
        ...state.seats,
        [seat]: {
          ...state.seats[seat],
          isBooked: true,
        }
      }
    })
  }

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        }
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
