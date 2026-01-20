import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { Banner1Img } from '../assets';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, searchEvent } from '../../redux/actions/EventAction';
import { openFilter } from '../../redux/reducers/filterReducer';
import { useTranslation } from '../../hooks/useTranslation';




const JanPatrikaDetailsScreen = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // const [text, setText] = useState('')
  const [janPatrikaDetails, setJanPatrikaDetails] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(props?.route?.params?.janPatrika)
    setJanPatrikaDetails(props?.route?.params?.janPatrika)
    // dispatch(getEvents({}))  
  },[])



  return (
    <SafeAreaView style={styles.container}>
      <Header screen='Jan Patrika' />
       <View style={{flex:1, padding:10}}>
        <Image source={{uri:janPatrikaDetails.image}} style={{width:'100%', height:500, borderRadius:20}} />

        <Text>
            
        </Text>
       </View>
      
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

export default JanPatrikaDetailsScreen;

