import React, { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  seatNumber: null,
  row: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'begin-booking-process':
      return {
        ...state,
        status: 'seat-selected',
        seatNumber: action.seatNumber,
        row: action.row,
        price: action.price,
      };
    case 'reset-booking-process':
      return initialState;
    case 'seat-purchased':
      return {
        ...initialState,
        status: "idle"
      }
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

  const purchaseTicketRequest = data => {
    const ticketPurchaseData = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('/api/book-seat', ticketPurchaseData)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "seat-purchaed"
        })
      })
  }

  return (
    <BookingContext.Provider
      value ={{
        state,
        actions: {
          beginBookingProcess,
          resetBookingProccess,
          purchaseTicketRequest
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
