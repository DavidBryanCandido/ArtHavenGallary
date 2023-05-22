import React, { useState } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../Global/styles'
import ProfileScreen from '../Screens/ProfileScreen'
import ProfileAllPostScreen from '../Screens/ProfileAllPostScreen'
import ProfileLikesScreen from '../Screens/ProfileLikesScreen'
import { Ionicons } from '@expo/vector-icons'
import { color } from 'react-native-reanimated'

const ProfileTab = createMaterialTopTabNavigator()

const ProfileNavigator = ({ navigation }) => {
    const [showView, setShowView] = useState(false)

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y
        // Adjust the threshold value as needed
        const threshold = 230
        setShowView(scrollPosition > threshold)
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.bgLight }}>
            <ScrollView style={styles.container} onScroll={handleScroll}>
                <View style={styles.header}>
                    <ProfileScreen />
                </View>

                <View style={styles.content}>
                    <ProfileTab.Navigator
                        initialRouteName="ProfileAllPostScreen"
                        screenOptions={{
                            tabBarLabelStyle: {
                                fontSize: 16,
                                marginTop: -5,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                flex: 1,
                            },
                            tabBarStyle: {
                                backgroundColor: colors.hBG,
                                height: 35,
                            },
                            tabBarActiveTintColor: colors.buttons2,
                            tabBarInactiveTintColor: colors.buttons,
                            tabBarIndicatorStyle: {
                                backgroundColor: colors.buttons2,
                            },
                            tabBarIndicatorContainerStyle: {
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        }}
                    >
                        <ProfileTab.Screen
                            name="ProfileAllPostScreen"
                            component={ProfileAllPostScreen}
                            options={{
                                title: 'Posts',
                            }}
                        />
                        <ProfileTab.Screen
                            name="ProfileLikesScreen"
                            component={ProfileLikesScreen}
                            options={{
                                title: 'Likes',
                            }}
                        />
                    </ProfileTab.Navigator>
                </View>
            </ScrollView>
            <View style={styles.showView}>
                <Ionicons
                    name="chevron-forward-outline"
                    size={30}
                    color={colors.buttons}
                    onPress={() => {
                        navigation.toggleDrawer()
                    }}
                />
            </View>
        </View>
    )
}

export default ProfileNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'red', // Replace with your desired background color for the header
        height: 400,
        marginTop: 60,
    },
    content: {
        // flex: 1,
        height: 615,
    },
    showView: {
        position: 'absolute',
        top: 0,
        backgroundColor: colors.hBG,
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.buttons,
    },
})
