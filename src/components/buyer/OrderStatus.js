import { StyleSheet, Text, View,TextInput,ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useState } from 'react';
const OrderStatus = ({navigation,route}) => {
    const { order,item} = route.params;
    const [isLoading, setLoading] = useState(true);

    function onLoadStart() {
        setLoading(true);
      }
    
      function onLoadEnd() {
        setLoading(false);
      }

  return (
    <>
    <View style={styles.container2}>
       
       <View>
       <FastImage
             fallback={true}
             onLoadEnd={onLoadEnd}
             onLoadStart={onLoadStart}
             style={styles.bookImage}
             source={{
               uri: item.image,
               priority: FastImage.priority.high,
             }}
             resizeMode={FastImage.resizeMode.cover}
           />
           {isLoading && (
             <ActivityIndicator style={styles.loaderStyle} size={'large'} />
           )}
           </View>  
                      <View style={{flexDirection: 'column',margin:'5%'}}>
                       <View style={styles.bookName}>
                       <Text style={styles.bookName}>{item.bookName}</Text>
                       </View>
                       <View style={styles.bookAuthor}>
                       <Text>{item.author}</Text>
                       </View>
                       <View style={styles.bookPrice}>
                       <Text style={styles.bookPrice}>{'\u20B9'}{item.rentPrice} / week</Text>
                       </View>
                       </View>
                       
                      
                      
                   
           
               </View>
    <View style={styles.container}>
        
     <View style={{flexDirection:'row',marginLeft:40}} >
      <Text style={styles.level1}>Order Placed</Text>
    
      <Text style={styles.level3}>Delivered</Text>
     </View>
        <View style={{flexDirection:'row'}} >
          <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
          <View style={{flexDirection:'column'}} >
         
        <TextInput
        
        editable={false}
        value={''}
        style={styles.input2}
        />
  
  </View>
      <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
      
      <TextInput
        editable={false}
        value={''}
        style={order.status=='ordered'||order.status=='picked'?styles.input:styles.input2}
        />
    
    
    <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
    
    <TextInput
        editable={false}
        value={''}
        style={order.status!='delivered'?styles.input:styles.input2}
        />
    
    
    <View style={{backgroundColor: 'blue', height: 5, flex: 1, alignSelf: 'center'}} />
    </View>
    <View style={{flexDirection:'row',marginLeft:40}} >
      
      <Text style={styles.level2}>On the way</Text>
      
     </View>
    </View>
    </>
  )
}

export default OrderStatus

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
  justifyContent :'center',
  margin:20,
  marginBottom:250
    },

    
    container2:{
        margin:50,
        flex:1,
        alignItems:'center',
  justifyContent :'center',
    flexDirection: 'row',
    marginBottom:0


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
        marginHorizontal:40,
        marginBottom:20
      },
      level2:{
        marginRight:40,
        marginTop:20
      },
      level3:{
        marginHorizontal:30,
        marginBottom:20
      },
      loaderStyle: {

        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        top:0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:100
          
        },
        bookImage: {
            width: 100,
            height: 150,
            borderRadius: 8,
            marginRight:'20%',
            margin: '5%',
            marginLeft:'10%'
        },
        
        bookImageDetail: {
            width: '100%',
            height: 200,
            borderRadius: 8,
            marginBottom: 16,
        },
        bookName: {
            flexDirection:'row',
            marginTop:'10%',
            fontWeight:'600',
            color:'black',
            fontSize:20
        },
        bookAuthor: {
            marginTop: 8,
            marginRight:20,
            flexDirection:'row'
        },
        bookPrice: {
            marginTop: 8,
            flexDirection:'row',
            marginRight:20,
            fontWeight:'600',
            color:'blue'
        },

})