import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, Share,
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { Banner1Img, Share2Img, ShareImg } from '../assets';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../hooks/useTranslation';





const EventCornerDetailsScreen = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header screen={t.eventCorner} />
       <View style={{flex:1, padding:10}}>
        <Image source={{uri:props.route.params.eventCornerDetails.image}} style={{width:'100%', height:200, borderRadius:20}} />
        <View style={{marginTop:20}}>
        <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>
            {props.route.params.eventCornerDetails.title}
        </Text>

        <Text style={{marginTop:10}}>
        {props.route.params.eventCornerDetails.desc}
        </Text>
        </View>
       </View>
     

      {/* <TouchableOpacity 
      onPress={async () => {
        try {
          await Share.share({
            message: props.route.params.eventCornerDetails.desc,
          });
        } catch (error) {
          console.log(error);
        }
      }}
      style={{backgroundColor:colors.border, padding:15, flexDirection:'row', position:'absolute', bottom:0, width:'100%'}}>
        <Text style={{color:'black', fontWeight:'bold'}}>{t.share} </Text>
        <Image source={Share2Img} style={{width:17, height:17}} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  card:{
    flexDirection:"row",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal:15,
    borderWidth:1,
    borderColor:colors.border,
    width:'91%',
    marginVertical:5
  },
  eventImg:{
    width:width/3.4,
    height:width/3.4,
  },
  left:{
    width:'35%',
  },
  right:{
    width:'65%',
    padding:10,
    justifyContent:'center'
  },
  date:{
    fontSize:12
  },
  viewMore:{
    color:'gray',
    fontSize:14,
    fontWeight:'bold'
  },
  suggestionBox: {
    width:width/1.2,
    position: 'absolute',
    top: 45,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  suggestion: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  notificationImg:{
    width:25,
    height:25,
    right:0,
    top:-8
    },
    headerSection:{
      width:'100%', 
      paddingHorizontal:'6%', 
      flexDirection:'row', 
      justifyContent:'space-between'
    }
});

export default EventCornerDetailsScreen;

