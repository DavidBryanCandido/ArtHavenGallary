import React, { useState } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../Global/styles'
import ProfileScreen from '../Screens/ProfileScreen'
import ProfileAllPostScreen from '../Screens/ProfileAllPostScreen'
import ProfileLikesScreen from '../Screens/ProfileLikesScreen'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { color } from 'react-native-reanimated'
import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

const ProfileTab = createMaterialTopTabNavigator()

const ProfileNavigator = ({ navigation }) => {
    const auth = getAuth(FIREBASE_APP)
    const loggedInUserId = auth.currentUser.uid

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
                                title: 'Favorite',
                            }}
                        />
                    </ProfileTab.Navigator>
                </View>
            </ScrollView>
            <View style={styles.showView}>
                <Ionicons
                    name="chevron-back-outline"
                    size={35}
                    color={colors.buttons}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                {loggedInUserId && (
                    <MaterialCommunityIcons
                        name="plus-box-outline"
                        size={35}
                        color={colors.buttons}
                        style={
                            {
                                // right: 10,
                            }
                        }
                        onPress={() => {
                            navigation.navigate('PostScreen')
                        }}
                    />
                )}
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
        backgroundColor: colors.bgLight,
        height: 300,
        marginTop: 50,
    },
    content: {
        // flex: 1,
        height: 615,
    },
    showView: {
        position: 'absolute',
        top: 0,
        backgroundColor: colors.hBG,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.buttons,
    },
})
