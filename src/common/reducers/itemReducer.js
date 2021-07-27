import { FETCH_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_ITEMS_OK } from "../actions/itemActions"

const initialState = {
  items: [],
  isLoading: false,
  error: ''
}

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ITEMS_OK:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      }
    case ADD_ITEM:
      const newItem = {
        item_name: action.payload.item_name,
        location: action.payload.location,
        quantity: action.payload.quantity,
        price: action.payload.price,
        description: action.payload.description,
        user_id: action.payload.user_id
      }
      return {
        ...state,
        items: [...state.items, newItem]
      }
    case EDIT_ITEM:
      // const editItem = {
      //   item_name: action.payload.item_name,
      //   location: action.payload.location,
      //   quantity: action.payload.quantity,
      //   price: action.payload.price,
      //   description: action.payload.description,
      // }
      return {
        
        // This code may need more work ... this is just a templated version to begin with
        ...state.item,
        item_name: action.payload.item_name,
        location: action.payload.location,
        quantity: action.payload.quantity,
        price: action.payload.price,
        description: action.payload.description
        
        // items: [...state.items, editItem]
      }
    case DELETE_ITEM:
      return {
        items: state.items.filter(item => (action.payload !== item.id))
      }
    default:
      return state;  
  }

}