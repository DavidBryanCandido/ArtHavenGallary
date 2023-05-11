import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import Header from '../Components/Header'

const NotificationScreen = ({navigation}) => {
    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    return (
        <View style={{ ...styles.container, flex: 1}}>
            <Header 
                menuOrBack={'forwardburger'}
                title={'Notification'}
                fontSize={22}
                onMenuPress={onMenuPress}
                navigation={navigation}
            />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgLight,
    },
})