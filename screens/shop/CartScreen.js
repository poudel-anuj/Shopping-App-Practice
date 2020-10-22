import React from 'react';
import {Text,View,StyleSheet, Button,FlatList} from 'react-native'
//import { FlatList } from 'react-native-gesture-handler';
import {useSelector,useDispatch } from 'react-redux';
import Colors from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders';

const CartScreen =()=>{

    const dispatch = useDispatch();

    const cartTotalAmount = useSelector(state=> state.cart.totalAmount);
    const cartItems= useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId:key, //on productoverview screen on flatlist product id
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice, 
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            });
        } 
        return transformedCartItems.sort((a,b)=> a.productId > b.productId ? 1 : -1);
    });
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                </Text>
                <Button 
                    color={Colors.primaryColor}
                    title="Order Now"
                    disabled={cartItems.length===0}
                    
                    onPress={()=>{
                        dispatch(orderActions.addOrder(cartItems,cartTotalAmount)) //to order
                    }}
                />
            </View>

            <FlatList 
                data={cartItems}
                keyExtractor={(item)=>item.productId}
                renderItem={itemData=><CartItem 
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={()=>{
                        dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }}
                />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    screen:{    
        margin:20,

    },summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
        padding:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18

    },
    amount:{
        color:Colors.accentColor
    },
});
export default CartScreen;