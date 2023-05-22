import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'

const ProfileLikesScreen = () => {
    return (
        <View style={{ ...styles.container }}>
            <Text>ProfileLikesScreen</Text>
        </View>
    )
}

export default ProfileLikesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
    },
})
