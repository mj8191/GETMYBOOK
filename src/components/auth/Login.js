import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import {React,useRef, useState,useEffect,useContext} from 'react'
import {ActivityIndicator} from 'react-native';
import { UserContext } from '../../../UserContext';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  const[Loading,setloading] = useState(false);
  const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;
  const ref1 = useRef([]);
 
    
    const [valid,setValid] = useState(false)
    const [text,setText] = useState('')
    const [password, setPassword]  = useState('')
    const [inpuMessage,setInputMessage] = useState('');

 
    

  const login = async () => {
    setInputMessage('')
    setloading(true);
    const url = `https://getmybook-6.onrender.com/auth/login`
		try {
			const response = await axios.post(url,
        {
          "userName":text.toLowerCase(),
          "password":password,
         
        }
        );
        setText('');
        setPassword('');
      const data = await response.data;
      if(data.token=='Email or Password is incorrect'){
        setloading(false);
        setInputMessage(data.token);
      } else {
        _storeUser(data);
        setStateUser(data);
       
			navigation.navigate('Home');

      setloading(false);
      
      }
    
      
		} catch (error) {
      setloading(false);
      setInputMessage("SomeThing went wrong...try again");
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
      const onChangePassword = (text)=>{
        setPassword(text);
    }
    
  return (
    <View style={styles.container}>{Loading?(<ActivityIndicator size="large" />):(<View style={styles.container1}>{inpuMessage ==''?(<Text style={styles.validText}>{valid !=true?"Enter a vlid email id":""}</Text>):
    (<Text style={styles.validText}>{inpuMessage}</Text>)}
        
      
      
    <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Email"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(text)=>onChangeText(text)}
        multiline={false}
        autoFocus={true}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox}
        selectionColor="#fff"
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password"
        placeholderTextColor = "#ffffff"
        keyboardType="default"
        onChangeText={(text)=>onChangePassword(text)}
        
        
         />
        <TouchableOpacity onPress={()=>login(text)} disabled={!(valid && password!='')} style={styles.buttonValid}>
          <Text style={valid && password!=''?styles.buttonTextGreen:styles.buttonText} >Send</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={() =>
        navigation.navigate('EmailInput')
      }><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
				</View>
                </View>)}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({container : {
    backgroundColor:'#455a64',
  flex: 1,
  alignItems:'center',
  justifyContent :'center'
  },
  container1 : {
    backgroundColor:'#455a64',
  flex: 1,
  alignItems:'center',
  justifyContent :'center',
  marginTop:'80%'
  
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
  },
  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }}


)