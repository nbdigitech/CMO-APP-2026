import React, { useRef, useEffect, use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from 'react-redux';
import { NoLiveImg, BackArrowImg } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { getVideoLive } from '../../redux/actions/VideoAction';
import { useTranslation } from '../../hooks/useTranslation';

const { width } = Dimensions.get("window");

const YoutubeLiveScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideoLive({}))
  }, []);
  const video = useSelector(state => state.video);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackArrowImg} style={{ width: 30, height: 30,marginLeft: 10 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 15 }}>
           
            <Text style={styles.headerText}>YouTube Live</Text>
          </View>
        </View>

          <View style={{margin:20}} >
               {video?.videoLiveList?.length != 0 && video?.videoLiveList?.[0]?.link?.split("/").filter(Boolean).pop() ?
                <YoutubePlayer
                      ref={playerRef}
                height={200}
                play={false}
                videoId={video?.videoLiveList?.[0]?.link?.split("/").filter(Boolean).pop()}
              />:
                <View style={styles.placeholderPlayer}>
                  <Image source={NoLiveImg} style={styles.noLiveImage} />
                  <Text style={styles.placeholderTitle}>No YouTube Live Video Found..</Text>
                  <Text style={styles.placeholderSubtitle}>Stay Tuned</Text>
                </View>

               }
          </View>

          {/* Title */}
      </ScrollView>
    </SafeAreaView>
  );
};


export default YoutubeLiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor:'white'

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderColor: '#e0e0e0',
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },

 

  playerWrapper: {
    borderWidth: 2,
    borderColor: '#ff9900',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },

  placeholderPlayer: {
    marginTop: 100,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  noLiveImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f1f1f',
    textAlign: 'center',
    marginBottom: 8,
  },

  placeholderSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },

  title: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    lineHeight: 22,
  },

  description: {
    marginTop: 10,
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    fontWeight: '400',
  },
});
