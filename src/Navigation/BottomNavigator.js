import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../Screens/HomeScreen'
import SearchScreen from '../Screens/SearchScreen'
import NotificationScreen from '../Screens/NotificationScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import ProfileNavigator from './ProfileNavigator'
import ProfileAllPostScreen from '../Screens/ProfileAllPostScreen'

const BottomTabs = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'NotificationScreen') {
                        iconName = focused
                            ? 'notifications'
                            : 'notifications-outline'
                    } else if (route.name === 'ProfileNavigator') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (route.name === 'SearchScreen') {
                        iconName = focused ? 'search' : 'search-outline'
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={focused ? colors.buttons : colors.fbBlue}
                        />
                    )
                },
                tabBarStyle: {
                    backgroundColor: colors.bgLight,
                },
                tabBarHideOnKeyboard: true,
            })}
        >
            <BottomTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarShowLabel: false }}
            />
            <BottomTabs.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ tabBarShowLabel: false }}
            />
            <BottomTabs.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ tabBarShowLabel: false }}
            />
            <BottomTabs.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{ tabBarShowLabel: false }}
            />
            {/*
            <BottomTabs.Screen
                name="ProfileAllPostScreen"
                component={ProfileAllPostScreen}
                options={{ tabBarShowLabel: false }}
            />
            */}
        </BottomTabs.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({})
