// Import required React Native components and hooks
import { StyleSheet, Text, View, TextInput, FlatList, Alert,TouchableOpacity } from 'react-native'
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation,NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Button} from '@react-navigation/elements'
import {ExpenseCard} from './Components/expenseCard'

const HomeScreen = ({
  spent,setSpent, history, setHistory,
  filterVal, setFilterVal, selectedFilter, setSelectedFilter,
}) => {
  
  const navigation = useNavigation()

 // Filters expenses based on the selected category
  const filterhistory = selectedFilter === 'All' ? history : history.filter((item) => item.Category === selectedFilter) 
   // Removes an expense and updates the total and category filters
  const removeExpense = (item) => {
    setHistory((history) => {
      const newHistory = history.filter((_, i) => i !== history.indexOf(item))

      if (!newHistory.some((expense) => expense.Category === item.Category)) {
        setFilterVal((filterval) =>filterval.filter((currval) => currval !== item.Category)
      )
      }
    return newHistory
    })
    setSpent(spent - parseInt(item.Amount) || 0)
  }

  return (
    <View>
      {/* Display application header  */}
      <Text style = {styles.header}>Expense Tracker</Text>

      {/* Display total amount spent */}
      <View style = {styles.spentCard}>
        <Text style = {styles.spentLabel}>Total Spent:</Text>
        <Text style ={styles.spentAmount}>{spent}</Text>
      </View>
       <Button onPress = {() => navigation.navigate('AddExpense')}>
        Add Expense
      </Button>
      
      {/* Display category filters  */}
       <View style={styles.filterContainer}>
         {filterVal.map((item) => {

         const selected = selectedFilter === item

         return (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selected && styles.selectedFilter
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                selected && styles.selectedFilterText
              ]}
            >
            {item}
            </Text>
          </TouchableOpacity>
          )
          })}
      </View>
      {history.length > 0 && (
        <><View>
          <Text style ={styles.recentTitle}>Expense History:</Text>
        </View>
        <FlatList
          data={filterhistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <View style ={styles.expenseItemAlign}>
                <ExpenseCard item={item}/>
                <View style={styles.deleteCard}>
                  <TouchableOpacity style = {styles.deleteButton} onPress={() => removeExpense(item)} >
                    <Text style ={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity> 
                </View>
              </View>
            )} /></>
       )}
    </View>
  )
}

const AddExpense = ({ spent, history, setSpent, setHistory, filterVal, setFilterVal, selectedFilter, setSelectedFilter }) => {

  const [expense,setExpense] = useState(0) // Stores the current expense amount entered by the user
  const [category,setCategory] = useState('') // Stores the current expense category
  const [description,setDescription] = useState('')  // Stores the current expense description

    const filterhistory = selectedFilter === 'All' ? history : history.filter((item) => item.Category === selectedFilter) 
  // Adds a new expense to the history and updates filters
  const addexpense = () => {
    if(expense>=1){
      setSpent(spent + parseInt(expense) || 0)
      setHistory((history) => [...history, {Amount : expense.trim(), Category : category.trim(), Description : description.trim()}])
      setFilterVal((filterVal)=> { if (!filterVal.includes(category.trim())) { return [...filterVal,category.trim() ]}  return filterVal} )
    }
    else{
      Alert.alert("Please Enter Number only")
    }    
    setExpense(0)
    setCategory('')
    setDescription('')
    Alert.alert("Expense succesfully added. Please check home page")
  }

  const removeExpense = (item) => {
    setHistory((history) => {
      const newHistory = history.filter((_, i) => i !== history.indexOf(item))

      if (!newHistory.some((expense) => expense.Category === item.Category)) {
        setFilterVal((filterVal) =>filterVal.filter((currVal) => currVal !== item.Category)
      )
      }
    return newHistory
    })

    setSpent(spent - parseInt(item.Amount) || 0)
  }

  return (
      <SafeAreaView>
        {/* Capture expense details from the user */}
        <View style ={styles.inputContainer}>
          <TextInput
            placeholder="Enter expense amount"
            keyboardType="numeric"
            onChangeText={setExpense}
            value={expense}
            style = {styles.input}
          />
          <TextInput
            placeholder="Enter Category"
            keyboardType="text"
            onChangeText={setCategory}
            value={category}
            style = {styles.input}
          />
          <TextInput
            placeholder="Enter Description"
            keyboardType="text"
            onChangeText={setDescription}
            value={description}
            style = {styles.input}
          />
        </View>

        {/* Add expense button */}
        <View style = {styles.addButtonContainer}>
          <TouchableOpacity style = {styles.addButton} onPress={addexpense} >
            <Text style ={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity> 
        </View>

        {/* Display category filters  */}
       <View style={styles.filterContainer}>
         {filterVal.map((item) => {

         const selected = selectedFilter === item

         return (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selected && styles.selectedFilter
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                selected && styles.selectedFilterText
              ]}
            >
            {item}
            </Text>
          </TouchableOpacity>
          )
          })}
      </View>

        {history.length > 0 && (
        <><View>
          <Text style ={styles.recentTitle}>Expense History:</Text>
        </View>
        <FlatList
          data={filterhistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <View style ={styles.expenseItemAlign}>
                <ExpenseCard item={item}/>
                <View style={styles.deleteCard}>
                  <TouchableOpacity style = {styles.deleteButton} onPress={() => removeExpense(item)} >
                    <Text style ={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity> 
                </View>
              </View>
            )} /></>
       )}
      </SafeAreaView>

       
  )
}

