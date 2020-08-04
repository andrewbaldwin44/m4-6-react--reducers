import React, { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatID: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'begin-booking-process':
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatID: action.seat,
        price: action.price,
      };
    case 'reset-booking-process':
      return initialState;
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = seatInformation => {
    dispatch({
      type: "begin-booking-process",
      ...seatInformation,
    });
  };

  const resetBookingProccess = () => {
    dispatch({ type: 'reset-booking-process' })
  }

  return (
    <BookingContext.Provider
      value ={{
        state,
        actions: {
          beginBookingProcess,
          resetBookingProccess
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
