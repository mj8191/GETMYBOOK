import { StyleSheet, Text, View ,TextInput,TouchableOpacity,SafeAreaView,ScrollView } from 'react-native'
import {React, useState,useRef,useContext} from 'react'
import {ActivityIndicator} from 'react-native';
import { UserContext } from '../../../UserContext';

import axios from 'axios';


const Register = ({navigation,route}) => {
  const[Loading,setloading] = useState(false);
  const[isvalidNumber,setIsValidNumber] = useState(false);
  const [contactInputMessage,setContactInputMessage] = useState("Enter a valid contact number")
  const [pinInputMessage, setPinInputMessage] = useState('')
  const [isServiceAvailable,setIsServiceAvailable] = useState(false);

  const [password1,setPassword1] = useState('');
  const [contact,setContact] = useState('');
  const [password2,setPassword2] = useState('');
  const [firstName,setFirstName] = useState('');
  const [pin,setPin] = useState('');
  const [lastName,setLastName] = useState('');
  const [line1,setLine1] = useState('');
  const [line2,setLine2] = useState('');
  const [passwordMessage,setPasswordMessage] = useState('');
  const [isPasswordMached,setIsPasswordMached] = useState(false);
  const { email} = route.params;
  const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;
  const ref1 = useRef([]);
  const register = async () => {
    setloading(true);
    const url = `https://getmybook-6.onrender.com/auth/register`
		try {
			const response = await axios.post(url,
        {
                     "line1":line1,
                     "line2":line2,
                     "dist":"Begusarai",
                     "state":"Bihar",
                     "pin":pin,
                     "contact":contact,
                    
          "userName":email,
          "password":password2,
          "firstName":firstName,
          "lastName":lastName
        }
        );
      const data = await response.data;
        _storeUser(data);
        setStateUser(data);
        setPassword1('');
        setPassword2('');
			navigation.navigate('Home');
      
      setloading(false);
      console.log("user  "+ data.userName);
		} catch (error) {
      setloading(false);
			console.error('Error fetching otp:', error);
		}
	};

  const _storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(
        'user',
        user,
      );
    } catch (error) {
      // Error saving data
    }
  };
    

  const onChangePassword1 =(text)=>{
    setPassword1(text);
    if(password2!=text){
      setPasswordMessage("Confirm password")
      setIsPasswordMached(false);
    } else{
      setPasswordMessage('');
      setIsPasswordMached(true);
    }

  }
  const onChangePassword2 =(text)=>{
    setPassword2(text);
    if(password1==text){
      setPasswordMessage('');
      setIsPasswordMached(true);
      ref1[0].focus();
      
    } else {
      setPasswordMessage('Confirm password')
      setIsPasswordMached(false);
      
    }
    
  }
  const onChangeTextLine1 =(text)=>{
    setLine1(text);
    
  }
  const onChangeTextLine2 =(text)=>{
    setLine2(text);
    
  }
  const onChangeFirstName =(text)=>{
    setFirstName(text);

  }
  const onChangeLastName =(text) =>{
    setLastName(text);

  }
  function isValidFormat(text){
    const _isValid = /^[6789]\d{9}$/;
    
    setIsValidNumber(_isValid.test(text));

  }
  const onChangeContact =(text) =>{
    
    setContact(text);
    isValidFormat(text);
    console.log(isvalidNumber, contact)
  }

  const onChangePin = (text)=>{
    if(text.length==6 && text!=851112){
      setPinInputMessage("Service is not available in your area")
      setIsServiceAvailable(false);

    } else
    if(text==851112){
      setPin(text);
      setIsServiceAvailable(true);
      setPinInputMessage('');

    } else {
      setPin('');
      setIsServiceAvailable(false);
      setPinInputMessage('');
    }
    
  }

  
  return (
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' }} showsVerticalScrollIndicator={false}>
    {Loading?(<ActivityIndicator size="large" />):(<>
    <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        value={email}
        selectionColor="#fff"
        editable={false}
        
        />
         {!isvalidNumber?(<Text style={styles.validText}>{contactInputMessage}</Text>):""}
        <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Contact Number"
        placeholderTextColor = "#000"
        autoFocus={true}
        selectionColor="#fff"
        keyboardType='phone-pad'
        maxLength={10}
        
        onChangeText={(text)=>onChangeContact(text)}
        
        />


        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password"
        secureTextEntry={false}
        onChangeText={(text)=>onChangePassword1(text)}
        keyboardType="default"
        placeholderTextColor="#000"
        
        
        />
        {passwordMessage!=''?(<Text style={styles.passwordText}>{passwordMessage}</Text>):''}
        <TextInput style={styles.inputBox}
        
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Confirm Password"
        secureTextEntry={true}
        keyboardType="default"
        onChangeText={(text)=>onChangePassword2(text)}
        placeholderTextColor="#000"
        
         />
         
         <TextInput style={styles.inputBox} 
          ref={el => ref1[0] = el}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="First Name"
        placeholderTextColor = "#000"
        selectionColor="#fff"
        keyboardType="default"
        onChangeText={(text)=>onChangeFirstName(text)}
        multiline={false}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="LastName"
        placeholderTextColor = "#000"
        selectionColor="#fff"
        keyboardType="default"
        onChangeText={(text)=>onChangeLastName(text)}
        multiline={false}
        onSubmitEditing={()=> this.password.focus()}
        />
        {pinInputMessage!=''?(<Text style={styles.passwordText}>{pinInputMessage}</Text>):""}
        <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Enter PIN"
        placeholderTextColor = "#000"
        onChangeText={(text)=>onChangePin(text)}
        keyboardType='phone-pad'
        selectionColor="#fff"
        maxLength={6}
        
        />
        
        {isServiceAvailable?(<><TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Address line 1"
        placeholderTextColor = "#000"
        selectionColor="#fff"
        keyboardType="default"
        onChangeText={(text)=>onChangeTextLine1(text)}
        multiline={false}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Address line 2"
        placeholderTextColor = "#000"
        selectionColor="#fff"
        keyboardType="default"
        onChangeText={(text)=>onChangeTextLine2(text)}
        multiline={false}
        onSubmitEditing={()=> this.password.focus()}
        />
       

        
         
         <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        value="Begusarai"
        selectionColor="#fff"
        editable={false}
        
        />
         <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        value="Bihar"
        selectionColor="#fff"
        editable={false}
        
        /></>):""}
       
   <TouchableOpacity disabled={firstName!=''&& lastName!=''&&isPasswordMached?false:true} onPress={()=>register()} style={styles.buttonRegister}>
          <Text style={firstName!=''&& lastName!=''&&isPasswordMached?styles.buttonTextGreen:styles.buttonText} >Register</Text>
        </TouchableOpacity>
        
        </>)}
        </ScrollView> 
    </View>
     
  )
}

export default Register

const styles = StyleSheet.create({
container : {
  backgroundColor:'#455a64',
  flex: 6,
  alignItems:'center',
  justifyContent :'center',
  padding:58
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
},
pinInputBox: {
  width:100,
  backgroundColor:'rgba(255, 255,255,0.2)',
  borderRadius: 25,
  paddingHorizontal:16,
  fontSize:16,
  color:'#ffffff',
  marginVertical: 10,
  marginLeft:55,
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
validText:{
  color:'red'

 },
 pinCheck:{
  color:'red'

 },
 passwordText:{
  color:'red'

 },
 scrollView:{
  
  backgroundColor:'#455a64'
 },
 buttonRegister: {
  width:100,
  backgroundColor:'#1c313a',
   borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 13,
    alignItems:'center',
  justifyContent :'center'
   
}

})