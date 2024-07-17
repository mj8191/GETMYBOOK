import {ActivityIndicator,StyleSheet, Text, View ,ScrollView,TouchableOpacity} from 'react-native'
import {useEffect,useState,useContext} from 'react'
import Item from './Item';
import { UserContext } from '../../../UserContext';
import axios from 'axios';


const List = ({navigation,route}) => {
    const [uploading, setUploading] = useState(false);
  const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;
  const [list,setList]= useState([]);;


  useEffect(()=>{
    setUploading(true);
    
    const getBooks = async ()=>{
       if(stateUser!=null){
       const books = await fetchBooks();
     const sortedBooks =  books?.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
       setList(sortedBooks)
       }

    }
    getBooks();
    setUploading(false);

  },[])
  
 

  const fetchBooks = async () => {
    const url = `https://getmybook-6.onrender.com/book/getAllBook`
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
 
  return (
    <View style={styles.container}>{uploading?(<ActivityIndicator size="large" />):(<>{list && list.length?(<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' , backgroundColor:'#E7E3EC'}} showsVerticalScrollIndicator={false}>
    {list.map((item)=><Item key={item?.id} navigation={navigation} setUploading={setUploading} item = {item}/>)}
    </ScrollView>):""}
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
  }
})