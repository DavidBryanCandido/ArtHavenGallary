import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, } from 'react-native'
import React, {useRef} from 'react'
import { colors, parameters } from '../../Global/styles'
import Swiper from 'react-native-swiper'

const SignInWelcomeScreen = ({buttonName, navigation}) => {
    const swiperRef = useRef(null);
    return (
        <View style={{ flex:1, height:'100%', backgroundColor:colors.ipBG, }}>
            <StatusBar barStyle= "light-content" backgroundColor={colors.bgLight} />
            <View style={{...styles.top,}}>
                <Text style={{ color:colors.text1, fontSize:26, textAlign:'center', }}>
                    Where Artistic Expression Finds its Home
                </Text>
                <Image 
                    source={require('../../../assets/ArtHaven_logo.png')}
                    resizeMode='contain'
                    style={styles.logo} 
                />
            </View>
            <View style={{...styles.middle}}>
                <Swiper ref={swiperRef} autoplay={true} showsPagination={false}>
                    <View style={{ ...styles.swiperImgContainer, }}>
                        <Image source={require('../../Img/PostedImage/Penguin.jpg')}/>
                    </View>
                    <View style={{ ...styles.swiperImgContainer, }}>
                        <Image source={require('../../Img/PostedImage/FrogTurtle.webp')}/>
                    </View>
                    <View style={{ ...styles.swiperImgContainer, }}>
                        <Image source={require('../../Img/PostedImage/SnakeBear.webp')}/>
                    </View>
                </Swiper>
            </View>
            <View style={{...styles.bottom}}>
                <View style={{ ...styles.btnStyle, }}>
                    <TouchableOpacity  
                        style={parameters.styledButton} 
                        onPress={() => {navigation.navigate('SignInScreen')}}
                    >
                        <Text style={parameters.buttonTitle}>{buttonName}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ ...styles.btnStyle, }}>
                    <TouchableOpacity  
                        style={parameters.styledButton2} 
                        onPress={() => {navigation.navigate('RegisterScreen')}}
                    >
                        <Text style={parameters.buttonTitle2}>Create your account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SignInWelcomeScreen

const styles = StyleSheet.create({
    top:{
        height:'15%', 
        justifyContent:'flex-start', 
        alignItems:'center', 
        marginVertical:20,
    },
    middle:{
        height:'50%',
        borderTopWidth:1,
        borderBottomWidth:1, 
        borderColor:colors.buttons, 
        marginVertical:20,
    },
    bottom:{
        height:'24%',
        justifyContent:'flex-end',
    },
    logo:{ 
        height:60, 
        width:160, 
        marginTop:8,
    },
    swiperImgContainer:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    btnStyle:{
        justifyContent:'center', 
        alignItems:'center', 
        marginHorizontal:20,
    },
})