import { FETCH_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_ITEMS_OK, FETCH_ITEMS_ERROR } from "../actions/index"

const initialState = {
  items: [],
  isLoading: true,
  error: ''
}

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        const newItem = {
          item_name: action.payload.item_name,
          location: ,
          quantity: ,
          price: ,
          description: ,
          user_id: 
        }
      }
  }

}