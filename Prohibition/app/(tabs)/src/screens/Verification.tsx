import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Code from '../components/Code';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Verification = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
               <Ionicons name="chevron-back-sharp" size={24} color="black" />
        </TouchableOpacity>
     
        <TouchableOpacity>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image source={require('../images/2.png')} style={styles.img} />

      {/* code component */}

      <Code/>

    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  img: {
    width: '80%', 
    height: height * 0.4, 
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.05, 
  },
});
