// Import required React Native components and hooks
import { StyleSheet, Text, View, TextInput, FlatList, Alert,TouchableOpacity } from 'react-native'
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation,NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Button} from '@react-navigation/elements'



const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Expense Tracker</Text>
       <Button onPress = {() => navigation.navigate('AddExpense')}>
        Add Expense
      </Button>
    </View>
  )
}

const AddExpense = () => {
  // Adds a new expense to the history and updates filters
  const addexpense = () => {
    setSpent(spent + parseInt(expense) || 0)
    if(expense>=1){
      setHistory((history) => [...history, {Amount : expense.trim(), Category : category.trim(), Description : description.trim()}])
      setFilterVal((filterval)=> { if (!filterval.includes(category.trim())) { return [...filterval,category.trim() ]}  return filterval} )
    }
    else{
      Alert.alert("Please Enter Number only")
    }    
    setExpense(0)
    setCategory('')
    setDescription('')
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
      </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name ='Home' component = {HomeScreen}/>
      <Stack.Screen name = 'AddExpense' component = {AddExpense}/>
    </Stack.Navigator>
  )
}
const App = () => {
 
  const [spent,setSpent] = useState(0) // Stores the total amount spent
  const [expense,setExpense] = useState(0) // Stores the current expense amount entered by the user
  const [category,setCategory] = useState('') // Stores the current expense category
  const [description,setDescription] = useState('')  // Stores the current expense description
  const [history,setHistory] = useState([]) // Stores the complete expense history
  const [filterval,setFilterVal] = useState(["All"]) // Stores available categories for filtering expenses
  const [selectedfilter,setSelectedFilter] = useState("All") // Stores the currently selected category filter 
  // // Filters expenses based on the selected category
  // const filterhistory = selectedfilter === 'All' ? history : history.filter((item) => item.Category === selectedfilter) 

  // // Adds a new expense to the history and updates filters
  // const addexpense = () => {
  //   setSpent(spent + parseInt(expense) || 0)
  //   if(expense>=1){
  //     setHistory((history) => [...history, {Amount : expense.trim(), Category : category.trim(), Description : description.trim()}])
  //     setFilterVal((filterval)=> { if (!filterval.includes(category.trim())) { return [...filterval,category.trim() ]}  return filterval} )
  //   }
  //   else{
  //     Alert.alert("Please Enter Number only")
  //   }    
  //   setExpense(0)
  //   setCategory('')
  //   setDescription('')
  // }

  // // Removes an expense and updates the total and category filters
  // const removeExpense = (item) => {
  //   setHistory((history) => {
  //     const newHistory = history.filter((_, i) => i !== history.indexOf(item))

  //     if (!newHistory.some((expense) => expense.Category === item.Category)) {
  //       setFilterVal((filterval) =>filterval.filter((currval) => currval !== item.Category)
  //     )
  //     }
  //   return newHistory
  //   })
  //   setSpent(spent - parseInt(item.Amount) || 0)
  // }

  // return (
    
  //   <SafeAreaView style={styles.container}>
      

  //      {/* Display application header  */}
  //     <View>
  //       <Text style = {styles.header}>Expense Tracker</Text>
  //     </View>

  //     {/* Display total amount spent */}
  //     <View style = {styles.spentCard}>
  //       <Text style = {styles.spentLabel}>Total Spent:</Text>
  //       <Text style ={styles.spentAmount}>{spent}</Text>
  //     </View>
      
  //     {/* Display category filters  */}
  //     <View style={styles.filterContainer}>
  //       {filterval.map((item) => {

  //       const selected = selectedfilter === item

  //       return (
  //         <TouchableOpacity
  //           key={item}
  //           style={[
  //             styles.filterButton,
  //             selected && styles.selectedFilter
  //           ]}
  //           onPress={() => setSelectedFilter(item)}
  //         >
  //           <Text
  //             style={[
  //               styles.filterText,
  //               selected && styles.selectedFilterText
  //             ]}
  //           >
  //           {item}
  //           </Text>
  //         </TouchableOpacity>
  //         )
  //         })}
  //     </View>

  //     {/* Capture expense details from the user */}
  //     <View style ={styles.inputContainer}>
  //       <TextInput
  //         placeholder="Enter expense amount"
  //         keyboardType="numeric"
  //         onChangeText={setExpense}
  //         value={expense}
  //         style = {styles.input}
  //       />
  //       <TextInput
  //         placeholder="Enter Category"
  //         keyboardType="text"
  //         onChangeText={setCategory}
  //         value={category}
  //         style = {styles.input}
  //       />
  //       <TextInput
  //         placeholder="Enter Description"
  //         keyboardType="text"
  //         onChangeText={setDescription}
  //         value={description}
  //         style = {styles.input}
  //       />
  //     </View>

  //     {/* Add expense button */}
  //     <View style = {styles.addButtonContainer}>
  //       <TouchableOpacity style = {styles.addButton} onPress={addexpense} >
  //         <Text style ={styles.addButtonText}>Add Expense</Text>
  //       </TouchableOpacity> 
  //     </View>

  //     {/* Display expense history */}
  //     {history.length > 0 && (
  //       <><View>
  //         <Text style ={styles.recentTitle}>Expense History:</Text>
  //       </View>
  //       <FlatList
  //           data={filterhistory}
  //           keyExtractor={(item, index) => index.toString()}
  //           renderItem={({ item }) => (
  //             <View style ={styles.expenseItemAlign}>
  //               <View style = {styles.expenseCard}>
  //                 <View style={styles.expenseDetails}>

  //                   <Text style={styles.expenseDescription}>
  //                     {item.Description}
  //                   </Text>

  //                   <Text style={styles.expenseCategory}>
  //                     {item.Category}
  //                   </Text>
  //                 </View>
  //                 <Text style={styles.expenseAmount}>{item.Amount}</Text>
  //               </View>
  //               <View style={styles.deleteCard}>
  //                 <TouchableOpacity style = {styles.deleteButton} onPress={() => removeExpense(item)} >
  //                   <Text style ={styles.deleteIcon}>🗑️</Text>
  //                 </TouchableOpacity> 
  //               </View>
  //             </View>
  //           )} /></>
  // //     )}
  // //   </SafeAreaView>
  // )

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

  expenseCard: {
    flex: 1,
    minHeight: 76,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',

    // Small shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },


  // Description + category
  expenseDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  expenseDescription: {
    fontSize: 16,
    fontWeight: '700',
    color: '#17221E',
    marginBottom: 3,
  },

  expenseCategory: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6D7772',
  },

   expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17221E',
  },

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