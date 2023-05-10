import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigators from './AuthNavigators'

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AuthNavigators />
        </NavigationContainer>
    )
}

export default RootNavigation