import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductsOverViewScreen  from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Color';
import { Platform } from 'react-native';
import OrderScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === 'ios' ? '#ccc': '' 
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerTintColor:Platform.OS === 'android' ? Colors.primaryColor : ''
    } 

const productNavigator = createStackNavigator({
    ProductsOverview :ProductsOverViewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons 
                name={Platform.OS==='android' ? 'ios-cart' : 'md-cart' }
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions:defaultNavOptions
    }
);

const OrderNavigator = createStackNavigator({
    Orders:OrderScreen
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons 
                name={Platform.OS==='android' ? 'ios-cart' : 'md-cart' }
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
});
const AdminNavigator = createStackNavigator({
    UserProduct:UserProductScreen,
    EditProduct:EditProductScreen,
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons 
                name={Platform.OS==='ios ' ? 'md-create' : 'ios-create' }
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
});

const ShopNavigator =  createDrawerNavigator({
    Product:productNavigator,
    Order:OrderNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primaryColor
    }
});


export default createAppContainer(ShopNavigator);
