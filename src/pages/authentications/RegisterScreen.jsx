import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import {useEffect} from 'react';
import commonStyle from '../components/Style';
import Footer from '../components/Footer';
import GoogleSignIn from '../components/GoogleSignIn';
import { useTranslation } from '../../hooks/useTranslation';
const RegisterScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={commonStyle.contentBox}>
                <View style={commonStyle.section}>
                <Text style={styles.title}>AI Based CMO Gallery</Text>
                <Text style={styles.subTitle}>{t.onClickDownload}</Text>
                </View>
                <GoogleSignIn />

                <View style={commonStyle.dividerContainer}>
                    <View style={{...commonStyle.hr, width:"20%"}}></View>
                    <View style={commonStyle.centerText}><Text>{t.signUpMobile || 'Or Sign Up With Mobile'}</Text></View>
                    <View style={{...commonStyle.hr, width:"20%"}}></View>
                </View>

                <View style={commonStyle.section}>
                    <TextInput placeholderTextColor="#888" placeholder={t.name} style={commonStyle.textInput} />
                </View>

                <View style={commonStyle.section}>
                    <TextInput placeholderTextColor="#888" placeholder={t.mobileNumber} style={commonStyle.textInput} />
                </View>


                <View style={commonStyle.section}>
                    <TextInput placeholderTextColor="#888"  placeholder={t.createPassword || 'Create Your Password'} style={commonStyle.textInput} />
                    <Text style={commonStyle.errorMessage}>{t.invalidPassword}</Text>
                </View>

                <View style={commonStyle.section}>
                <TouchableOpacity  style={commonStyle.submitBtn}>
                            <Text style={styles.btnText}>{t.signup}</Text>
                    </TouchableOpacity>
                </View>

                <View style={commonStyle.section}>
                <View style={styles.registerPrompt}>
                        <Text style={commonStyle.questionText}>{t.alreadyRegistered || 'Already Registered? '} </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={commonStyle.linkText}>{t.login}</Text>
                        </TouchableOpacity>
                </View>
                </View>

                <Footer/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        paddingHorizontal:10,
    },
    title:{
        color:colors.primary,
        fontWeight:"bold",
        fontSize:20,
    },
    subTitle:{
        color:colors.primary,
        fontSize:11
    },
   
    btnText:{
        color:colors.secondary,
        fontWeight:"bold"
    },
   
    googleBtnText:{

    },
    registerPrompt:{
        flexDirection:"row",
    },
})

export default RegisterScreen