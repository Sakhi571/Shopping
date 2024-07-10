import { useNavigation } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

const Code = () => {
  const [otp, setOtp] = useState('');
  const otpInput = useRef(null);

  //Global OTP variable
  const globalOTPVariable= '4708';

  //Navigation variable
  const naviagtion = useNavigation();

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleVerify = () => {
     if (otp === globalOTPVariable) {
      naviagtion.navigate('new')
      alert('OTP Verified!');
     }
   else {
    alert('Please enter valid OTP')
   }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <OTPTextView
        containerStyle={styles.otpContainer}
        handleTextChange={handleOtpChange}
        textInputStyle={styles.otpInput}
        inputCount={4}
        keyboardType="numeric"
        ref={otpInput}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Code;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
