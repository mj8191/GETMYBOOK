import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import {React, useState,useEffect} from 'react'
import {ActivityIndicator} from 'react-native';

import {AsyncStorage} from 'react-native';
import axios from 'axios';

const EmailInput = ({navigation}) => {
  const[Loading,setloading] = useState(false);
 
    
    const [valid,setValid] = useState(false)
    const [text,setText] = useState('')
    const [inpuMessage,setInputMessage] = useState('');

    
    

  const fetchOtp = async (query) => {
    setloading(true);
    const url = `https://getmybook-6.onrender.com/auth/getOtp?email=${query}`
		try {
			const response = await axios.get(url)
      const data = await response.data;
      if(data=='Already registered, use a different email'){
        setloading(false);
        setText('');
        setValid(!valid);
        setInputMessage(data);
      } else {
        setText('');
        setValid(!valid);
			navigation.navigate('EmailVerificationScreen',{email:data});

      setloading(false);
      
      }
    
      
		} catch (error) {
      setloading(false);
			console.error('Error fetching otp:', error);
		}
	};

  

    const onChangeText=(text)=>{
setText(text)
setValid(isValidFormat(text))
if(text.length==0)(
  setText(false)
)

console.log(isValidFormat(text),text)


    }
    function isValidFormat(text){
        const _isValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
        
        return _isValid.test(text);
    
      }
    
  return (
    <View style={styles.container}>{Loading?(<ActivityIndicator size="large" />):(<>{inpuMessage ==''?(<Text style={styles.validText}>{valid !=true?"Enter a vlid email id":""}</Text>):
    (<Text style={styles.validText}>{inpuMessage}</Text>)}
        
      
      
    <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Email"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(text)=>onChangeText(text)}
        multiline={false}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TouchableOpacity onPress={()=>fetchOtp(text.toLowerCase())} disabled={!valid} style={styles.buttonValid}>
          <Text style={valid?styles.buttonTextGreen:styles.buttonText} >Send</Text>
        </TouchableOpacity>
        </>)}
    </View>
  )
}

export default EmailInput

const styles = StyleSheet.create({container : {
    backgroundColor:'#455a64',
  flex: 1,
  alignItems:'center',
  justifyContent :'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonValid: {
    width:100,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 20,
      paddingVertical: 13,
      alignItems:'center',
    justifyContent :'center'
  },
   validText:{
   color:'red'

  },
  buttonTextGreen: {
    fontSize:16,
    fontWeight:'500',
    color:'green',
    textAlign:'center'
  }


})