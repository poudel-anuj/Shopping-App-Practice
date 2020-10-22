import React from 'react';
import {Text,View,StyleSheet,FlatList,Platform} from 'react-native'
import {useSelector} from 'react-redux';
import {HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen =()=>{
    const orders =  useSelector(state=> state.orders.orders);
    return(
        <View>
            <FlatList 
                data={orders}
                keyExtractor={(item)=>item.id}
               // renderItem={itemData=><Text>{itemData.item.totalAmount}</Text>}
               renderItem={itemData=>(
               <OrderItem 

                   amount={itemData.item.totalAmount}
                   date={itemData.item.readableDate} //from model
                   items={itemData.item.items} //from order model items and totalAmount
                   
               />
               )}
            />
        </View>
    );
};

OrdersScreen.navigationOptions = navData =>{
    return{
    headerLeft:(<HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item 
            title='Cart'
            iconName={Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
            onPress={()=>{
                navData.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>
    ),
    };
}

const styles = StyleSheet.create({

});
export default OrdersScreen;