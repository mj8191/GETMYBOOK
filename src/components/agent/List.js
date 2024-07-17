import {ActivityIndicator,StyleSheet, Text, View ,ScrollView,TouchableOpacity} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import { UserContext } from '../../../UserContext';
import axios from 'axios';


const List = ({navigation,route}) => {
  const [uploading, setUploading] = useState(false);
    const [list,setList]= useState([]);;
    const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;

    useEffect(()=>{
      setUploading(true);
    
        const getOrders = async ()=>{
           if(stateUser!=null){
           const orders = await fetchOrders(stateUser.userName);
         const sortedOrders =  orders?.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
           setList(sortedOrders)
           }
    
        }
        getOrders();
        setUploading(false);
    
      },[])


      const fetchOrders = async (query) => {
        const url = `https://getmybook-6.onrender.com/order/getAllByAgentId?agentId=${query}`
            try {
                const response = await axios.get(url,{ headers: {
            Authorization: "Bearer " + stateUser.token
         }});
          const data = await response.data;
          
          console.log("data"+ stateUser.token);
          return data;
            } catch (error) {
        
                console.error('Error fetching books:', error);
            }
        };

        const getDetail = async (item) => {
          setUploading(true);
          const url = `https://getmybook-6.onrender.com/auth/getOderUserDetail?sellerName=${item.sellerId}&buyerName=${item.buyerId}`
          try {
            const response = await axios.get(url,{ headers: {
              Authorization: "Bearer " + stateUser.token
           }});
            const data = await response.data;
            console.log("data2" +data.seller.firstName)
            navigation.navigate('ItemDetail',{
              id:item.id,
              orderStatus:item.status,
              sellerFirstName:data.seller.firstName,
              sellerLastName:data.seller.lastName,
              sellerContact:data.seller.contact,
              sellerLine1:data.seller.address.line1,
              sellerLine2:data.seller.address.line2,
              sellerDist:data.seller.address.dist,
              sellerState:data.seller.address.state,
              sellerPin:data.seller.address.pin,

              buyerFirstName:data.buyer.firstName,
              buyerLastName:data.buyer.lastName,
              buyerContact:data.buyer.contact,
              buyerLine1:data.buyer.address.line1,
              buyerLine2:data.buyer.address.line2,
              buyerDist:data.buyer.address.dist,
              buyerState:data.buyer.address.state,
              buyerPin:data.buyer.address.pin,

              token:stateUser.token})
            setUploading(false);
            
          } catch (error) {
            setUploading(false);
            console.error('Error getOderUserDetail:', error);
          }
        }; 
     


  return (
    <View style={styles.container}>{uploading?(<ActivityIndicator size="large" />):(<>{list && list.length?(<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' , backgroundColor:'#E7E3EC'}} showsVerticalScrollIndicator={false}>
    {list.map((item)=><TouchableOpacity key={item.id} style={styles.textStyle} onPress={()=>getDetail(item)}><Text>OrderId : {item.id}</Text></TouchableOpacity>)}
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
  textStyle:{
    width:200,
    backgroundColor:'#fff',
    marginVertical:15,
    padding:5,
    alignItems:'center',
    justifyContent :'center',
  }
})