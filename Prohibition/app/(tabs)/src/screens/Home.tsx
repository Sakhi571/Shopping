import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';

const { width, height } = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.color}>
          <View style={styles.top}>
            <Ionicons name="chevron-back-sharp" size={width * 0.06} color="white" />
            <Text style={styles.text}>Account Details</Text>
            <MaterialCommunityIcons name="dots-horizontal" size={width * 0.06} color="white" />
          </View>
        </View>
      </View>

      {/* Card component */}
      <Card />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  main: {
    height: height * 0.7,
  },
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: 'pink',
    zIndex: -1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
