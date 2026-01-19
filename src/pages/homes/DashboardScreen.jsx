import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, FlatList,
  ScrollView,
  TouchableOpacity, 
  ImageBackground,
  Linking} from 'react-native';
import RNFS from 'react-native-fs';
import YoutubePlayer from "react-native-youtube-iframe";
import Header from '../components/Header';
import BottomSlideScreen from '../components/BottomSlideScreen';
import colors from '../../constants/color';
import Toaster from '../components/Toaster';
import commonStyle from '../components/Style';
import ImageCard from '../components/ImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDistricts, getEvents } from '../../redux/actions/EventAction';
import { Banner1Img, Banner2Img, Banner3Img, FilterImg, BgImportantLink, CrossImg, BgYouTubeIcon, BackArrowImg, PlayImg } from '../assets';
import LoaderScreen from '../components/LoaderScreen';
import MasonryList from '@react-native-seoul/masonry-list';
import { openFilter } from '../../redux/reducers/filterReducer';
import ModalMessage from '../components/ModalMessage';
import WarningModal from '../components/WarningModal';
import VerticalMarquee from '../components/Marquee';
import { getStories } from '../../redux/actions/StoryAction';
import { getNotice } from '../../redux/actions/NoticeAction';
import { getPatrika } from '../../redux/actions/PatrikaAction';
import { getVideo, getVideoLive } from '../../redux/actions/VideoAction';
import { getEventCorner } from '../../redux/actions/EventCornerAction';
import WarningModalJanPatrika from '../components/WarningModelJanPatrika';
import WarningModalImportantLink from '../components/WarningModalImportantLink';


const { width, height } = Dimensions.get("window");

const images = [
  Banner1Img,
  Banner2Img,
  Banner3Img
];


const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, 
  };


  return (
    <View style={styles.sliderContainer}>
      {/* Image Slider */}
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

  
    </View>
  );
};


