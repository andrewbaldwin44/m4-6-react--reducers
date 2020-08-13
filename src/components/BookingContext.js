import React, { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  seatNumber: null,
  row: null,
  price: null,
  purchased: false,
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
    case 'start-seat-purchase':
      return {
        ...state,
        status: 'purchasing',
      }
    case 'seat-purchased':
      return {
        ...initialState,
        status: "idle",
        purchased: true,
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
    dispatch({ type: 'reset-booking-process' });
  }

  const startPurchase = () => {
    dispatch({ type: 'start-seat-purchase' });
  }

  const purchaseTicketRequest = data => {
    const ticketPurchaseData = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }


    return fetch('/api/book-seat', ticketPurchaseData)
      .then(response => response.json())
      .then(() => {
        dispatch({
          type: "seat-purchased"
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
          purchaseTicketRequest,
          startPurchase,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
