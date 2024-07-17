import {ActivityIndicator, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';

const Item = ({item}) => {
    const [isLoading, setLoading] = useState(true);

    function onLoadStart() {
        setLoading(true);
      }
    
      function onLoadEnd() {
        setLoading(false);
      }
  return (
    <View style={styles.container}>
       
    <TouchableOpacity style={styles.container} >
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
					
                   
                   
				
			</TouchableOpacity>
            </View>
		);
	};

export default Item

const styles = StyleSheet.create({
    container:{
        width:'100%',
    backgroundColor:'#fff',
    flexDirection: 'row',
    alignContent:'space-between',
    marginVertical:1


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
loaderStyle: {

  position:'absolute',
  left:0,
  right:0,
  bottom:0,
  top:0,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight:100
    
  }

})