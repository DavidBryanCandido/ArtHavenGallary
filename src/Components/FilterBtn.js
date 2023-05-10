import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image} from 'react-native'
import { colors } from '../Global/styles'

const FilterBtn = ({image, title = 'title', size = 16, screenHeight, screenWidth, icon, onPress}) => {
    return (
        <TouchableOpacity 
            style={{
                ...styles.btn, 
                width:screenWidth, 
                height:screenHeight, 
            }} 
                activeOpacity={.7}
                onPress={onPress}
        >
            <ImageBackground style={{ width: '100%', height:'100%',}} source={image} blurRadius={5}>
                <View style={{ width: '100%', height:'100%', backgroundColor: 'rgba(9, 31, 61, .4)', justifyContent:'center', alignItems:'center',}} >
                    <Image source={icon}/>
                    <Text style={{fontSize: size, color:colors.text1, fontWeight:'bold', width:110, textAlign:'center',}} numberOfLines={2}>{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default FilterBtn

const styles = StyleSheet.create({
    btn:{
        width: 130, 
        backgroundColor: colors.uCon,
        aspectRatio:1,
        marginVertical:5,
        overflow:'hidden',
        borderRadius:16,
    },

})