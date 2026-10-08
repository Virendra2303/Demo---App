import {StyleSheet,View,Text} from 'react-native'


export const ExpenseCard = ({item}) => {

    return (
        <View style = {styles.expenseCard}>
            <View style={styles.expenseDetails}>

                <Text style={styles.expenseDescription}>
                {item.Description}
                </Text>

                <Text style={styles.expenseCategory}>
                {item.Category}
                </Text>
            </View>
        <Text style={styles.expenseAmount}>{item.Amount}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   

   // ---------------- EXPENSE CARD ----------------


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

  
})