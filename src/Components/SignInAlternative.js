import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, Zocial, SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../Global/styles';


const SignInAlternative = ({onPress,title, name, bg}) => {
    return (
        <TouchableOpacity 
            style={{ 
                ...styles.container, 
                backgroundColor: bg 
            }}
            activeOpacity={.7}
            onPress={onPress}
        >
            <Zocial
                name={name}
                color={colors.buttons}
                size={24}
                style={{ marginRight:20, }}
            />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SignInAlternative

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        borderRadius:5,
        flexDirection:'row',
        height:45,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:320,
    },
    text:{
        color:colors.text1,
        fontSize:16,
      },
})