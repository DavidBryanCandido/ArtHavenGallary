import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import React, {useState, useRef} from 'react'
import { colors, title, parameters } from '../../Global/styles'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import PasswordTextInput from '../../Components/PasswordTextInput'
import SignInAlternative from '../../Components/SignInAlternative'


const RegisterScreen = ({navigation}) => {
    const confirmRef = useRef(null); 

    const onMenuPress = () => {
        navigation.goBack()

    }

    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={{ ...styles.container, }}>
            <Header 
                menuOrBack={'arrow-left'}
                title={'MY ACCOUNT'}
                onMenuPress={onMenuPress}
                //post={'duplicate-outline'}                
                //logo={require('../../../assets/ArtHaven_logo.png')}
                //menu={'menu-outline'}
            />
            <View style={{ marginLeft:16, marginVertical:16, width:'90%',}}>
                <Text style={title}>Sign Up</Text>
            </View>
            <View>
                <View style={{ width:320, flexDirection:'row', }}>
                    <Input 
                        placeholder={'Name'}
                        width={'48%'}
                    />
                    <Input 
                        placeholder={'Family Name'}
                        width={'46%'}
                    />                
                </View>   
             
                <Input 
                    placeholder={'Email'}
                />
                <PasswordTextInput 
                    placeholder={'Password'}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder={'Confirm Password'}
                        placeholderTextColor= {colors.text2}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        style={styles.input}
                        ref={confirmRef}
                    />                
                </View>


                <View style={{ ...styles.btnStyle, }}>
                    <TouchableOpacity  
                        style={parameters.styledButton} 
                        //onPress={() => {navigation.navigate('SignInScreen')}}
                        activeOpacity={.7}
                        onPress={() => {
                            if (password === confirmPassword) {
                              navigation.navigate('SignInScreen');
                            } else {
                              alert('Passwords do not match.');
                              confirmRef.current.clear(); // clear the confirm password input
                            } 
                          }}
                    >
                        <Text style={{ ...parameters.buttonTitle2, textTransform:'capitalize', }}>
                            CREATE MY ACCOUNT
                        </Text>
                    </TouchableOpacity>
                </View> 
                <View style={{ width:'100%', alignSelf:'center', }}>
                    <Text style={{flexDirection: 'row', alignItems: 'center', width: 280, textAlign:'center', alignSelf:'center',}}>
                        <Text style={styles.termandconditions}>By creating or logging into an account you are agreeing with our</Text>
                        <Text style={styles.textStyle}> Terms &amp; Conditions </Text>                        
                        <Text style={styles.termandconditions}>and</Text>
                        <Text style={styles.textStyle}> Privacy Statement </Text>
                    </Text>   
                </View>
                
            </View>
            <View 
                style={{ ...styles.orCon }}>
                <View style={{ ...styles.leftline }}></View>
                <Text style={{ ...styles.or}}>Or</Text>
                <View style={{ ...styles.rightline }}></View>
            </View>

            <View 
                style={{ 
                    // flexDirection:'row', 
                    justifyContent:'center', 
                    alignItems:'center',
                    paddingVertical:20,
                    width:'100%',
                    
                }} 
            >
                <TouchableOpacity 
                    activeOpacity={.7} 
                    onPress={() => {navigation.navigate('SignInScreen')}}
                    style={{ flexDirection:'row', width:300,  justifyContent:'center', }}
                >            
                    <Text 
                        style={{ 
                            color:colors.text2, 
                            fontSize:15, 
                            marginRight:5,
                            textAlign:'center',
                        }}
                    >
                        Already have an account with ArtHaven ? <Text 
                        style={{ 
                            color:colors.buttons2, 
                            fontSize:15, 
                            textDecorationLine:'underline',
                        }}
                    >Sign In
                    </Text>
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgLight,
        alignItems:'center',
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
    termandconditions: {
        textAlign:'center',
        fontSize: 15,
        marginTop:0,
        color:colors.text1,
    },
    textStyle: {
        fontSize: 15,
        color: colors.buttons2,
    },
    inputContainer: { 
        backgroundColor: colors.ipBG2,
        marginTop:20,
        marginHorizontal:20,
        borderRadius:5,
        height:40,
        paddingHorizontal:16,
        color:colors.buttons,
        width:320,

        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',

    },
    input: {
        flex: 1,
        padding: 0,
        color:colors.buttons,
        fontSize:16,
        paddingLeft:0,
        paddingHorizontal:16,
    },
})