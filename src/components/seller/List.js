import { Alert,Modal,ActivityIndicator,StyleSheet, Text,SafeAreaView,Image,TextInput, View ,ScrollView,TouchableOpacity} from 'react-native'
import {useEffect,useState,useContext,useRef} from 'react'
import Item from './Item';
import {firebase} from '../../../Config'
import * as ImagePicker from "expo-image-picker"; 
import { UserContext } from '../../../UserContext';
import axios from 'axios';


const List = ({navigation,route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [_image, set_Image] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [uploading, setUploading] = useState(false);
    const ref1 = useRef([]);
  const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;
  const [list,setList]= useState([]);;


  useEffect(()=>{
    
    const getBooks = async ()=>{
       if(stateUser!=null){
       const books = await fetchBooks(stateUser.userName);
     const sortedBooks =  books?.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
       setList(sortedBooks)
       }

    }
    getBooks();

  },[])
  
 

  const fetchBooks = async (query) => {
    const url = `https://getmybook-6.onrender.com/book/getAllBySellerId?sellerId=${query}`
		try {
			const response = await axios.get(url,{ headers: {
        Authorization: "Bearer " + stateUser.token
     }});
      const data = await response.data;
      
      console.log("data"+ data);
      return data;
		} catch (error) {
    
			console.error('Error fetching books:', error);
		}
	};
 

  const addBook = async (ImageUrl) => {
    const url = `https://getmybook-6.onrender.com/book/save`
    try {
      const response = await axios.post(url,
       
        {           
          "sellerId":stateUser.userName,
          "image":ImageUrl,
          "bookName":name,
          "author":author,
          "rentPrice":price
        },
        { headers: {
          Authorization: "Bearer " + stateUser.token
         }}
        );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error listing book:', error);
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        
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
  setList([data,...list]);
  setUploading(false);
  set_Image('');
  setModalVisible(!modalVisible);
  
  
  
} 

const onCancel = ()=>{
  set_Image('');
  setModalVisible(!modalVisible);

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
    <View style={styles.container}>{uploading?(<ActivityIndicator size="large" />):(<>{list && list.length?(<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' , backgroundColor:'#E7E3EC'}} showsVerticalScrollIndicator={false}>
    {list.map((item)=><Item key={item?.id} item = {item}/>)}
    </ScrollView>):""}
      
     
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <SafeAreaView style={styles.modelContainer}>
          
          {_image =='' ? (<TouchableOpacity style={styles.modelButtonPick} onPress={pickImage}>
           <Text style={styles.modelButtonText}>Pick Image</Text>
           </TouchableOpacity>):(<View>
           {_image && <Image source={{uri: _image.uri}} style={styles.modelImage}/>} 
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
           <Text style={_image!=''&&name!=''&& price!=''&&author!=''?styles.modelButtonTextGreen:styles.modelButtonText}>List</Text>
           </TouchableOpacity>


           <TouchableOpacity style={styles.modelButtonUpload} onPress={() => onCancel()}>
           <Text style={styles.modelButtonText}>cancel</Text>
           </TouchableOpacity>
     
         </SafeAreaView>

        
            
          </View>
          
        </View>
        
            
      </Modal>
  
            <TouchableOpacity onPress={() => onCancel()}  style={styles.buttonValid}>
          <Text style={styles.buttonTextGreen}>+</Text>
        </TouchableOpacity>
      </>)}
    </View>
    
  )
}

export default List

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#E7E3EC',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    paddingTop:8
  },
  buttonValid: {
    width:60,
    backgroundColor:'black',
     borderRadius: 300,
      marginVertical: 20,
      
      alignItems:'center',
    justifyContent :'center'
  },
  buttonTextGreen: {
    fontSize:40,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
  },
  modelContainer: {
    height:500,
    backgroundColor:'#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
 modelImage: {
  width: 120,
  height: 180,
  borderRadius: 8,
  margin: '1%'
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
      marginVertical: 5,
      paddingVertical:5,
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalView: {
  
    backgroundColor: '#E7E3EC',
    borderRadius: 20,
  
    alignItems: 'center',
    shadowColor: '#E7E3EC',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})