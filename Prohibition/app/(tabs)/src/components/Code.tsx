import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const GLOBAL_OTP = '4708';

const Code = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

  
    if (text && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const checkOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === GLOBAL_OTP) {
      Toast.showWithGravity('OTP Verified!', Toast.LONG, Toast.TOP);
      navigation.navigate('new');
    } else {
      Toast.showWithGravity('Incorrect OTP. Please try again.', Toast.LONG, Toast.TOP);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Verification Code</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(input) => (otpInputs.current[index] = input)}
          />
        ))}
      </View>
      <View style={styles.message}>
        <Text style={styles.txt1}>Check the SMS</Text>
        <Text style={styles.txt1}>message to get verification code</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={checkOtp}>
        <Text style={styles.txtBtn}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Code;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  txt: {
    fontSize: 20,
    marginBottom: height * 0.02,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '20%',
    height: height * 0.07,
    textAlign: 'center',
    fontSize: 18,
  },
  txt1: {
    alignSelf: 'center',
  },
  message: {
    marginTop: height * 0.02,
  },
  btn: {
    marginTop: height * 0.07,
    backgroundColor: 'red',
    width: width * 0.3,
    height: height * 0.06,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    color: 'white',
    fontSize: 16,
  },
});
