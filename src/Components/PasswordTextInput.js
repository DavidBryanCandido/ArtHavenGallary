import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/styles';
import { Ionicons } from '@expo/vector-icons';

const PasswordTextInput = ({
    placeholder,
    value,
    onChangeText,
}) => 
{       
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
    };
    
    return (

        <View style={{...styles.inputContainer, }}>
            <TextInput
                style={styles.input}
                placeholder= {placeholder}
                secureTextEntry={!isPasswordVisible}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor= {colors.text2}
            />
            <TextInput 
                style={{ ...styles.input, position:'absolute',}}
            />
            <Ionicons 
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                onPress={togglePasswordVisibility}
                color={colors.buttons}
                style={{ 
                    borderLeftWidth:2,
                    paddingLeft:16,
                    borderColor:colors.uCon,
                }}
            />
        </View>
    )
}

export default PasswordTextInput;

const styles = StyleSheet.create({
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