const DashboardScreen = () => {
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("Loading event list...");
  const [downloadLoader, setDownloadLoader] = useState(false)
  const [localWarningCheck, setLocalWarningCheck] = useState(false)
  const [visible, setVisible] = useState(false)
  const [storyImage, setStoryImage] = useState('')
  const [path, setPath] = useState("")
  const [copy, setCopy] = useState(false)
  const [title, setTitle] = useState("")
  const [activeTab, setActiveTab] = useState("Tab1");
  const [pdfUrl, setPdfUrl] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);
  const [janPatrikaWarning, setJanPatrikaWarning] = useState(false);
  const [videoId, setVideoId] = useState("");
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getStories({}))
    dispatch(getNotice({}))
    dispatch(getVideo({}))
    dispatch(getPatrika({}))
    dispatch(getVideoLive({}))
    dispatch(getEventCorner({}))
    dispatch(getEvents({with_cm:''}))
    dispatch(getDistricts({}))
  },[])

  const event = useSelector(state=>state.event)
  const notice = useSelector(state=>state.notice)
  const patrika = useSelector(state=>state.patrika)
  const eventCorner = useSelector(state=>state.eventCorner)
  const video = useSelector(state=>state.video)
  const stories = useSelector(state=>state.stories)
  const loginSuccess = useSelector(state=>state.login.loginSuccess)
  const loader = useSelector(state=>state.event.loading)
  const warningModal = useSelector(state=>state.event.downloadWarningModal)
  const messageModal = useSelector(state=>state.event.messageModal)
  // const downloadPath = useSelector(state=>state.event.downloadPath)
  
  const navigation = useNavigation();
  const renderItem = (item, index) => {
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

const downloadProcess = (key, path = "") => {
  if(key){
  setMessage("Your Image is downloading")
  setMessage2("Please Wait...")
  setDownloadLoader(true)
  }
  else{
  setMessage("")
  setMessage2("Loading event list...")
  setDownloadLoader(false)
  setModalOpen(true)
  setPath(path)
  }
}

useEffect(() => {
   if(warningModal){
    setLocalWarningCheck(true)
   }
   else{
    setLocalWarningCheck(false)
   }
},[warningModal])



  function getYouTubeVideoId(url) {
    const shortUrlMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortUrlMatch) return shortUrlMatch[1];
    const longUrlMatch = url.match(/[?&]v=([^&]+)/);
    if (longUrlMatch) return longUrlMatch[1];
  
    return null; // agar match na ho
  }


  return (
    <>
   <SafeAreaView style={styles.container}>
  <Header screen='DashboardScreen' filterHandle={filterHandle} />
  <View style={{flex:1}}>

  <ScrollView>
  <>
              {/* <View style={{ height: height / 4 }}>
                <MyCarousel />
              </View> */}
              <View style={{padding:10}}>
                <View>
                <Text style={{fontWeight:'bold', fontSize:16,  marginLeft:10, paddingBottom:10}}>Stories</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {stories.storyList?.map((value, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => {
                  setVisible(true)
                  setStoryImage(value?.image)
                  setTitle(value?.title)
                }} style={{borderWidth:1,
                    borderColor:colors.primary, marginLeft:10, width:70, height:70, borderRadius:50, padding:2}}>
                  <Image source={{uri:value?.image}} style={{width:"100%", 
                    borderRadius:50,
                    
                    height:"100%"}} />
                    
                </TouchableOpacity>
                <Text style={{fontSize:12, alignSelf:'center', paddingLeft:5}}>{value?.title?.substring(0,8)}</Text>
                </View>
            ))
          }
                
               
              </ScrollView>
              </View>
            <View>
              <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width:'50%' }}>
                  Event Corner
                </Text>
                <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
                <View style={{flexDirection:"row",}}>
               
                <TouchableOpacity style={{position:'relative'}} onPress={() => navigation.navigate('EventCornerScreen')}>
                 <Text>View All</Text>
                </TouchableOpacity>
                </View>
              </View>
                </View>


                <ScrollView horizontal style={{height:280, padding:5}}>  
                {eventCorner?.eventCornerList?.slice(0, 10).map((value, index) => (
                  <TouchableOpacity key={index} onPress={() =>navigation.navigate('EventCornerDetailsScreen', {eventCornerDetails:value})} style={{padding:10, width:width/1.2}}>
                    <Text style={{color:'black', fontWeight:'bold'}}>
                      {value?.title?.substring(0,40)} ...
                    </Text>
                    <Text style={{fontSize:11, fontWeight:'bold', color:'gray', paddingVertical:5}}>{value?.date}</Text>
                    <Image source={{uri:value?.image}} style={{width:'100%', height:210, borderRadius:20}} />
                  </TouchableOpacity>
                ))}
                </ScrollView>
            </View>

     {video?.videoLiveList?.length != 0 &&             
      <View>
      <View style={{ flexDirection: 'row', width: width, paddingTop:40, marginBottom:10 }}>
        <View style={{ width: '30%', alignItems: 'flex-end' }}>
          <Image source={BgYouTubeIcon} style={{ width: '100%', height: 20 }} />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: 'bold' }}>
            Youtube upcoming event Live!
          </Text>
        </View>
      </View>

      <View style={{padding:10, borderRadius:20}}>
      <YoutubePlayer
        ref={playerRef}
        height={200}
        play={false}
        videoId={video?.videoLiveList?.[0]?.link?.split("/").filter(Boolean).pop()} 
        
      />
      </View>
      </View>
      }
     

                  

              
              <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width:'50%' }}>
                  Photo Gallery
                </Text>
                <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
                <View style={{flexDirection:"row",}}>
               
                {/* <TouchableOpacity onPress={filterHandle}>
                  <Image source={FilterImg} style={styles.notificationImg} />
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigation.navigate('PhotoGalleryScreen')}>
                        <Text>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>

              
            </>

            <View style={{ paddingTop: 10 }}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:''}))
            setActiveTab("Tab1")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab1" && styles.activeTabText]}>All Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:'with'}))
            setActiveTab("Tab2")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab2" && styles.activeTabText]}>CM Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab3" && styles.activeTab]}
          onPress={() => {
            dispatch(getEvents({with_cm:'without'}))
            setActiveTab("Tab3")
          }}
        >
          <Text style={[styles.tabText, activeTab === "Tab3" && styles.activeTabText]}>Others</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={{ flex: 1, padding: 10 }}>
        {/* {activeTab === "Tab1" ? renderList(event?.eventList) : renderList(dataTab2)} */}
        {
          event?.eventsList?.slice(0, 10)?.map((value, index) => {
            return renderItem(value, index)
          })
        }
      </View>
    </View>

            <View>
      

      <View>
              <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width:'50%' }}>
                  Video Gallery
                </Text>
                <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
                <View style={{flexDirection:"row",}}>
               
                <TouchableOpacity style={{position:'relative'}} onPress={() => navigation.navigate('VideoGalleryScreen')}>
                 <Text>View All</Text>
                </TouchableOpacity>
                </View>
              </View>
                </View>


                <ScrollView horizontal style={{height:280, padding:5}}>  
                {
                video.videoList?.map((value, index)=> (
                  <TouchableOpacity key={index} onPress={() => {
                    const videoId = getYouTubeVideoId(value?.link);
                    setVideoId(videoId)
                    setVideoVisible(true)
                    }} style={{padding:10}}>
                    <ImageBackground source={{uri:value?.image}} style={{width:width/1.2, alignItems:'center', justifyContent:'center', height:210, borderRadius:20}} >
                        <Image source={PlayImg} style={{width:40, height:50}}  />
                    </ImageBackground>
                   <Text style={{color:'black', fontWeight:'bold', width:width/1.2, marginTop:10}}>
                      {value?.title?.substring(0,100)} 
                    </Text>
                  </TouchableOpacity>
                    ))
                }
                </ScrollView>
      </View>


    <ImageBackground source={BgImportantLink} 
    style={{flex: 1,  width: '100%', paddingVertical:50, marginVertical:20, height: 320,}} 
    imageStyle={{resizeMode: 'cover'}}
    >
      <Text style={{marginTop:-10, paddingLeft:20, color:'black', fontWeight:'bold', fontSize:16}}>Important Link</Text>
      <VerticalMarquee headlines={notice.noticeList} />
    </ImageBackground>

    <View>
          <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width:'50%' }}>
                  Janman Patrika
                </Text>
                <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
                <View style={{flexDirection:"row",}}>
               
                <TouchableOpacity style={{position:'relative'}} onPress={() => navigation.navigate('JanPatrikaScreen')}>
                 <Text>View All</Text>
                </TouchableOpacity>
                </View>
              </View>
                </View>


                <ScrollView horizontal style={{height:280, padding:10}}> 
                {patrika?.patrikaList?.map((value, index) =>{
                  return (
                    <TouchableOpacity 
                     onPress={
                      () => {
                        setPdfUrl(value?.pdf)
                        setJanPatrikaWarning(true)
                      }
                    }
                    
                      key={index} style={{padding:"1%", width:width/2}}>
                    <Image source={{uri:value?.image}} style={{width:'100%', height:210}} />
                    
                   <Text style={{color:'black', fontWeight:'bold', marginTop:5}}>
                      {value?.title?.substring(0,12)} ...
                    </Text>
                    <Text style={{color:'gray', fontSize:10, fontWeight:'bold', marginTop:5, marginLeft:3}}>
                      {value?.date}
                    </Text>
                  </TouchableOpacity>
                  )
                })}
                 

                </ScrollView>
      </View>
  </View>
  </ScrollView>
  <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={{...styles.closeArea, position:'absolute', top:20, left:10}} onPress={() => setVisible(false)} >
              <Image source={BackArrowImg} style={{width:30, height:30}} />
            </TouchableOpacity>
          <Image source={{ uri: storyImage }} style={styles.fullImage} resizeMode="contain" />
          <Text style={{color:'black', position:'absolute', bottom:10, left:10, fontWeight:'bold'}}>{title}</Text>
        </View>
      </Modal>
  </View>

    {/* {
        event?.eventsList?.length == 0 &&
        <View style={commonStyle.notAvailableText}>
          <Text>Event not available</Text>
        </View>
      } */}


  <Modal visible={image !== null} onRequestClose={() => setImage(null)}>
    <TouchableOpacity style={styles.modalContainer} onPress={() => setImage(null)}>
      <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
    </TouchableOpacity>
  </Modal>

  <Modal style={{justifyContent:'center', backgroundColor:'green'}} visible={videoVisible} onRequestClose={() => setVideoVisible(false)}>
  <TouchableOpacity style={{...styles.closeArea, position:'absolute', top:20, left:10}} onPress={() => setVideoVisible(false)} >
        <Image source={BackArrowImg} style={{width:30, height:30}} />
      </TouchableOpacity>
      <View style={{justifyContent:'center', flex:1}}>
      <YoutubePlayer
      ref={playerRef}
      height={200}
      play={true}
      videoId={videoId}  />
      </View>
      
  </Modal>


  
