import {ActivityIndicator, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import OrderStatus from './OrderStatus';
import axios from 'axios';

const Item = ({item}) => {

    const setStatus = async (query) => {
        setloading(true);
        const url = `https://getmybook-6.onrender.com/order/updateStatus?id=${item.id}&status=${query}`
        try {
          await axios.get(url);

        } catch (error) {
          console.error('Error fetching otp:', error);
        }
      };   
    
  return (
    <View style={styles.container}>
       
    <TouchableOpacity style={styles.container} >
				   <View style={{flexDirection: 'column',margin:'5%'}}>
                    <View style={styles.orderId}>
					<Text style={styles.orderId}>Order:  {item.id}</Text>
                    </View>
                    <View style={styles.sellerId}>
					<Text>Seller:  {item.sellerId}</Text>
                    </View>
                    <View style={styles.buyerId}>
                    <Text style={styles.buyerId}>Buyer:  {item.buyerId}</Text>
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
    
orderId: {
    flexDirection:'row',
    marginTop:'10%',
    fontWeight:'600',
    color:'black',
    fontSize:20
},
sellerId: {
    marginTop: 8,
    marginRight:20,
    flexDirection:'row'
},
buyerId: {
    marginTop: 8,
    flexDirection:'row',
    marginRight:20,
    fontWeight:'600',
    color:'blue'
}

})