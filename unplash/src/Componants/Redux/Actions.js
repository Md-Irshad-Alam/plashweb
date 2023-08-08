// store/actions.js
export const FETCHED_DATA ="FETCHED_DATA"

export const setFetchedData = (data) => ({
    type: 'FETCHED_DATA',
    payload: data,
  });
  