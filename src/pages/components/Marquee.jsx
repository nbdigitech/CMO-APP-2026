import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import WarningModalImportantLink from './WarningModalImportantLink';

const headlines = [
  "आवश्यक सूचना:-दैनिक समाचार पत्रों के अनुबंध दर के संबंध में",
  "छत्तीसगढ़ संवाद का प्रोविजनल जी.एस.टी आई.डी. विवरण।",
  "आवश्यक सूचना:-दैनिक समाचार पत्रों के अनुबंध दर के संबंध में",
  "छत्तीसगढ़ संवाद का प्रोविजनल जी.एस.टी आई.डी. विवरण।",
  "आवश्यक सूचना:-दैनिक समाचार पत्रों के अनुबंध दर के संबंध में",
];

const {width} = Dimensions.get('window')

export default function VerticalMarquee(props) {
  const [noticeWarning, setNoticeWarning] = useState(false);
  const [noticePdfUrl, setNoticePdfUrl] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const itemHeight = 40;
    const totalHeight = headlines?.length * itemHeight;

    const animate = () => {
      translateY.setValue(0); // reset
      Animated.timing(translateY, {
        toValue: -totalHeight, // move up by full list
        duration: 20000,       // total scroll duration
        useNativeDriver: true,
      }).start(() => {
        animate(); // repeat loop
      });
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {/* ✅ List ko do baar render karenge continuous effect ke liye */}
        {[...props.headlines, ...props.headlines].map((item, index) => (
          <TouchableOpacity onPress={() => {
            setNoticeWarning(true)
            setNoticePdfUrl(item?.pdf)
          }} key={index} style={{width:'100%', flexDirection:'row', marginTop:10}}>
          <Text style={{ marginRight:5 }}>✔</Text>
          <Text style={{ width:width/1.1, textAlign:'left' }}>
            {item.title?.substring(0,100)} 
          </Text>
        </TouchableOpacity>
        ))}
      </Animated.View>

      {noticeWarning && <WarningModalImportantLink noticePdfUrl={noticePdfUrl} closeNoticeModal={() => setNoticeWarning(false)} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230, // 👈 Fixed viewport
    overflow: "hidden",
    paddingLeft:20,
    // backgroundColor: "#f2f2f2",
    padding: 10,
  },
  text: {
    fontSize: 15,
    // fontWeight: "600",
    color: "black",
    height: 40,
    textAlign: "left",
  },
});
