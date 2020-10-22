import { ADD_TO_CART, REMOVE_FORM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/product';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
      
      case REMOVE_FORM_CART:
        let updatedCardItems;
        const selectedCartItem = state.items[action.pid];
        const currentQty = selectedCartItem.quantity;

        if(currentQty >1){
          const updatedCardItem = new CartItem(
            selectedCartItem.quantity-1,
            selectedCartItem.productPrice,
            selectedCartItem.productTitle,
            selectedCartItem.sum-selectedCartItem.productPrice
          );
            updatedCardItems = {...state.items,[action.pid]:updatedCardItem}
        }
        else{
          updatedCardItems = {...state.items}
          delete updatedCardItems[action.pid]
        }
        return {
          ...state,
          items:updatedCardItems,
          totalAmount:state.totalAmount - selectedCartItem.productPrice
        }

        case ADD_ORDER: //this is done to remove the list after we press the order button
          return initialState; //initial state is passed and initialState has no list at first
        
          case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal =state.items[action.pid].sum //price of the item
            delete updatedItems[action.pid]
            return{
              ...state,
              items:updatedItems,
              totalAmount:state.totalAmount-itemTotal //to reduce the price
            }
      }
  return state;
};
