import {
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Global/styles'
import PostedCard from '../Components/PostedCard'
import { getAuth } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { useNavigation } from '@react-navigation/native'

const { width: screenWidth } = Dimensions.get('window')

const ProfileAllPostScreen = () => {
    const [artData, setArtData] = useState([])
    const [userData, setUserData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userId = getAuth().currentUser.uid
                const q = query(
                    collection(FIRESTORE_DB, 'art'),
                    where('userId', '==', userId)
                )
                const querySnapshot = await getDocs(q)
                const data = querySnapshot.docs.map((doc) => doc.data())
                setArtData(data)
            } catch (error) {
                console.log('Error fetching posts:', error)
            }
        }

        fetchPosts()
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = getAuth().currentUser.uid
                const q = query(
                    collection(FIRESTORE_DB, 'users'),
                    where('userId', '==', userId)
                )
                const querySnapshot = await getDocs(q)
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data()
                    setUserData(userData)
                }
            } catch (error) {
                console.log('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [])

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const userIds = artData.map((item) => item.userId)
                const q = query(
                    collection(FIRESTORE_DB, 'users'),
                    where('userId', 'in', userIds)
                )
                const querySnapshot = await getDocs(q)
                const profiles = querySnapshot.docs.map((doc) => doc.data())
                setUserProfiles(profiles)
            } catch (error) {
                console.log('Error fetching user profiles:', error)
            }
        }

        fetchUserProfiles()
    }, [artData])

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            const userId = getAuth().currentUser.uid
            const q = query(
                collection(FIRESTORE_DB, 'art'),
                where('userId', '==', userId)
            )
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map((doc) => doc.data())
            setArtData(data)
        } catch (error) {
            console.log('Error refreshing posts:', error)
        }
        setRefreshing(false)
    }

    const keyExtractor = (item) => item.postId.toString()

    const navigation2 = useNavigation() // Hook for accessing the navigation object

    // const [userProfiles, setUserProfiles] = useState([])
    const handlePreview = (postId) => {
        const selectedItem = artData.find((item) => item.postId === postId)
        if (selectedItem) {
            console.log(selectedItem)
            console.log(userProfiles)
            const userProfile = userProfiles.find(
                (profile) => profile.userId === selectedItem.userId
            )
            console.log(userProfile)
            if (userProfile) {
                navigation2.navigate('PostDetails', {
                    selectedItem,
                    username: userProfile.username,
                    userHandle: userProfile.userHandle,
                    avatar: userProfile.avatar,
                })
            } else {
                navigation2.navigate('PostDetails', { selectedItem })
            }
        }
    }
    return (
        <SafeAreaView
            style={styles.container}
            horizontal={false}
            showsVerticalScrollIndicator={false}
        >
            <FlatList
                style={{ flex: 1 }}
                data={artData}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => {
                    const userProfile = userProfiles.find(
                        (profile) => profile.userId === item.userId
                    )

                    return (
                        <PostedCard
                            borderRadius={0}
                            screenWidth={screenWidth}
                            PostedImage={item.image}
                            ArtName={item.artName}
                            ArtistName={userProfile ? userProfile.username : ''}
                            userHandle={
                                userProfile ? userProfile.userHandle : ''
                            }
                            avatar={userProfile ? userProfile.avatar : null}
                            Price={item.price}
                            postId={item.postId}
                            onPress={() => handlePreview(item.postId)}
                        />
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </SafeAreaView>
    )
}

export default ProfileAllPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 300,
        backgroundColor: colors.bgLight,
        width: '100%',
        paddingTop: 10,
    },
    refreshButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
})
