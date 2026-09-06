import { View, Text, Button, TextInput } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';

export const CreateAccount = () => {
    return (
    <View>
        <CountryPicker
            countryCode='IN'
            withFilter
            withFlag
            withCallingCode
        />
        <TextInput placeholder='Enter Your Mobile Number' keyboardType='phone-pad'/ >
        <Button title='Submit' onPress={() => alert('Account Created')}/>
    </View>)
}