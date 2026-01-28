import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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
  const scrollViewRef = useRef(null);

  const { liveNow, pastLives, loading, nextPageToken } = useSelector(
    state => state.video
  );

  useEffect(() => {
    dispatch(getVideoLive());
  }, []);

  // Handle infinite scroll - load more videos when reaching bottom
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    // If near bottom and next page available
    if (offsetY + scrollViewHeight >= contentHeight - 500) {
      if (nextPageToken && !loading) {
        dispatch(getVideoLive({ pageToken: nextPageToken, append: true }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >

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

          {/* Loading indicator for pagination */}
          {loading && nextPageToken && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF0000" />
              <Text style={styles.loadingText}>Loading more videos...</Text>
            </View>
          )}
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

  loadingContainer: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#FF0000',
  },
});
