import { StyleSheet, Text, View, StatusBar} from 'react-native'
import React from 'react'

const Screen = ({children}) => {
    return (
        <View style={styles.contaier}>{children}</View>
    )
}

export default Screen

const styles = StyleSheet.create({
    contaier:{
        marginTop: StatusBar.currentHeight,
        flex:1,
    },
})