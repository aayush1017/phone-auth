import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [displayOTPInput, setDisplayOTPInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [code, setCode] = useState('');
  const countryCode = '+91';

  const requestOTP = async () => {
    setDisplayOTPInput(true);
    const confirmation = await auth().signInWithPhoneNumber(
      countryCode + phoneNumber
    );
    setConfirmation(confirmation);
  };

  const signIn = async () => {
    try {
      await confirm.confirm(code);
      console.log('Signed In');
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign in with your phone number</Text>
      {displayOTPInput === false ? (
        <>
          <Text>Enter your phone number below to sign in</Text>
          <TextInput
            style={{ borderColor: '#878787', borderWidth: 0.5, width: '80%' }}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity onPress={() => requestOTP()}>
            <Text>Request OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Please enter OTP sent to your mobile number</Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Please enter OTP"
          />
          <TouchableOpacity onPress={() => signIn()}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDisplayOTPInput(false)}>
            <Text>Back to phone number input</Text>
          </TouchableOpacity>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
