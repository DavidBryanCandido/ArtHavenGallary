import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    Dimensions,
    FlatList,
    RefreshControl,
} from 'react-native'
import { colors } from '../Global/styles'
import Header from '../Components/Header'
import PostedCard from '../Components/PostedCard'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'

import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width: screenWidth } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    const onPostPress = () => {
        navigation.navigate('PostScreen')
    }
    const navigation2 = useNavigation() // Hook for accessing the navigation object

    // const handlePreview = (postId) => {
    //     const selectedItem = artData.find((item) => item.postId === postId)
    //     console.log(selectedItem)
    //     if (selectedItem) {
    //         navigation2.navigate('PostDetails', { selectedItem })
    //     }
    // }
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

    const [artData, setArtData] = useState([])
    const [userProfiles, setUserProfiles] = useState([])

    const fetchData = async () => {
        try {
            const firestore = getFirestore(FIREBASE_APP)

            // Fetch art data
            const artCollection = collection(firestore, 'art')
            const artQuery = query(artCollection)

            const artSnapshot = await getDocs(artQuery)
            const artItems = artSnapshot.docs.map((doc) => {
                const data = doc.data()
                const image = data.image // Retrieve the image URL
                return { ...data, image } // Include the image URL in the item object
            })
            setArtData(artItems)

            // Fetch user data
            const usersCollection = collection(firestore, 'users')
            const userQuery = query(usersCollection)

            const userSnapshot = await getDocs(userQuery)
            const users = userSnapshot.docs.map((doc) => doc.data())
            setUserProfiles(users)
        } catch (error) {
            console.error('Error retrieving data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const keyExtractor = (item) => {
        if (item && item.postId) {
            return item.postId
        }
        return ''
    }

    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true)
        await fetchData()
        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <Header
                menuOrBack={'forwardburger'}
                post={'plus-box-outline'}
                refresh={'refresh'} // Add the refresh button
                logo={require('../../assets/ArtHaven_logo.png')}
                onPostPress={onPostPress}
                onMenuPress={onMenuPress}
                navigation={navigation}
            />
            <SafeAreaView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%', paddingTop: 10 }}
            >
                <FlatList
                    horizontal={false}
                    style={{ width: '100%', height: '100%' }}
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
                                ArtistName={
                                    userProfile ? userProfile.username : ''
                                }
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
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    refreshButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 10,
    },
})
