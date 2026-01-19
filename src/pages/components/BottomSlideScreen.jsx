import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { closeFilter } from '../../redux/reducers/filterReducer';
import colors from '../../constants/color';
import commonStyle from './Style';
import {
  getDistricts,
  getEvents,
  searchEventByDistrict,
} from '../../redux/actions/EventAction';
import { RefreshImg } from '../assets';

const { height, width } = Dimensions.get('window');

export default function BottomSlideScreen(props) {
  const refRBSheet = useRef();
  const [isChecked, setChecked] = useState('');
  const isOpen = useSelector((state) => state.filter.isOpen);
  const districts = useSelector((state) => state.event?.districts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (isOpen) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeFilter());
  };

  const submitHandle = async () => {
    dispatch(closeFilter());
    setTimeout(async () => {
      await dispatch(searchEventByDistrict(isChecked));
    }, 0);
    navigation.navigate('PhotoGalleryScreen')
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setChecked(item.name)}
        style={styles.checkboxContainer}
      >
        <View
          style={[
            styles.checkbox,
            isChecked == item.name && styles.checkedBox,
          ]}
        />
        <Text style={styles.label}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: height / 1.4,
            borderTopEndRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
        onClose={handleClose}
      >
        <View style={styles.sheetContent}>
          <FlatList
            data={districts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // 2 column layout for chips
            ListHeaderComponent={
              <>
                <View style={styles.topHR} />
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.eventText}>Districts</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(getEvents({with_cm:'with'}));
                        dispatch(getDistricts({}));
                        dispatch(closeFilter());
                        setChecked('');
                      }}
                      style={styles.clearAll}
                    >
                      <Image source={RefreshImg} style={{ width: 20, height: 20 }} />
                      <Text>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            }
            ListFooterComponent={
              <View style={{ ...styles.header, ...styles.date }}>
                <TouchableOpacity
                  onPress={submitHandle}
                  disabled={isChecked == ''}
                  style={[
                    commonStyle.submitBtn,
                    {
                      backgroundColor:
                        isChecked == '' ? colors.border : colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.btnText,
                      {
                        color: isChecked == '' ? 'gray' : colors.secondary,
                      },
                    ]}
                  >
                    Proceed
                  </Text>
                </TouchableOpacity>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  topHR: {
    width: width / 3,
    height: 2,
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '50%',
  },
  headerRight: {
    width: '50%',
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 5,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10,
    borderRadius: 15,
  },
  checkedBox: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
  },
  eventText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  clearAll: {
    backgroundColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginTop: 20,
    borderTopWidth: 1,
    width: '100%',
    borderColor: colors.border,
    paddingTop: 20,
  },
});
