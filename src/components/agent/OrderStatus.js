import { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'


const OrderStatus = ({id,itemStatus,token}) => {
   const [status,setStatus] = useState(itemStatus)

   const updateStatus = async (newStatus)=>{
    setStatus(newStatus);

    const url = `https://getmybook-6.onrender.com/order/updateStatus?id=${id}&status=${newStatus}`
		try {

			await axios.get(url,{ headers: {
        Authorization: "Bearer " + token
     }})
        
		} catch (error) {
      setStatus(itemStatus)
			console.error('Error fetching otp:', error);
		}
	};
    

  return (
    <View style={styles.StatusContainer}>
     <View style={{flexDirection:'row',marginLeft:40}} >
      <Text style={styles.level1}>Picked</Text>
    
      <Text style={styles.level3}>Delivered</Text>
     </View>
        <View style={{flexDirection:'row'}} >
          <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
          <View style={{flexDirection:'column'}} >
         <TouchableOpacity disabled={status!='ordered'} onPress={()=>updateStatus('picked')}>
        <TextInput
        
        editable={false}
        value={''}
        style={status=='ordered'?styles.input:styles.input2}
        />
  </TouchableOpacity >
  </View>
      <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
      <TouchableOpacity disabled={status!='picked'}onPress={()=>updateStatus('ontheway')}>
      <TextInput
        editable={false}
        value={''}
        style={status=='ordered'||status=='picked'?styles.input:styles.input2}
        />
    
    </TouchableOpacity>
    <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
    <TouchableOpacity disabled={status!='ontheway'} onPress={()=>updateStatus('delivered')}>
    <TextInput
        editable={false}
        value={''}
        style={status!='delivered'?styles.input:styles.input2}
        />
    
    </TouchableOpacity>
    <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
    </View>
    <View style={{flexDirection:'row',marginLeft:40}} >
      
      <Text style={styles.level2}>On the way</Text>
      
     </View>
    </View>
  )
}

export default OrderStatus

const styles = StyleSheet.create({
  StatusContainer:{
        marginHorizontal:50,
        flex:1,
        alignItems:'center',
  justifyContent :'center',
  marginBottom:250
    },
      input:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        color: '#ffffff',
        borderColor: 'blue',
        borderWidth: 2,
      },
      input2:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
        color: '#ffffff',
        borderColor: 'blue',
        borderWidth: 2,
      },
      level1:{
        marginRight:100,
        marginHorizontal:20,
        marginBottom:20
      },
      level2:{
        marginRight:40,
        marginTop:20
      },
      level3:{
        marginHorizontal:30,
        marginBottom:20
      }

})