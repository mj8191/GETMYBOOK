import { StyleSheet, Text,View,TouchableOpacity } from 'react-native'
import {React,useState} from 'react'
import OTPInput from './OTPInput';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';



const EmailVerificationScreen = ({navigation,route}) => {
  const[Loading,setloading] = useState(false);
  const { email} = route.params;
  
const [text,setText] = useState('')
const [inpuMessage,setInputMessage] = useState('Enter OTP sent to your email');

const verifyOtp = async (query) => {
  setloading(true);
  const url = `https://getmybook-6.onrender.com/auth/verifyEmail?email=${email}&otp=${query}`
  setText('');
  console.log("email "+email +"  otp  " +query);
  try {
    const response = await axios.get(url);
    const data = await response.data;
    if(data!=true){
      setInputMessage("Email varification failed");
    } else {
    
    
     navigation.navigate('Register',{email:email});
    
    }
    setloading(false);
    
  } catch (error) {
    setloading(false);
    console.error('Error fetching otp:', error);
  }
}; 

 const _storeEmail = async (email) => {
  try {
    await AsyncStorage.setItem(
      'emailId',
      email,
    );
  } catch (error) {
    // Error saving data
  }
};
  

  
  
  return (
    <View style={styles.container}>{Loading?(<ActivityIndicator size="large" />):(<>
      <Text style={inpuMessage!="Email varification failed"?styles.labelText:styles.labelTextFail}>{inpuMessage}</Text>
      <OTPInput
              inputCount={4} 
              handleTextChange={(text)=>{setText(text)}}
              message={inpuMessage}

      />
      
      <TouchableOpacity disabled={text.length==4?false:true} onPress={()=>verifyOtp(text)} style={styles.buttonVerify}>
          <Text style={text.length==4?styles.buttonTextGreen:styles.buttonText} >Verify</Text>
        </TouchableOpacity>
        </>)}
    </View>
  )
}

export default EmailVerificationScreen

const styles = StyleSheet.create({container : {
  backgroundColor:'#455a64',
  flex: 1,
  alignItems:'center',
  justifyContent :'center'
},
  buttonVerify: {
  width:100,
  backgroundColor:'#1c313a',
   borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 13,
    alignItems:'center',
  justifyContent :'center',
},

buttonText: {
  fontSize:16,
  fontWeight:'500',
  color:'#ffffff',
  textAlign:'center'
},
buttonTextGreen: {
  fontSize:16,
  fontWeight:'500',
  color:'green',
  textAlign:'center'
},
labelText:{
  color:'#ffffff',
  marginVertical:10

 },
 labelTextFail:{
  color:'red',
  marginVertical:10

 }


})