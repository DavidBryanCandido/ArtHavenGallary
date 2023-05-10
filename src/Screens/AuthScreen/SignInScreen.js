import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import Header from '../../Components/Header'
import { colors, title, parameters } from '../../Global/styles'
import Input from '../../Components/Input'
import PasswordTextInput from '../../Components/PasswordTextInput'
import SignInAlternative from '../../Components/SignInAlternative'
// import BottomNavigator from '../../Navigation/BottomNavigator'
// import { Formik } from 'formik';
// import * as Yup from 'yup';

const SignInScreen = ({navigation}) => {
    //const [password, setPassword] = useState('');
    const onMenuPress = () => {
        navigation.goBack()
    }
    // const handleSubmit = () =>{
    //     navigation.navigate('HomeScreen')
    // }
    return (
        <SafeAreaView style={{ ...styles.container, }}>

            <Header 
                // back={'chevron-back-outline'}
                title={'MY ACCOUNT'}
                menuOrBack={'arrow-left'}
                onMenuPress={onMenuPress}
                //post={'duplicate-outline'}                
                //logo={require('../../../assets/ArtHaven_logo.png')}
                //menu={'menu-outline'}
            />
            <View style={{ marginLeft:16, marginVertical:16, width:'90%', }}>
                <Text style={title}>Sign In</Text>
            </View>             
            <View>                
                        <Input 
                            placeholder={'Email'}
                            //onChangeText={props.handleChange('username')}
                            //value={props.values.username}
                        />
                        <PasswordTextInput 
                            placeholder={'Password'}
                            //onChangeText={props.handleChange('password')}
                            //value={props.values.password}
                        />
                        <View style={{ ...styles.btnStyle, }}>
                            <TouchableOpacity  
                                style={parameters.styledButton} 
                                //onPress={() => {props.handleSubmit}}
                                onPress={() =>{navigation.navigate('DrawerNavigation')}}
                                activeOpacity={.7}
                            >
                                <Text style={parameters.buttonTitle2}>
                                    SIGN IN
                                </Text>
                            </TouchableOpacity>
                        </View> 
                        
                        
            </View>                        

            <TouchableOpacity activeOpacity={.7}>
                    <Text style={{ ...styles.forgotpass }}>
                        Forgot Password?
                    </Text>                
                </TouchableOpacity>
            <View 
                style={{ ...styles.orCon }}>
                <View style={{ ...styles.leftline }}></View>
                <Text style={{ ...styles.or}}>Or</Text>
                <View style={{ ...styles.rightline }}></View>
            </View>
            <View 
                style={{ 
                    width:'100%', 
                    justifyContent:'center',   
                    alignItems:'center', 
                }}>
                <SignInAlternative 
                    name={'facebook'}
                    title={'Sign In with Facebook'}
                    bg={backgroundColor = colors.fbBlue}
                    //onPress={navigation.navigate('BottomNavigator')}
                />
                <SignInAlternative 
                    name={'google'}
                    title={'Sign In with Google'}
                    bg={backgroundColor = colors.google}
                />
            </View>
            <View 
                style={{ 
                    flexDirection:'row', 
                    justifyContent:'center', 
                    alignItems:'center',
                    paddingVertical:20,
                    width:'100%',
                }} 
            >
                <TouchableOpacity 
                    activeOpacity={.7}  
                    onPress={() => {navigation.navigate('RegisterScreen')}}
                >            
                <Text 
                    style={{ 
                        color:colors.text2, 
                        fontSize:15, 
                        marginRight:5,
                    }}
                > New on ArtHaven <Text 
                        style={{ 
                            color:colors.buttons2, 
                            fontSize:15, 
                            textDecorationLine:'underline',
                        }}
                    >
                        Create account
                    </Text>                    
                </Text>


                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgLight,
        alignItems:'center',
        // justifyContent:'flex-start',
    },
    btnStyle:{
        justifyContent:'center', 
        alignItems:'center', 
        width:320,
        marginHorizontal:20,
    },
    forgotpass:{
        textAlign:'center', 
        color:colors.text2, 
        textDecorationLine:'underline', 
        fontSize:15, 
    },
    orCon:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',
        marginVertical:16,  
        marginHorizontal:20,
    },
    leftline:{
        height:1, 
        width:'40%',
        backgroundColor:colors.ipBG2,
    },
    or:{
        marginLeft:10, 
        marginRight:10, 
        color:'#FFFFFF', 
        textAlign:'center',
    },
    rightline:{
        height:1, 
        width:'40%', 
        backgroundColor:colors.ipBG2,
    },
})