const Stack = createNativeStackNavigator()

const RootStack = () => {
  const [spent,setSpent] = useState(0) // Stores the total amount spentAmount
  const [history,setHistory] = useState([]) // Stores the complete expense history
  const [filterval,setFilterVal] = useState(["All"]) // Stores available categories for filtering expenses
  const [selectedfilter,setSelectedFilter] = useState("All") // Stores the currently selected category filter 
  return (
    <Stack.Navigator>
      <Stack.Screen name ='Home' component = {() => <HomeScreen spent={spent} setSpent={setSpent} history={history} setHistory={setHistory} filterVal={filterval} selectedFilter={selectedfilter} setSelectedFilter={setSelectedFilter} />} />
      <Stack.Screen name = 'AddExpense' component = {() => <AddExpense spent={spent} setSpent={setSpent} history={history} setHistory={setHistory} filterVal={filterval} setFilterVal={setFilterVal} selectedFilter={selectedfilter} setSelectedFilter={setSelectedFilter} />} />
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
   // Main screen
  container: {
    flex: 1,
    backgroundColor: '#F4F6F3',
    paddingHorizontal: 20,
  },

  // ---------------- HEADER ----------------

  header: {
    marginTop: 6,
    fontSize: 29,
    fontWeight: '700',
    color: '#17221E',
  },

  // ---------------- TOTAL SPENT ----------------

  spentCard: {
    marginTop: 26,
    height: 126,
    backgroundColor: '#0B6B43',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical :24,
    justifyContent: 'center',
  },

  spentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  spentAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ---------------- FILTER BUTTONS ----------------

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterButton: {
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D8DDD9',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  selectedFilter: {
    backgroundColor: '#0B6B43',
    borderColor: '#0B6B43',
  },

  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#17221E',
  },

  selectedFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
   // ---------------- EXPENSES HISTORY ----------------

  recentTitle: {
    marginTop: 26,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#17221E',
  },

   // ---------------- EXPENSE CARD ----------------

  expenseItemAlign : {
    flexDirection : 'row'
  } ,


   //---------------DELETE BUTTONS------------------------
  deleteButton: {
    marginLeft: 1,
    padding: 1,
    marginTop: 28
  },

  deleteIcon: {
    fontSize: 18,
    color : '#e61c1c' 
  },

  // ---------------- INPUT SECTION ----------------

  inputContainer: {
    marginTop: 20,
  },

  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD9',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 14,
  },

  addButtonContainer : {
     marginTop: 4,
  },

  addButton: {
    height: 50,
    backgroundColor: '#0B6B43',
    color : '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
  color: '#FFFFFF',
  fontSize: 24,
  fontWeight: '600',
},

  

})