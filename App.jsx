import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
const App = () => {
  const [spent,setSpent] = useState(0)
  const [expense,setExpense] = useState(0)
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')

  return (
    <SafeAreaView>
      <View>
        <Text>Expense Tracker</Text>
      </View>
      <View>
        <Text>Total Spent:</Text>
        <Text>{spent}</Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter expense amount"
          keyboardType="numeric"
          onChangeText={setExpense}
          value={expense}
        />
        <TextInput
          placeholder="Enter Category"
          keyboardType="text"
          onChangeText={setCategory}
          value={category}
        />
        <TextInput
          placeholder="Enter Description"
          keyboardType="text"
          onChangeText={setDescription}
          value={description}
        />
      </View>
      <View>
        <Button title='Add Expense' onPress={() => {setSpent(spent + parseInt(expense) || 0)
          setExpense(0)
          setCategory('')
          setDescription('')
        }} />
      </View>
      {spent === 0 && (
        <Text>No expenses recorded yet.</Text>
      )}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  header_style : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
})