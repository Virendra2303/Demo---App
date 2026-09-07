import { View, Text, Button, TextInput, Alert } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import { useState } from 'react';

export const CreateAccount = () => {
    const [mobileNumber, setMobileNumber] = useState('');

    const checkMobileNumber = () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert('Invalid Number', 'Mobile number must be 10 digits');
      return;
    }

    Alert.alert('Success', 'Mobile number is valid');
    };


    return (
    <View>
        <CountryPicker
            countryCode='IN'
            withFilter
            withFlag
            withCallingCode
        />
        <TextInput placeholder='Enter Your Mobile Number' keyboardType='phone-pad'
        onChangeText={setMobileNumber}
        />
        <Button title='Receive Code' onPress={checkMobileNumber}/>
    </View>)
}