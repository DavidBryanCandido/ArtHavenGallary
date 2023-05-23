import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    Dimensions,
    FlatList,
} from 'react-native'
import { colors } from '../Global/styles'
import Header from '../Components/Header'
import { PostedCardData } from '../Global/Data'
import PostedCard from '../Components/PostedCard'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
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

import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'

const { width: screenWidth } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    const onPostPress = () => {
        navigation.navigate('PostScreen')
    }
    const navigation2 = useNavigation() // Hook for accessing the navigation object
    const handlePreview = (postId) => {
        console.log('Preview clicked for postId: ', postId)
        const selectedItem = PostedCardData.find(
            (item) => item.postId === postId
        )
        navigation2.navigate('PostDetails', { selectedItem })
    }
    const [userProfiles, setUserProfiles] = useState([])
    const [artData, setArtData] = useState([])
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
                return { ...data, image } // Include the image URL in the
            })
            console.log(artItems)
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
    return (
        <View style={styles.container}>
            <Header
                menuOrBack={'forwardburger'}
                //menuOrBack={'grid-outline'}
                //title={'MY ACCOUNT'}
                post={'plus-box-outline'}
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
                    keyExtractor={(item) => item.postId.toString()}
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
                                avatar={userProfile ? userProfile.avatar : ''}
                                Price={item.price}
                                postId={item.postId}
                                onPress={() => handlePreview(item.postId)}
                            />
                        )
                    }}
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

    linearGradient: {
        width: '100%',
        height: '50%',
        overflow: 'hidden',
    },
})
