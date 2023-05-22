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
import { useState } from 'react'

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
                    data={PostedCardData}
                    keyExtractor={(item) => item.postId.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <PostedCard
                                borderRadius={0}
                                screenWidth={screenWidth}
                                PostedImage={item.PostedImage}
                                ArtistPf={item.ArtistPf}
                                ArtName={item.ArtName}
                                ArtistName={item.ArtistName}
                                ArtistHandle={item.ArtistHandle}
                                Price={item.Price}
                                Likes={item.Likes}
                                Comments={item.Comments}
                                postId={item.postId}
                                onPress={() => handlePreview(item.postId)}
                            />
                        </View>
                    )}
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
