import axios from "axios";

export const FETCH_ITEMS = "FETCH_ITEMS";
export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "EDIT_ITEM";

export const FETCH_ITEMS_OK = "FETCH_ITEMS_OK";
export const FETCH_ITEMS_ERROR = "FETCH_ITEMS_ERROR";

export const fetchItems = () => (dispatch) => {

  dispatch({ type: FETCH_ITEMS });
  axios.get("https://sauti-market-bw.herokuapp.com/api/items")
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_ITEMS_OK, payload: res.data })
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_ITEMS_ERROR, payload: err })
    })
}

export const addItem = () => {
  return({type: ADD_ITEM});
}

export const editItem = (id) => {
  return ({type: EDIT_ITEM, payload: id});
}

export const deleteItem = (id) => {
  return ({type: DELETE_ITEM, payload: id})
}