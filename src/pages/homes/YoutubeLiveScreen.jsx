import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useDispatch, useSelector } from 'react-redux';
import { NoLiveImg, BackArrowImg } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { getVideoLive } from '../../redux/actions/VideoAction';

const YoutubeLiveScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const { liveNow, pastLives, loading } = useSelector(
    state => state.video
  );

  useEffect(() => {
    dispatch(getVideoLive());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackArrowImg} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>YouTube Live</Text>
        </View>

        {/* 🔴 CURRENT LIVE */}
        <View style={styles.section}>
          {liveNow?.length > 0 ? (
            <YoutubePlayer
              ref={playerRef}
              height={220}
              play={false}
              videoId={liveNow[0]?.id?.videoId}
            />
          ) : (
            <View style={styles.placeholderPlayer}>
              <Image source={NoLiveImg} style={styles.noLiveImage} />
              <Text style={styles.placeholderTitle}>
                No Live Video Right Now
              </Text>
              <Text style={styles.placeholderSubtitle}>
                Showing past live videos
              </Text>
            </View>
          )}
        </View>

        {/* ⏺️ PAST LIVE VIDEOS */}
        <View style={styles.section}>
          {pastLives?.map((item, index) => (
            <View key={index} style={styles.pastItem}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId={item?.id?.videoId}
              />
              <Text style={styles.videoTitle}>
                {item?.snippet?.title}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default YoutubeLiveScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  backIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },

  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },

  placeholderPlayer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noLiveImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },

  placeholderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  placeholderSubtitle: {
    fontSize: 13,
    color: '#777',
  },

  pastItem: {
    marginBottom: 25,
  },

  videoTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
