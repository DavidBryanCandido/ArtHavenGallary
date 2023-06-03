import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    SafeAreaView,
} from 'react-native'
import React from 'react'
import PostedCard from '../Components/PostedCard'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons'
import { PostedCardData } from '../Global/Data'
import { useNavigation } from '@react-navigation/native'
import Card from '../Components/Card'

const { width: screenWidth } = Dimensions.get('window')

const ShopPremiumScreen = ({ searchQuery }) => {
    const filteredData = PostedCardData.filter((item) => {
        const query = searchQuery ? searchQuery.trim().toLowerCase() : ''
        return (
            item.ArtName.toLowerCase().includes(query) ||
            item.ArtistName.toLowerCase().includes(query) ||
            item.ArtistHandle.toLowerCase().includes(query) ||
            item.tags.some((tag) => tag.toLowerCase().includes(query))
        )
    }).filter((item) => item.Price > 0)

    if (filteredData.length === 0) {
        return (
            <View
                style={{
                    backgroundColor: colors.bgLight,
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <View style={{ height: 100, width: 100, marginTop: 90 }}>
                    <Ionicons name="search" size={100} color={colors.buttons} />
                    <Ionicons
                        name="help-outline"
                        size={40}
                        color={colors.buttons}
                        style={{
                            position: 'absolute',
                            left: 23,
                            top: 25,
                        }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: colors.text1,
                            textAlign: 'center',
                        }}
                    >
                        No Result Found
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.text2,
                            textAlign: 'center',
                        }}
                    >
                        We can't find any item matching your search.
                    </Text>
                </View>
            </View>
        )
    }
    const navigation = useNavigation() // Hook for accessing the navigation object
    const handlePreview = (postId) => {
        console.log('Preview clicked for postId: ', postId)
        const selectedItem = filteredData.find((item) => item.postId === postId)
        navigation.navigate('Postdetails2', { selectedItem })
    }

    return (
        <View style={{ backgroundColor: colors.bgLight }}>
            <FlatList
                horizontal={false}
                style={{ width: '100%', height: '100%' }}
                data={filteredData}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={({ item }) => (
                    <SafeAreaView>
                        <Card
                            borderRadius={0}
                            marginBottom={3}
                            screenWidth={screenWidth * 0.99}
                            PostedImage={item.PostedImage}
                            avatar={item.ArtistPf}
                            ArtName={item.ArtName}
                            ArtistName={item.ArtistName}
                            ArtistHandle={item.ArtistHandle}
                            Price={item.Price}
                            Likes={item.Likes}
                            Comments={item.Comments}
                            postId={item.postId}
                            onPress={() => handlePreview(item.postId)}
                        />
                    </SafeAreaView>
                )}
            />
        </View>
    )
}

export default ShopPremiumScreen

const styles = StyleSheet.create({})
