import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../Global/styles'
import ProfileScreen from '../Screens/ProfileScreen'

const ProfileTab = createMaterialTopTabNavigator()

const ProfileNavigator = () => {
    return (
        <View>
            <ProfileScreen />
        </View>
    )
}

export default ProfileNavigator

const styles = StyleSheet.create({})
