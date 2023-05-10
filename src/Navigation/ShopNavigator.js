import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../Global/styles';
import ShopScreen from '../Screens/ShopScreen';
import ShopAllScreen from '../Screens/ShopAllScreen';
import ShopFreeScreen from '../Screens/ShopFreeScreen';
import ShopPremiumScreen from '../Screens/ShopPremiumScreen';
import ShopCommissionedScreen from '../Screens/ShopCommissionedScreen';
import Comment from '../Components/Comment';


const MiddleTab = createMaterialTopTabNavigator();

const ShopNavigator = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <View style={styles.container}>
            <ShopScreen 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />
            <MiddleTab.Navigator
                initialRouteName='AllShopContent'
                screenOptions={{ 
                    tabBarLabelStyle: { 
                    fontSize: 14, 
                    fontWeight:'bold', 
                    textTransform: 'capitalize', 
                    marginTop:-0, 
                    flex: 1 
                    },
                    tabBarStyle:{ 
                    backgroundColor:'#0c0c21', 
                    height:40, 
                    },
                    tabBarActiveTintColor:colors.buttons2,
                    tabBarInactiveTintColor:colors.buttons,
                    tabBarIndicatorStyle:{ 
                    backgroundColor: colors.buttons2, 
                    width:50, 
                    },
                    tabBarIndicatorContainerStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft:47,
                    },
                    tabBarScrollEnabled: true, 
                    scrollEnabled:false,
                }}
            >
            <MiddleTab.Screen
                name='ShopAllScreen'
                options={{ 
                    title:'All', 
                }}
            >
                {() => {
                    return <ShopAllScreen/>
                }}
            </MiddleTab.Screen>
            <MiddleTab.Screen
                name='ShopFreeScreen'
                options={{ 
                    title:'Free', 
                }}
            >
                {() => {
                    return <ShopFreeScreen 
                                searchQuery={searchQuery} 
                                setSearchQuery={setSearchQuery}
                            />
                }}
            </MiddleTab.Screen>
            <MiddleTab.Screen
                name='ShopPremiumScreen'
                options={{ 
                    title:'Premium', 
                }}
            >
                {() => {
                    return <ShopPremiumScreen
                                searchQuery={searchQuery} 
                                setSearchQuery={setSearchQuery}
                            />
                }}
            </MiddleTab.Screen>
            <MiddleTab.Screen
                name='ShopCommissionedScreen'
                options={{ 
                    title:'Commissioned', 
                }}
            >
                {() => {
                    return <ShopCommissionedScreen
                                searchQuery={searchQuery} 
                                setSearchQuery={setSearchQuery}
                            />
                }}
            </MiddleTab.Screen>



            </MiddleTab.Navigator>
        </View>
    )
}

export default ShopNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurShopContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:250,
      },
      blurShopText:{
        color:colors.text1,

        textAlign:'center',
        fontSize:32,
      },
})