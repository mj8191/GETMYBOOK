import React, { useState, useRef,useEffect } from "react"; 
import {SafeAreaView, View,TextInput, Text, Image, TouchableOpacity,  
    StyleSheet, Alert } from "react-native"; 
import {firebase} from '../../../Config'
import * as ImagePicker from "expo-image-picker"; 
import * as FileSystem from 'expo-file-system'
import axios from 'axios';

const ImagePickerScreen = ({navigation,route}) => {
    const [_image, set_Image] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [uploading, setUploading] = useState(false);
    const  [URL, setUrl] = useState('');
    const ref1 = useRef([]);
    const { email} = route.params;



    const addBook = async (book) => {
      const url = `http://192.168.108.143:8084/book/save`
      try {
        const response = await axios.post(url,
          {           
            "sellerId":email,
            "image":book,
            "bookName":name,
            "author":author,
            "rentPrice":price
          }
          );
        const data = await response.data;
        return data;
      } catch (error) {
        console.error('Error listing book:', error);
      }
    };
  
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
      });
      const source = {uri: result.assets[0].uri}
      console.log(source);
      set_Image(source);
      ref1[0].focus();
  }; 
  const downloadUrl = async () =>{
    const filename = _image.uri.substring(_image.uri.lastIndexOf('/')+1);
    const url = firebase.storage().ref(filename);
    
     const temp = await url.getDownloadURL();
     return temp;
     
    }

  

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(_image.uri);
    const blob = await response.blob();
    const filename = _image.uri.substring(_image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    const url = firebase.storage().ref(filename);
    
    console.log(url)
    try {
        await ref;
    } catch (e){
        console.log(e)
    }
  
    const  r =  await downloadUrl();
    console.log("r " + r)
    const data = await addBook(r);
    console.log("data " +data)
    setUploading(false);
    set_Image('');
    navigation.navigate('List',{email:email,data:data});
    
    
} 

const onChangeName = (text)=>{
  setName(text);

}

const onChangeAuthor = (text)=>{
  setAuthor(text);
}

const onChangePrice = (text)=>{
  setPrice(text);
}
         
      
        return (
          <SafeAreaView style={styles.modelContainer}>
          
           {_image =='' ? (<TouchableOpacity style={styles.modelButtonPick} onPress={pickImage}>
            <Text style={styles.modelButtonText}>Your book Image</Text>
            </TouchableOpacity>):(<View>
            {_image && <Image source={{uri: _image.uri}} style={{width: 300, height: 300}}/>} 
            </View>)} 
       <TextInput style={styles.modelInputBox} 
       ref={el => ref1[0] = el}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Name"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(text)=>onChangeName(text)}
        multiline={false}
       
        />
        <TextInput style={styles.modelInputBox} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Author"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(text)=>onChangeAuthor(text)}
        multiline={false}
       
        />
        <TextInput style={styles.modelInputBox1} 
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Price per week"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="number"
        onChangeText={(text)=>onChangePrice(text)}
        multiline={false}
       
        />

            <TouchableOpacity disabled={!(_image!=''&&name!=''&& price!=''&&author!='')} style={styles.modelButtonUpload} onPress={uploadImage}>
            <Text style={_image!=''&&name!=''&& price!=''&&author!=''?styles.modelButtonTextGreen:styles.modelButtonText}>Upload</Text>
            </TouchableOpacity>
      
          </SafeAreaView>
        );
      }


export default ImagePickerScreen

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    backgroundColor:'#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
 modelImage: {
    width: 200,
    height: 200,
  },

  modelButtonPick: {
    width:200,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 20,
      paddingVertical: 13,
      alignItems:'center',
    justifyContent :'center',
  },
  modelButtonUpload: {
    width:100,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 50,
      paddingVertical: 13,
      alignItems:'center',
    justifyContent :'center',
  },
 modelButtonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  modelButtonTextGreen: {
    fontSize:16,
    fontWeight:'500',
    color:'green',
    textAlign:'center'
  },
  modelInputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  modelInputBox1: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
  
    
    marginVertical: 10
  }
});