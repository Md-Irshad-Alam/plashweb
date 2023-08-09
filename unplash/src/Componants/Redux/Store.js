// store.js

import { createStore } from 'redux';

// Initial state for your reducer
const initialState = {
  fetchedData: [],
};

// Reducer function to handle state changes
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_DATA':
      return {
         ...state, 
         fetchedData: action.payload
      };
    case 'LOAD_MORE':
      return {
        ...state,
        fetchedData: action.payload
      };
    case 'RESET_DATA':
      return {
        ...state,
        fetchedData: initialState.fetchedData
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
