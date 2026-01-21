import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  LogoImg,
  NotImg,
  FilterImg,
  BackArrowImg,
  BackWImg,
  EditImg,
  LogoutImg,
  SearchImg,
  SerachDarkImg,
} from '../assets';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/color';
import * as Keychain from 'react-native-keychain';

import { getDistricts, getEvents } from '../../redux/actions/EventAction';
import { logoutUser } from '../../redux/actions/loginAction';

const Header = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);

  // 🔹 Manual Translations
  const TEXT = {
    EN: {
      dashboard: 'CMO AI Photo Gallery',
      logout: 'Logout',
    },
    HI: {
      dashboard: 'सीएमओ एआई फोटो गैलरी',
      logout: 'लॉगआउट',
    },
  };

  const handleLogout = async () => {
    try {
      props.onLogout && props.onLogout();
      await Keychain.resetGenericPassword();
      dispatch(logoutUser(false));
    } catch (error) {
      console.log('Error resetting credentials', error);
    }
  };

  const getEventHandle = () => {
    dispatch(getEvents({ with_cm: 'with' }));
    dispatch(getDistricts({}));
  };

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: props.screen === 'Profile' ? colors.primary : 'white' },
      ]}
    >
      <View style={{ ...styles.headerColumn, flexDirection: 'row', width: '100%' }}>
        {props.screen === 'DashboardScreen' ? (
          <TouchableOpacity
            onPress={getEventHandle}
            style={{ flexDirection: 'row', width: '80%' }}
          >
            <Text style={styles.dashboardText}>
              {TEXT[language].dashboard}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={props.screen === 'Profile' ? BackWImg : BackArrowImg}
                style={styles.backImg}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.searchText,
                { color: props.screen === 'Profile' ? 'white' : 'black' },
              ]}
            >
              {props.screen}
            </Text>
          </View>
        )}

        {props.screen === 'DashboardScreen' && (
          <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => props.filterHandle && props.filterHandle()}>
              <Image source={FilterImg} style={styles.notificationImg} />
            </TouchableOpacity>
          </View>
        )}

        {props.screen === 'Profile' && (
          <View style={styles.rightSection}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLogout}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {TEXT[language].logout}
              </Text>
              <Image source={LogoutImg} style={styles.EditImg} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 🔹 TAB STYLE EN–HI SWITCHER */}
      <View style={styles.langTabContainer}>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'SET_LANGUAGE', payload: 'EN' })}
          style={[styles.langTab, language === 'EN' && styles.langTabActive]}
        >
          <Text style={[styles.langTabText, language === 'EN' ? styles.langTabTextActive : styles.langTabTextInactive]}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'SET_LANGUAGE', payload: 'HI' })}
          style={[styles.langTab, language === 'HI' && styles.langTabActive]}
        >
          <Text style={[styles.langTabText, language === 'HI' ? styles.langTabTextActive : styles.langTabTextInactive]}>HI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  dashboardText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
  },

  searchText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: -1,
  },

  headerColumn: {
    width: '33%',
  },

  notificationImg: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  backImg: {
    width: 25,
    height: 25,
  },

  EditImg: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },

  rightSection: {
    width: '20%',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
  },

  // 🔹 Language Button Styles
  langTabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    right: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FF7F02',
  },
  langTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langTabActive: {
    backgroundColor: '#FF7F02',
  },
  langTabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  langTabTextActive: {
    color: '#fff',
  },
  langTabTextInactive: {
    color: '#000',
  },
});

export default Header;
