import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
const App = () => {
  const [spent,setSpent] = useState(0)
  const [expense,setExpense] = useState(0)
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')
  const [history,setHistory] = useState([])
  const [filterval,setFilterVal] = useState(["All"])
  const [selectedfilter,setSelectedFilter] = useState("All")

  const filterhistory = selectedfilter === 'All' ? history : history.filter((item) => item.Category === selectedfilter)
  return (
    <SafeAreaView>
      {filterval.map((item) => (<Button title={item} onPress = {()=>setSelectedFilter(item)}>
      </Button>))}
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
          setHistory((history) => [...history, {Amount : expense, Category : category, Description : description}])
          setFilterVal((filterval)=> { if (!filterval.includes(category)) { return [...filterval,category ]}  return filterval} )
          setExpense(0)
          setCategory('')
          setDescription('')
        }} />
      </View>
      {spent === 0 && (
        <Text>No expenses recorded yet.</Text>
      )}
      {history.length > 0 && (
        <><View>
          <Text>Expense History:</Text>
        </View><FlatList
            data={filterhistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>Amount: {item.Amount}</Text>
                <Text>Category: {item.Category}</Text>
                <Text>Description: {item.Description}</Text>
                <Button title='Delete' onPress={() => {
                  setHistory((history) => history.filter((_, i) => i !== history.indexOf(item)))
                  setSpent(spent - parseInt(item.Amount) || 0)
                }} />
              </View>
            )} /></>
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