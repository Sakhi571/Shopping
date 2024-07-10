import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { addCard,addItem, removeCard } from '../redux/Slice';


const { width, height } = Dimensions.get('window');

const NewScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [expandItem, setexpandItem] = useState(null);

    // for accessing the length of added items
    const selectItem = useSelector(state => state.cart) ;
    console.log(selectItem);

    const add=(item)=>{
      if(selectItem.length < 5)
        {
        dispatch(addItem(item));
        Toast.showWithGravity(
          'One item has been added',
          Toast.SHORT,
          Toast.TOP,
        );
      }
      else {
        alert('You can only add up to 5 items');
      
      }
    }

  const incrementQunatity  = (item) => {
    dispatch(addCard(item));
  };

  const decrementQuantity=(item)=>{
   
    dispatch(removeCard(item));
  }


  // Function for renderItemButton
  const renderItemButtom=(item)=>{
    const items= selectItem.findIndex(cardItem => cardItem.id === item.id);
    if(items === -1 || expandItem !== item.id){
        return(
             <TouchableOpacity style={styles.addButton} onPress={()=> {add(item); setexpandItem(item.id);}}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
        );  
  }
  else{
    const updateItem= selectItem[items];
    return( 
         <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.minusButton} onPress={()=> decrementQuantity(item)} disabled={updateItem.quantity === 1} >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
           <Text style={styles.quantityText}>{updateItem.quantity}</Text>
          <TouchableOpacity style={styles.plusButton} onPress={()=> incrementQunatity(item)}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
     
    )
  }
}


  const raw = [
    { id: 1, image: require('../images/1.png'), name: 'Sneakers', price:'579', dollar: 79, quantity: 1 },
    { id: 2, image: require('../images/2.png'), name: 'Mobiles',price:'454' , dollar: 59, quantity: 1},
    { id: 3, image: require('../images/3.png'), name: 'Perfume',price:'555' , dollar: 69, quantity: 1},
    { id: 4, image: require('../images/4.png'), name: 'Glasses' ,price:'234' , dollar: 39, quantity: 1},
    { id: 5, image: require('../images/5.png'), name: 'Cosmetics' ,price:'333' , dollar: 49, quantity: 1},
    { id: 6, image: require('../images/6.png'), name: 'Electronic' ,price:'444', dollar: 89, quantity: 1},
    { id: 7, image: require('../images/1.png'), name: 'Sneakers' ,price:'222', dollar: 19, quantity: 1},
    { id: 8, image: require('../images/2.png'), name: 'Mobiles' ,price:'1111', dollar: 49, quantity: 1},
    { id: 9, image: require('../images/1.png'), name: 'Sneakers' ,price:'666', dollar: 50, quantity: 1},
    { id: 10, image: require('../images/2.png'), name: 'Shoes' ,price:'999', dollar: 59, quantity: 1},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.color}>
        <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={width * 0.06} color="white"  />
            </TouchableOpacity>
        
          <Text style={styles.text}>Categories</Text>
          <MaterialCommunityIcons name="dots-horizontal" size={width * 0.06} color="white" />
        </View>
      </View>

      <FlatList
        data={raw}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.flat} >
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.itemText}>{item.name}</Text>     
             {renderItemButtom(item)}
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default NewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.05,
  },
  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  color: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'pink',
    zIndex: -1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  flatListContent: {
    paddingHorizontal: width * 0.03,
    paddingTop: height * 0.01, 
  },
  flat: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: width * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingBottom: height * 0.02,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.3,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: width * 0.04,
    marginTop: height * 0.01,
  },
  addButton: {
    marginTop: height * 0.01,
    backgroundColor: 'blue',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: width * 0.04,
  },


  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  minusButton: {
    backgroundColor: 'red',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 5,
    marginRight: width * 0.02,
  },
  plusButton: {
    backgroundColor: 'blue',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 5,
    marginLeft: width * 0.02,
  },
  quantityText: {
    fontSize: width * 0.04,
    color: 'black',
  },
  txtt:{
    fontSize:30
  }
});
