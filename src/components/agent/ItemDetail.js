import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import { useState } from 'react';
import axios from 'axios';

const ItemDetail = ({navigation,route}) => {
  
  const { id,orderStatus,sellerFirstName,sellerLastName,sellerContact,sellerLine1,sellerLine2,sellerDist,sellerState,sellerPin,
    
    buyerFirstName,buyerLastName,buyerContact,buyerLine1,buyerLine2,buyerDist,buyerState,buyerPin,
    token} = route.params;
    const [status,setStatus] = useState(orderStatus)

    const updateStatus = async (newStatus)=>{
      setStatus(newStatus);
  
      const url = `https://getmybook-6.onrender.com/order/updateStatus?id=${id}&status=${newStatus}`
      try {
  
        await axios.get(url,{ headers: {
          Authorization: "Bearer " + token
       }})
          
      } catch (error) {
        setStatus(orderStatus)
        console.error('Error fetching otp:', error);
      }
    };

  const  filterString =(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  return (
    
       
    
				   <View style={styles.container}>
            
            <View  style={styles.addContainer}>
            <Text style={styles.head}>OrderId : {id}</Text>
                    <View style={styles.add1Container}>
                      <View style={{flexDirection:'row'}}>
                     
					<Text style={styles.text}>Pick up Address:</Text>
          <View style={{flexDirection:'column'}}>
          <Text> {filterString(sellerFirstName)} {filterString(sellerLastName)}, {sellerLine1},
          {sellerLine2}, {sellerDist},</Text>
          <Text> {sellerState}-{sellerPin}</Text>
          </View>
                     </View>
                     <View style={{flexDirection:'row'}}>
          <Text style={styles.text}>Contact:               </Text><Text> {sellerContact}</Text>
          </View>
                    </View>
                 <View style={styles.add2Container}>
                    <View style={{flexDirection:'row'}}>
          <Text style={styles.text}>Delivery Address:</Text> 
          <View style={{flexDirection:'column'}}>
          <Text> {filterString(buyerFirstName)} {filterString(buyerLastName)}, {buyerLine1},
          {buyerLine2}, {buyerDist},</Text>
          <Text> {buyerState}-{buyerPin}</Text>
          </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
          <Text style={styles.text}>Contact:                  </Text><Text>{buyerContact}</Text>
          </View>
                    </View>
                    


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
                    </View>
                    </View>      
             
                  
            
		);
	
  
}

export default ItemDetail

const styles = StyleSheet.create({
  container:{
   
    backgroundColor:'#E7E3EC',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    paddingTop:8


},
addContainer:{
  alignItems:'center',
  justifyContent :'center',
  margin:50,
  marginTop:200


},
add1Container:{
  
  marginTop:20



},
add2Container:{
  
 marginTop:20


},
head:{
  fontSize:20
},
text:{
  fontWeight:'600'

},
StatusContainer:{
  marginHorizontal:10,
  flex:1,
  alignItems:'center',
justifyContent :'center',
marginBottom:100
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