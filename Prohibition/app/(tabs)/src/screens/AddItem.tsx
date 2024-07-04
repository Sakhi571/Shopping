import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Toast from 'react-native-simple-toast';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, removeCard } from '../redux/Slice';

const { width, height } = Dimensions.get('window');

const AddItem = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [checkedId, setCheckedId] = useState(null);
    const items = useSelector(state => state.cart);
    const [total, setTotal] = useState(0); 

    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = items.reduce((sum, item) => sum + item.dollar * item.quantity, 0);
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [items]);

   

    const toggleCheckbox = (id) => {
        setCheckedId(checkedId === id ? null : id);
    };

    const incrementItemQuantity = (item) => {
        dispatch(addCard(item));
        setTotal(total + item.dollar); 
    };

    const decrementItemQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(removeCard(item));
            if(item.quantity === 1){
            setTotal(total + item.dollar);
        }
    }
        else{
            Toast.showWithGravity(
                'Are you sure to delete this item !',
                Toast.LONG,
                Toast.TOP
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.color}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-sharp" size={width * 0.06} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.text}>My basket</Text>
                    <MaterialCommunityIcons name="dots-horizontal" size={width * 0.06} color="white" />
                </View>
            </View>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.icon}>
                    <Feather name="shopping-cart" size={30} color="red" />
                </TouchableOpacity>
                <View style={styles.total}>
                    <Text style={styles.txxt}>Total: ${total}</Text>
                </View>
            </View>

            <FlatList
                data={items}
                keyExtractor={item => item.id} 
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, checkedId === item.id && styles.checked]}
                            onPress={() => toggleCheckbox(item.id)}
                        >
                            {checkedId === item.id && (
                                <View style={styles.checkmark}>
                                    <Text style={styles.checkmarkIcon}>✓</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <Image source={item.image} style={styles.img} />
                        <View style={styles.itemDetails}>
                            <Text>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.dollar}>${item.dollar}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => decrementItemQuantity(item)}>
                                <Text style={styles.quantityControl}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => incrementItemQuantity(item)}>
                                <Text style={styles.quantityControl}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
           
            />
        </View>
    );
};

export default AddItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        backgroundColor: 'pink',
        zIndex: -1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    total: {
        marginLeft: width * 0.2,
        paddingTop: height * 0.03,
    },
    txxt: {
        fontSize: 25,
    },
    checkboxContainer: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.20,
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    checkmark: {
        width: 14,
        height: 14,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        color: 'white',
        fontSize: 12,
    },
    icon: {
        marginTop: height * 0.03,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: height * 0.03,
        paddingLeft: width * 0.05,
    },
    img: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    price: {
        textDecorationLine: "line-through"
    },
    dollar: {
        color: "red",
    },
    itemDetails: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 30,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityControl: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 18,
    },
});
