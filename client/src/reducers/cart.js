import {
    PRODUCT_ADDED,
    PRODUCT_REMOVED,
    CART_CLEAR
  } from "../actions/types";
  
  const initialState =  JSON.parse(localStorage.getItem('cartStore')) || [];
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case PRODUCT_ADDED:
        let items = JSON.parse(localStorage.getItem('cartStore')) || [];
        items.push(payload);
        localStorage.setItem('cartStore', JSON.stringify(items));
        return [
          ...state,  
          payload 
        ]

      case PRODUCT_REMOVED:
      let cartStore = JSON.parse(localStorage.getItem('cartStore')) || [];
      const filteredCart = cartStore.filter((item) => item.Id !== payload.Id);
      localStorage.setItem('cartStore', JSON.stringify(filteredCart));
      return state.filter(item => item.Id !== payload.Id);

      case CART_CLEAR:
        localStorage.removeItem("cartStore");
        return [];
      default:
        return state;
    }
  }
  