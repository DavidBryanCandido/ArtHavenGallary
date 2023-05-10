import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInWelcomeScreen from '../Screens/AuthScreen/SignInWelcomeScreen'
import SignInScreen from '../Screens/AuthScreen/SignInScreen'
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen'
import Screen from '../Components/Screen'
import DrawerNavigation from './DrawerNavigation'
//import BottomNavigator from './BottomNavigator'
import PostDetails from '../Screens/PostDetails'

const AuthStack = createStackNavigator()

const AuthNavigators = () => {
    return (
        <Screen>
        <AuthStack.Navigator initialRouteName='DrawerNavigation' screenOptions={{headerShown: false}}>
            <AuthStack.Screen name='SignInWelcomeScreen'>
                {({ navigation }) => <SignInWelcomeScreen navigation={navigation} buttonName={'Sign In'} /> }
            </AuthStack.Screen>
            <AuthStack.Screen name='SignInScreen'>
                {({ navigation }) => <SignInScreen navigation={navigation} buttonName2='Sign In' />}
            </AuthStack.Screen>
            <AuthStack.Screen name='RegisterScreen'>
                {({ navigation }) => <RegisterScreen navigation={navigation} />}
            </AuthStack.Screen>
{/*
            <AuthStack.Screen name='BottomNavigator' component={BottomNavigator}  />
*/}
            <AuthStack.Screen name='DrawerNavigation' component={DrawerNavigation}  />
            <AuthStack.Screen name='PostDetails' component={PostDetails}/>


        </AuthStack.Navigator>
        </Screen>
    )
}

export default AuthNavigators