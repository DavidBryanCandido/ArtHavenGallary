import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Modal,
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
    updateDoc,
    setDoc,
    doc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import Header from '../Components/Header'
import { async } from '@firebase/util'
import * as ImagePicker from 'expo-image-picker'

const { width: screenWidth } = Dimensions.get('window')

const ProfileScreen = ({
    Following = 0,
    Follower = 0,
    Post = 0,
    onPress,
    banner,
    avatar,
    numberOfLines = 1,
    navigation,
}) => {
    const auth = getAuth(FIREBASE_APP)
    const loggedInUserId = auth.currentUser.uid

    const [username, setUsername] = useState('')
    const [userHandle, setUserHandle] = useState('')

    const [editedAvatar, setEditedAvatar] = useState(avatar)
    const [editedBanner, setEditedBanner] = useState(banner)
    const [selectedAvatarUri, setSelectedAvatarUri] = useState(avatar)
    const [selectedBannerUri, setSelectedBannerUri] = useState(banner)

    const selectAvatar = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if (!result.canceled) {
                const avatarUri = result.assets[0].uri
                setSelectedAvatarUri(avatarUri)

                // Save the selected avatar image to Firestore
                const firestore = getFirestore(FIREBASE_APP)
                const userDocRef = doc(firestore, 'users', loggedInUserId)

                // Use setDoc instead of updateDoc to create or update the document
                setDoc(userDocRef, { avatar: avatarUri })
                    .then(() => {
                        console.log('Avatar image saved to Firestore')
                        setEditedAvatar(avatarUri) // Update the editedAvatar variable
                    })
                    .catch((error) => {
                        console.error('Error updating avatar image:', error)
                    })
            }
        } catch (error) {
            console.log('Error while accessing media library:', error)
        }
    }

    const selectBanner = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if (!result.canceled) {
                const bannerUri = result.assets[0].uri
                setSelectedBannerUri(bannerUri)

                // Save the selected banner image to Firestore
                const firestore = getFirestore(FIREBASE_APP)
                const userDocRef = doc(firestore, 'users', loggedInUserId)

                // Use setDoc instead of updateDoc to create or update the document
                setDoc(userDocRef, { banner: bannerUri })
                    .then(() => {
                        console.log('Banner image saved to Firestore')
                        setEditedBanner(bannerUri) // Update the editedBanner variable
                    })
                    .catch((error) => {
                        console.error('Error updating banner image:', error)
                    })
            }
        } catch (error) {
            console.log('Error while accessing media library:', error)
        }
    }

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

                    // Set the retrieved values in the edited state variables as well
                    setEditedFullName(userData.fullName)
                    setEditedUsername(userData.username)
                    setEditedHandle(userData.userHandle)
                    setEditedAvatar(userData.avatar)
                    setEditedBanner(userData.banner)
                } else {
                    // User data not found
                    setUsername('')
                    setUserHandle('')
                    setEditedFullName('')
                    setEditedUsername('')
                    setEditedHandle('')
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

    // State variables
    const [isModalVisible, setModalVisible] = useState(false)
    const [editedFullName, setEditedFullName] = useState('')
    const [editedUsername, setEditedUsername] = useState('')
    const [editedHandle, setEditedHandle] = useState('')
    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const saveProfileChanges = () => {
        // Save the edited profile information
        // Update the Firestore with the edited values

        const firestore = getFirestore(FIREBASE_APP)
        const usersCollection = collection(firestore, 'users')
        const userQuery = query(
            usersCollection,
            where('userId', '==', loggedInUserId)
        )

        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0]
                    const userDocRef = doc(firestore, 'users', userData.id)

                    // Create an object with the updated fields
                    const updatedData = {
                        fullName: editedFullName,
                        username: editedUsername,
                        userHandle: editedHandle,
                        avatar: editedAvatar,
                        banner: editedBanner,
                    }

                    // Update the document in Firestore
                    updateDoc(userDocRef, updatedData)
                        .then(() => {
                            console.log('Profile updated successfully')
                        })
                        .catch((error) => {
                            console.error('Error updating profile:', error)
                        })
                } else {
                    // User data not found, add a new document instead
                    const newUserData = {
                        userId: loggedInUserId,
                        fullName: editedFullName,
                        username: editedUsername,
                        userHandle: editedHandle,
                        avatar: editedAvatar,
                        banner: editedBanner,
                    }

                    // Add a new document to Firestore
                    const newUserDocRef = doc(collection(firestore, 'users'))
                    setDoc(newUserDocRef, newUserData)
                        .then(() => {
                            console.log('Profile added successfully')
                        })
                        .catch((error) => {
                            console.error('Error adding profile:', error)
                        })
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error)
            })

        // Update the state variables
        setUsername(editedUsername)
        setUserHandle(editedHandle)
        setEditedAvatar(editedAvatar)
        setEditedBanner(editedBanner)
        toggleModal() // Hide the modal after saving the changes
    }

    return (
        <View style={{ ...styles.container }}>
            <View style={styles.topCon}>
                <Image style={styles.banner} source={{ uri: editedBanner }} />
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
                        source={{ uri: editedAvatar }}
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
                            onPress={toggleModal}
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
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            padding: 20,
                            borderRadius: 10,
                            width: '90%',
                            height: '90%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginBottom: 10,
                            }}
                        >
                            Edit Profile
                        </Text>
                        <View style={styles.topCon}>
                            <TouchableOpacity onPress={selectBanner}>
                                <Image
                                    style={styles.banner}
                                    source={{ uri: editedBanner }}
                                />
                            </TouchableOpacity>
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
                                <TouchableOpacity onPress={selectAvatar}>
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: editedAvatar }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 10,
                            }}
                            placeholder="Full Name"
                            value={editedFullName}
                            onChangeText={setEditedFullName}
                        />
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 10,
                            }}
                            placeholder="Username"
                            value={editedUsername}
                            onChangeText={setEditedUsername}
                        />
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 10,
                            }}
                            placeholder="Handle"
                            value={editedHandle}
                            onChangeText={setEditedHandle}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#000',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                            }}
                            onPress={saveProfileChanges}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#ccc',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                                marginTop: 10,
                            }}
                            onPress={toggleModal}
                        >
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
