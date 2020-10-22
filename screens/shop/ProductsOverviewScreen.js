import  React from 'react';
import {Text,View,StyleSheet,FlatList, Platform,Button} from 'react-native'
import {useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Color';


const ProductsOverviewScreen = props =>{

    const selectItemHandler = (id,title)=>{
        props.navigation.navigate('ProductDetail',{
            productId:id,
            productTitle:title
    })}
    
    //takes all the products to the products 
    const products = useSelector(state => state.products.availableProducts);
    
    const dispatch = useDispatch(); 
    return(
            <FlatList 
                data={products}
                keyExtractor={(item)=>item.id}
               // renderItem={itemData=><Text>{itemData.item.title}</Text>}
                renderItem={itemData=>(
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{
                       selectItemHandler(itemData.item.id,itemData.item.title);
                    }}
                   
                >
                <Button
                    color={Colors.primaryColor}
                    title="View Details"
                    onPress={()=>{
                        selectItemHandler(itemData.item.id,itemData.item.title);
                    }}
                />
                <Button
                    color={Colors.primaryColor}
                    title="To Cart"
                    onPress={()=>{
                        dispatch(cartActions.addToCart(itemData.item));
                    }}
                />
                </ProductItem>)}
            />
        
    );
}

ProductsOverviewScreen.navigationOptions = navData =>{
    return{
        headerTitle:'All Products',
        
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
        headerRight:(<HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item 
                title='Cart'
                iconName={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                onPress={()=>{
                    navData.navigation.navigate('Cart')
                }}
            />
        </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});
export default ProductsOverviewScreen;