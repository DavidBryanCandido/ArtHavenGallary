import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { createStackNavigator } from '@react-navigation/stack'
import SignInWelcomeScreen from '../Screens/AuthScreen/SignInWelcomeScreen'
import SignInScreen from '../Screens/AuthScreen/SignInScreen'
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen'
import Screen from '../Components/Screen'
import DrawerNavigation from './DrawerNavigation'
//import BottomNavigator from './BottomNavigator'
import PostDetails from '../Screens/PostDetails'
import PostScreen from '../Screens/PostScreen'
import ProfileEditScreen from '../Screens/ProfileEditScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import Postdetails2 from '../Screens/postdetails2'

const AuthStack = createStackNavigator()

const AuthNavigators = () => {
    return (
        <Screen>
            <StatusBar
                barStyle="night-content"
                backgroundColor={colors.bgLight}
            />
            <AuthStack.Navigator
                initialRouteName="SignInWelcomeScreen"
                screenOptions={{ headerShown: false }}
            >
                <AuthStack.Screen name="SignInWelcomeScreen">
                    {({ navigation }) => (
                        <SignInWelcomeScreen
                            navigation={navigation}
                            buttonName={'Sign In'}
                        />
                    )}
                </AuthStack.Screen>
                <AuthStack.Screen name="SignInScreen">
                    {({ navigation }) => (
                        <SignInScreen
                            navigation={navigation}
                            buttonName2="Sign In"
                        />
                    )}
                </AuthStack.Screen>
                <AuthStack.Screen name="RegisterScreen">
                    {({ navigation }) => (
                        <RegisterScreen navigation={navigation} />
                    )}
                </AuthStack.Screen>
                {/*
            <AuthStack.Screen name='BottomNavigator' component={BottomNavigator}  />
*/}
                <AuthStack.Screen
                    name="DrawerNavigation"
                    component={DrawerNavigation}
                />
                <AuthStack.Screen name="PostDetails" component={PostDetails} />
                <AuthStack.Screen
                    name="Postdetails2"
                    component={Postdetails2}
                />
                <AuthStack.Screen name="PostScreen" component={PostScreen} />
                <AuthStack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                />
                <AuthStack.Screen
                    name="ProfileEditScreen"
                    component={ProfileEditScreen}
                />
            </AuthStack.Navigator>
        </Screen>
    )
}

export default AuthNavigators
