import React from 'react';
import {Text,View,StyleSheet,Image,Button} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import {useSelector,useDispatch } from 'react-redux'
import Colors from '../../constants/Color';
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props =>{
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
         state.products.availableProducts.find(prod=>prod.id===productId));
    
    const dispatch = useDispatch();    

    return(
        // <View>
        //    <Text>{selectedProduct.title}</Text>
        // </View>
        <ScrollView>
            <Image 
                style={styles.image}
                source = {{uri:selectedProduct.imageUrl}}
            />
            <View style={styles.actions}
>
                <Button 
                    color={Colors.primaryColor}
                    title="Add to CART"
                    onPress = {()=>{
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            
            <Text  style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text  style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle:navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image:{
        height:200,
        width:'100%'
    },
    price:{
        fontSize:20,
        color:'gray',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold',
    },
    description:{
        fontSize:16,
        textAlign:'center',
        fontFamily:'open-sans',
        marginHorizontal:20,
        fontFamily:'open-sans-bold',
    },
    actions:{
        alignItems:'center',
        marginVertical:10,
        
    }

});
export default ProductDetailScreen;