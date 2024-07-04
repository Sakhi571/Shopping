import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');
const Card = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@gmail\.com$/;
    return regex.test(email);
  };

  const validateName = (name) =>{
    const  regex=  /^[a-zA-Z\s]+$/;
    return regex.test(name)&& name.trim().length > 0;
  }

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-1\s]+$/;
    return regex.test(password)&& password.trim().length > 0;
  }

  const handleNext = () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!validateName(name)){
      setError('Please enter Character');
      return;
    }
    if (!validatePassword(password)){
      setError('Please enter Password');
      return ;
    }
    if (!isChecked) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setError('');
    navigation.navigate('Verify');
  };

  return (
    <View style={styles.container1}>
      <View style={styles.main}>
        <Text style={styles.txt}>Your Name</Text>
        <TextInput
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.txt}>Your Email</Text>
        <TextInput
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.txt}>Create Password</Text>
        <TextInput
          placeholder="Enter Your Password"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry
        />
      </View>
      <View style={styles.check}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={toggleCheckbox}
        >
          {isChecked && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkIcon}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I agree with terms & conditions</Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.txt1}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container1: {
    marginTop: height * 0.20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    width: 330,
    height: '100%'
  },
  main: {
    padding: 30,
  },
  input: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  inputFocused: {
    borderBottomColor: 'darkgrey',
  },
  txt: {
    color: 'grey',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    display: 'flex',
    flexDirection: 'row',
    padding: 30,
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
  checkboxText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btn: {
    padding: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    width: 120,
    marginLeft: 100,
  },
  txt1: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
