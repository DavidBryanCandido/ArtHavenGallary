import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { ScrollView } from 'react-native-gesture-handler'

const ProfileAllPostScreen = () => {
    return (
        <View style={{ ...styles.container }}>
            <Text>ProfileAllPostScreen</Text>
        </View>
    )
}

export default ProfileAllPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
    },
})
