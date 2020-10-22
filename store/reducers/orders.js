import {ADD_ORDER} from '../actions/orders';
import Order from '../../models/order';

const initialState ={
    orders:[]
};

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(), //generates the unique id  of the timestamp to the order
                action.orderData.items,
                action.orderData.amount,
                new Date()

            );
           return{
               ...state,
               orders:state.orders.concat(newOrder)
           };

    };
    return state;
};