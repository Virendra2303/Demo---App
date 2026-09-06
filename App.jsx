import { StyleSheet, Text, View, Image, Button } from 'react-native'
import {useState} from 'react'
import { CreateAccount } from './Function/CreateAccount'
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  if(!isSignedIn && !isSignedUp) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Create Account" onPress={() => setIsSignedUp(true)} />
        <Button title="Sign In" onPress={() => setIsSignedIn(true)} />
      </View>
    )
  } else if(isSignedUp) {
     return (
      <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Back" onPress={() => setIsSignedUp(false)} />
        <CreateAccount/>
      </View> 
     )
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Back" onPress={() => setIsSignedIn(false)} />
        <Text style={{fontSize: 90, fontWeight: 'bold', color: 'blue'}}>You Already Have an Account</Text>
      </View>
    )
  }
 
}

export default App

const styles = StyleSheet.create({
  

})