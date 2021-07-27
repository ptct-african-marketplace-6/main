import axiosWithAuth from "../helpers/axiosWithAuth";

export const API_START = "API_START";
export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "EDIT_ITEM";

export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";

export const fetchItems = () => (dispatch) => {

  dispatch({ type: API_START });
  axiosWithAuth().get("items")
    .then(res => {
      console.log(res);
      dispatch({ type: API_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: API_ERROR, payload: err })
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