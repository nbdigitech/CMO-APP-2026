import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { FilterImg, ViewMoreImg } from '../assets';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, searchEvent } from '../../redux/actions/EventAction';
import { openFilter } from '../../redux/reducers/filterReducer';
import { getEventCorner } from '../../redux/actions/EventCornerAction';


const ListCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('EventCornerDetailsScreen',{eventCornerDetails:item})} style={{...styles.card,}}>
        <View style={styles.right}>
                <Text style={{...commonStyle.title, color:'black', width: '90%', marginLeft:-5}}>
                {/* {item?.name?.length > 15 ? item?.name?.substring(0, 50) + '...' : item?.name} */}
                {item?.title?.substring(0,100)}...
                </Text>

                <View style={{paddingVertical:4, marginLeft:-5}}>
                  <Text style={styles.date}>{item?.date}</Text>
                </View>
              </View>
              <View style={styles.left}>
                  <ImageBackground 
                  imageStyle={{ borderRadius: 15 }} 
                  style={styles.eventImg}
                  source={{uri:item?.image}} >
                  
                </ImageBackground>
              </View>
          <View style={{backgroundColor:'#e6e6e6', width:width/1.1, height:1, marginTop:10, marginRight:10}}></View>   
      </TouchableOpacity>
  )
}



const EventCornerScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getEventCorner({}))
  },[])

  const eventCorner = useSelector(state=>state.eventCorner)

  const renderItem = ({item, index}) => {
    return (
    <ListCard item={item} />
    );
  };


  const filterHandle = () => {
    dispatch(openFilter())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header screen='Event Corner' />
        <View style={{...commonStyle.section, paddingVertical:0}}>
          {text.length > 0 && (
          <View style={styles.suggestionBox}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={()=>{
                  setText("")
                  navigation.navigate('ImageListScreen', { id: item?._id, title:item?.name })}
                }>
                  <Text style={styles.suggestion}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        </View>
        <FlatList
        data={eventCorner?.eventCornerList}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
          />
        {
        eventCorner.eventCornerList?.length == 0 &&
        <View style={commonStyle.notAvailableText}>
          <Text>No result found</Text>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    paddingTop:-10
  },
  card:{
    // flexDirection:"row",
    marginHorizontal:15,
    // marginVertical:5,
    // alignItems:'center',
    marginTop:15,
    width:'100%',
    // marginVertical:5
  },
  eventImg:{
    width:'95%',
    height:width/2,
  },
  left:{
    width:'100%',
  },
  right:{
    width:'100%',
    padding:10,
    justifyContent:'center'
  },
  date:{
    fontSize:12,
    color:'gray',
    // fontWeight:'bold', 
    alignSelf:'flex-start'
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

export default EventCornerScreen;
