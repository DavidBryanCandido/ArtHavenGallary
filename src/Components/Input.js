import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/styles';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
    placeholder,
    value,
    onChangeText,
    width = 320,
}) => {
    return (
        <View style={{...styles.inputContainer, width: width,}}>
            <TextInput 
                placeholder= {placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor= {colors.text2}
                style={{ ...styles.input,}}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: { 
        backgroundColor: colors.ipBG2,
        marginTop:20,
        marginLeft:20,
        borderRadius:5,
        height:40,
        
        paddingHorizontal:16,
        color:colors.buttons,
        fontSize:18,

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
        
    },
})