</SafeAreaView>
   {copy && <Toaster type={'success'} message={'Copied'} />}
   {loginSuccess && <Toaster type={'success'} message={'LoggedIn Successfully'} />}
   <BottomSlideScreen />
   {(loader || downloadLoader) && <LoaderScreen backgroundColor="rgba(255, 255, 255, 0.8)" message={message} message2={message2} />}
   {modalOpen && <ModalMessage closeModal={() => {
    setPath("")
    setModalOpen(false)
   }} message={path} /> }
   {localWarningCheck &&<WarningModal /> }
   {janPatrikaWarning &&<WarningModalJanPatrika pdfUrl={pdfUrl} closeJanPatrikaModal={() => setJanPatrikaWarning(false)} /> }
   
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  
  imagesSection: {
    flexDirection: "row",
    // paddingHorizontal: '2%',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
  },
  imageContainer: {
    width: width,  // Full width of the device
    height: 200,   // Height for image
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Inactive dots color
  },
  activeDot: {
    backgroundColor: 'white', // Active dot color
  },
  paginationText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  heading:{
    paddingHorizontal:15,
    paddingTop:20,
    flexDirection:'row'
    },
  notificationImg:{
    width:25,
    height:25,
    marginLeft:10,
    position:'absolute',
    right:0,
    top:-8
    },
    closeArea: {
      position: "absolute",
      top: 40,
      right: 5,
      zIndex: 10,
      backgroundColor: "#fff",
      padding: 0,
      borderRadius: 20,
      
    },

    tabRow: {
      flexDirection: "row",
      width:width,
      // backgroundColor:'blue'
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

export default DashboardScreen;
