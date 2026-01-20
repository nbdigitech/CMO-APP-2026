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
import { getVideo } from '../../redux/actions/VideoAction';
import { useTranslation } from '../../hooks/useTranslation';


const ListCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
        <View style={styles.right}>
                

                {/* <View style={{paddingVertical:1}}>
                  <Text style={styles.date}>{item?.date}</Text>
                </View> */}
              </View>
              <View style={styles.left}>
                  <ImageBackground 
                  imageStyle={{ borderRadius: 15 }} 
                  style={styles.eventImg}
                  source={{uri:item?.image}}
                  >
                  
                </ImageBackground>
                <Text style={{...commonStyle.title, color:'black', paddingVertical:6}}>
                {item?.title}
                {/* Aapka main issue hai ScrollView ke andar FlatList */}
                </Text>
              </View>
              
      </View>
  )
}



const VideoGalleryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getVideo({}))
  },[])

  const video = useSelector(state=>state.video)

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
      <Header screen={t.videoGallery} />
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
        data={video?.videoList}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
          />
        {
        video?.videoList?.length == 0 &&
        <View style={commonStyle.notAvailableText}>
          <Text>{t.noResult}</Text>
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
    height:200,
  },
  left:{
    width:'100%',
    marginTop:5
  },
  right:{
    width:'100%',
    // padding:10,
    justifyContent:'center'
  },
  date:{
    fontSize:12,
    color:'gray',
    fontWeight:'bold', 
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
    // padding: 15,
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
      // paddingHorizontal:'6%', 
      flexDirection:'row', 
      justifyContent:'space-between'
    }
});

export default VideoGalleryScreen;
