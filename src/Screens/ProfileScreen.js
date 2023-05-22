import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Global/styles'
import { Avatar } from 'react-native-elements'
import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import Header from '../Components/Header'

const { width: screenWidth } = Dimensions.get('window')

const ProfileScreen = ({
    Following = 0,
    Follower = 0,
    Post = 0,
    numberOfLines = 1,
    navigation,
}) => {
    const auth = getAuth(FIREBASE_APP)
    const loggedInUserId = auth.currentUser.uid

    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    const [username, setUsername] = useState('')
    const [userHandle, setUserHandle] = useState('')

    useEffect(() => {
        // Retrieve logged-in user ID from authentication state
        const auth = getAuth(FIREBASE_APP)
        const userId = auth.currentUser.uid

        // Retrieve user data from Firestore
        const firestore = getFirestore(FIREBASE_APP)
        const usersCollection = collection(firestore, 'users')
        const userQuery = query(usersCollection, where('userId', '==', userId))
        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // User data found
                    const userData = querySnapshot.docs[0].data()
                    setUsername(userData.username)
                    setUserHandle(userData.userHandle)
                } else {
                    // User data not found
                    setUsername('')
                    setUserHandle('')
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error)
                setUsername('')
                setUserHandle('')
            })
    }, [])

    function shortenNumber(num) {
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1) + 't'
        } else if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'b'
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'
        } else {
            return num.toString()
        }
    }
    return (
        <View style={{ ...styles.container }}>
            <View style={styles.topCon}>
                <Image
                    style={styles.banner}
                    source={require('../Img/UserImg/default-banner.jpg')}
                />
                <View
                    style={{
                        // borderWidth: 4,
                        // borderColor: colors.bgLight,
                        width: 80,
                        height: 80,
                        backgroundColor: colors.uCon,
                        borderRadius: 5,
                        overflow: 'hidden',
                        position: 'absolute',
                        marginTop: 90,
                        marginLeft: 16,
                    }}
                >
                    <Image
                        style={styles.avatar}
                        source={require('../Img/UserImg/default-user.png')}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 8, right: 16 }}>
                    {loggedInUserId && (
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: colors.buttons,
                                padding: 5,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.text1,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                            >
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View
                style={{
                    padding: 16,
                    paddingLeft: 16,
                    paddingTop: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        color: colors.text1,
                        fontWeight: 'bold',
                        width: '80%',
                    }}
                    numberOfLines={numberOfLines}
                >
                    {username}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="at-outline"
                        size={19}
                        color={colors.text2}
                        style={{
                            marginRight: 1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.text2,
                            width: '50%',
                        }}
                        numberOfLines={numberOfLines}
                    >
                        {userHandle}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    activeOpacity={0.7}
                >
                    <Text
                        style={{
                            color: colors.text1,
                            marginRight: 5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {shortenNumber(Following)}
                    </Text>
                    <Text style={{ color: colors.text2, fontSize: 16 }}>
                        Following
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    activeOpacity={0.7}
                >
                    <Text
                        style={{
                            color: colors.text1,
                            marginRight: 5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {shortenNumber(Follower)}
                    </Text>
                    <Text style={{ color: colors.text2, fontSize: 16 }}>
                        Follower
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }} activeOpacity={0.7}>
                    <Text
                        style={{
                            color: colors.text1,
                            marginRight: 5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {shortenNumber(Post)}
                    </Text>
                    <Text style={{ color: colors.text2, fontSize: 16 }}>
                        Post
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: 300,
        height: 300,
        backgroundColor: colors.bgLight,
    },
    topCon: {
        height: 200,
        width: '100%',
        overflow: 'hidden',
        // backgroundColor: 'red',
    },
    banner: {
        width: '100%',
        height: 150,
    },
    avatar: {
        width: 80,
        height: 80,
    },
})
