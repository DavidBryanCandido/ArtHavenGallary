import {
    StyleSheet,
    Text,
    View,
    Linking,
    Pressable,
    Alert,
    Switch,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import { Avatar, Button, Icon } from 'react-native-elements'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signOut } from 'firebase/auth'
import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    setDoc,
    doc,
} from 'firebase/firestore'

const DrawerContent = (props) => {
    const {
        Following = 0,
        Follower = 0,
        Post = 0,
        onPress,
        banner,
        avatar,
        numberOfLines = 1,
    } = props
    const auth = getAuth(FIREBASE_APP)
    const loggedInUserId = auth.currentUser.uid

    const [username, setUsername] = useState('')
    const [userHandle, setUserHandle] = useState('')

    const [editedAvatar, setEditedAvatar] = useState(avatar)
    // const [editedBanner, setEditedBanner] = useState(banner)
    // const [selectedAvatarUri, setSelectedAvatarUri] = useState(avatar)
    // const [selectedBannerUri, setSelectedBannerUri] = useState(banner)
    const [postCount, setPostCount] = useState(0) // New state variable

    useEffect(() => {
        // Retrieve logged-in user ID from authentication state
        const auth = getAuth(FIREBASE_APP)
        const userId = auth.currentUser.uid

        // Retrieve user data from Firestore
        const firestore = getFirestore(FIREBASE_APP)
        const usersCollection = collection(firestore, 'users')
        const userQuery = query(usersCollection, where('userId', '==', userId))
        // Retrieve post count from Firestore
        const postsCollection = collection(firestore, 'art')
        const userPostsQuery = query(
            postsCollection,
            where('userId', '==', loggedInUserId)
        )

        getDocs(userPostsQuery)
            .then((querySnapshot) => {
                const count = querySnapshot.size // Get the number of documents in the query snapshot
                setPostCount(count) // Update the postCount state variable
            })
            .catch((error) => {
                console.error('Error retrieving user posts:', error)
            })

        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // User data found
                    const userData = querySnapshot.docs[0].data()
                    setUsername(userData.username)
                    setUserHandle(userData.userHandle)

                    // Set the retrieved values in the edited state variables as well
                    // setEditedFullName(userData.fullName)
                    // setEditedUsername(userData.username)
                    // setEditedHandle(userData.userHandle)
                    setEditedAvatar(userData.avatar)
                    // setEditedBanner(userData.banner)
                } else {
                    // User data not found
                    setUsername('')
                    setUserHandle('')
                    // setEditedFullName('')
                    // setEditedUsername('')
                    // setEditedHandle('')
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error)
                setUsername('')
                setUserHandle('')
                setEditedFullName('')
                setEditedUsername('')
                setEditedHandle('')
            })
    }, [])

    const navigation = useNavigation() // Hook for accessing the navigation object
    // const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                // Redirect user to sign in screen or any other appropriate screen
                props.navigation.navigate('SignInWelcomeScreen')
                props.navigation.toggleDrawer()
            })
            .catch((error) => {
                // An error happened.
                console.log(error)
            })
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={{ ...styles.UserCon }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', marginLeft: 20 }}
                        activeOpacity={0.9}
                    >
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={60}
                            source={{
                                uri: editedAvatar,
                            }}
                        />
                        <View
                            style={{
                                width: 175,
                                height: 55,
                                alignContent: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <Text style={{ fontSize: 15, color: colors.text2 }}>
                                Signed in as
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: colors.text1,
                                    fontWeight: '900',
                                    width: 160,
                                }}
                                numberOfLines={numberOfLines}
                            >
                                {username}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ ...styles.bellowCon }}>
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
                                1
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
                                0
                            </Text>
                            <Text style={{ color: colors.text2, fontSize: 16 }}>
                                Follower
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <View
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(66, 103, 178, .1)',
                    }}
                >
                    <View style={{ marginLeft: 20, paddingVertical: 5 }}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: colors.text2,
                                    marginBottom: 5,
                                }}
                            >
                                Preferences
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: colors.text2,
                                    fontWeight: 'bold',
                                }}
                            >
                                Dark Theme
                            </Text>
                            <View style={{ marginRight: 10 }}>
                                <Switch
                                    trackColor={{
                                        false: colors.buttons,
                                        true: colors.buttons2,
                                    }}
                                    thumbColor={colors.buttons3}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: colors.text2,
                                    fontWeight: 'bold',
                                }}
                            >
                                Safe Mode
                            </Text>
                            <View style={{ marginRight: 10 }}>
                                <Switch
                                    trackColor={{
                                        false: colors.buttons,
                                        true: colors.buttons2,
                                    }}
                                    thumbColor={colors.buttons3}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
            <DrawerItem
                label="Sign Out"
                labelStyle={{ color: colors.text2, fontSize: 16 }}
                onPress={handleSignOut}
                icon={({ size }) => (
                    <Ionicons
                        name="log-out-outline"
                        color={colors.text2}
                        size={(size = 30)}
                    />
                )}
            />
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    UserCon: {
        backgroundColor: 'rgba(9, 31, 61, .5)',
        paddingVertical: 10,
        marginBottom: 16,
    },
    bellowCon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 10,
    },
})
