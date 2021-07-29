import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, API_START, API_SUCCESS } from "../actions/itemActions"

const initialState = {
  items: [],
  isLoading: false,
  error: ''
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_START:
      return {  
        ...state,
        isLoading: true
      }
    case API_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      }

    // case ADD_ITEM:
    //   const newItem = {
    //     item_name: action.payload.item_name,
    //     location: action.payload.location,
    //     quantity: action.payload.quantity,
    //     price: action.payload.price,
    //     description: action.payload.description,
    //     user_id: action.payload.user_id
    //   }
    //   return {
    //     ...state,
    //     items: [...state.items, newItem]
    //   }
    // case EDIT_ITEM:
    //   const editItem = {
    //     item_name: action.payload.item_name,
    //     location: action.payload.location,
    //     quantity: action.payload.quantity,
    //     price: action.payload.price,
    //     description: action.payload.description,
    //   }
    //   return {
    //             ...state.item,
    //     items: [...state.items, editItem]
    //   }
    case DELETE_ITEM:
      return {
        items: state.items.filter(item => (action.payload.id !== item.id))
      }
    default:
      return state;  
  }
}

export default itemReducer;