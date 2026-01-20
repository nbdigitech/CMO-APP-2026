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
import ImageCard from '../components/ImageCard';
import { useTranslation } from '../../hooks/useTranslation';






const PhotoGalleryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [copy, setCopy] = useState(false)
  const [activeTab, setActiveTab] = useState("Tab1");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getEvents({with_cm:''}))
  },[])

  const event = useSelector(state=>state.event)


  const renderItem = ({item, index}) => {
    const customHeight = 150;
    return (
    <View key={index} style={{width:'100%',
      justifyContent:"space-around", alignItems:'center'}}>
      <ImageCard item={item} setCopy={() => {
        setCopy(true)
        setTimeout(() => {
          setCopy(false)
        }, 3000);
      }
        } customHeight={customHeight} 
        downloadProcess={(key, path = "") => downloadProcess(key, path)} />
    </View>
    );
  };

  const filterHandle = () => {
    dispatch(openFilter())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header screen={t.photoGallery} filterHandle={filterHandle} />

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:''}))
            setActiveTab("Tab1")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab1" && styles.activeTabText]}>{t.allEvent}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:'with'}))
            setActiveTab("Tab2")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab2" && styles.activeTabText]}>{t.cmEvents}</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab3" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:'without'}))
            setActiveTab("Tab3")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab3" && styles.activeTabText]}>{t.others}</Text>
        </TouchableOpacity>
      </View>
      
        <FlatList
        data={event?.eventsList}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
          />
        {
        event?.eventsList?.length == 0 &&
        <View style={commonStyle.notAvailableText}>
          <Text>{t.noResult || 'No result found'}</Text>
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
    },
    tabRow: {
        flexDirection: "row",
        // borderBottomWidth: 1,
        // borderColor: "#ccc",
      },
      tab: {
        // flex: 1,
        padding: 8,
        alignItems: "center",
        backgroundColor:'#e6e6e6',
        borderRadius:20,
        width:width/3.5,
        marginLeft:10
      },
      activeTab: {
        backgroundColor:colors.primary,
        borderRadius:30
      },
      tabText: {
        fontSize: 14,
        color:colors.primary,
        fontWeight:'bold'
      },
      item: {
        padding: 15,
      },
      activeTabText:{
        color:'white',
        fontWeight:'bold'
      }
});

export default PhotoGalleryScreen;
