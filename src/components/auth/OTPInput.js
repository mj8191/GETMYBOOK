import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState ,useRef} from 'react'

const OTPInput = ({inputCount,handleTextChange}) => {
    const [focusedInput, setFocusedInput] = useState();
    const [codes, setCodes] = useState(Array(4).fill(""));
    

     

  const inputs = useRef([]);;

  


  function getOtpText(inputCount,inputCL,text){
    let m = text.match(new RegExp('.{1'+inputCL +'}','g')) || []
   return  m.slice(0,inputCount);

    


  }

  

  function onInputFocusEvent(i){
    
    const prev = i-1;
    if(prev> -1 && ! otp[prev]){
      inputs[prev].focus();
      return;
    }
  }
    

   


  

  const [otp,seOtp] = useState(

    getOtpText(
      {inputCount},1,'')
  )

  function isValidFormat(text){
    const _isValid = /^[0-9a-zA-Z]+$/;
    return text.match(_isValid);

  }

  function onChangeText(text,i){
    if(!text && isValidFormat(text)){
      return;
    }
    let temp = [...otp];
    temp[i] = text;
    seOtp(temp);

    if(text.length===1 && i !==3){
      inputs[i+1].focus();
    }
   setFocusedInput(i);
   handleTextChange( temp.join(''));
}

  function onKeyPress(e,i){
    const val = otp[i] || ''

    if(e.nativeEvent.key !== 'Backspace' && i !==3){
      inputs[i+1].focus();
      
      return
    }
    if(e.nativeEvent.key === 'Backspace' && i !==0){
      if(!val.length && otp[i-1].length===1){
        let temp = [...otp];
        temp[i-1] = otp[i-1]
        .split('')
        .slice(0,otp[i-1].length-1)
        .join('');

        seOtp(temp);

        handleTextChange(otp.join(''));

        inputs[i-1].focus();
        
      }


    }

    
  }


 

  return (

    
    <View style={styles.container}>
      {codes.map(( item,i) => (

        

        
        <TextInput
        ref={el => inputs[i] = el}
        key={i}
        autoCorrect={false}
        autoFocus={i==0?true:false}
        keyboardType='numeric'
        value={otp[i]||''}
        style={styles.input}
        maxLength={1}
        onFocus={()=>onInputFocusEvent(i)}
        onChangeText={(text)=>onChangeText(text,i)}
        multiline={false}
        selectionColor={'green'}
        onKeyPress={(e)=>onKeyPress(e,i)}
  
  
        />
      ))}
      
    </View>
  )
}

export default OTPInput

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf:'center',
        justifyContent :'space-between'
      },
      input: [{
        fontSize: 16,
        height: 48,
        width: 48,
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: '#455a64',
        color: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginHorizontal:5
      }],
      errorInput: {
        borderColor: '#ffffff',
        color: '#ffffff',
      },
      focusedInput: {
        borderColor: '#ffffff',
      }
})




