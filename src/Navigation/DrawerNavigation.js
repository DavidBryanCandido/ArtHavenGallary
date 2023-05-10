import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { colors } from '../Global/styles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigator from './BottomNavigator';
import ShopScreen from '../Screens/ShopScreen';
import PopularScreen from '../Screens/PopularScreen';
import DrawerContent from '../Screens/DrawerContent';
import ShopNavigator from './ShopNavigator';

const  Drawer =  createDrawerNavigator();

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            initialRouteName='BottomNavigation' 
            screenOptions={{ 
                headerShown: false, 
                drawerStyle: {
                    backgroundColor: colors.bgLight,
                },
            }}
            drawerContent={props => <DrawerContent {...props}/>} 
        >
            <Drawer.Screen 
                name='BottomNavigation'
                component={BottomNavigator}
                options={{ 
                    title: 'Home',
                    drawerIcon :({focused, size}) => (
                        <Ionicons 
                            name={focused ? 'home' : 'home-outline'}
                            color={focused ? colors.buttons2 : colors.ipBG2}
                            size={size = 35}
                        />
                    ),   
                    drawerActiveBackgroundColor: 'rgba(66, 103, 178, .1)',
                    drawerLabelStyle:{ color:colors.text1, fontSize:16,}

                }}
            />
            <Drawer.Screen 
                name='ShopNavigator'
                component={ShopNavigator}
                
                options={{
                    title: 'Shop',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'storefront' : 'storefront-outline'}
                            color={focused ? colors.buttons : colors.ipBG2}
                            size={size = 35}
                        />
                    ),
                    drawerActiveBackgroundColor:'rgba(66, 103, 178, .1)',
                    drawerLabelStyle:{ color:colors.text1, fontSize:16,}
                }}
                
            />
            <Drawer.Screen 
                name='PopularScreen'
                component={PopularScreen}
                
                options={{
                    title: 'Popular',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'flame' : 'flame-outline'}
                            color={focused ? '#cf352e' : colors.ipBG2}
                            size={size = 35}
                        />
                    ),
                    drawerActiveBackgroundColor: 'rgba(66, 103, 178, .1)',
                    drawerLabelStyle:{ color:colors.text1, fontSize:16,}
                }}
                
            />
            

        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})