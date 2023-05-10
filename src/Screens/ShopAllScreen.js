import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Button } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { useState } from 'react'
import PostedCard from '../Components/PostedCard';
import { PostedCardData } from '../Global/Data';
import { useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const ShopAllScreen = () => {
    const filteredData = PostedCardData.filter(item => item.Price > 0);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < filteredData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        }
    };
    const renderItem = ({ item }) => (
        <View>
          <PostedCard
            borderRadius={0}
            screenWidth={screenWidth*.95 }
            PostedImage={item.PostedImage}
            ArtistPf={item.ArtistPf}
            ArtName={item.ArtName}
            ArtistName={item.ArtistName}
            ArtistHandle={item.ArtistHandle}
            Price={item.Price}
            Likes={item.Likes}
            Comments={item.Comments}
            postId={item.postId}
            //onPress={() => handlePreview(item.postId)}
          />
        </View>
      );

        
    return (
        <ScrollView contentContainerStyle={{ ...styles.container,  }}>
            <FlatList
                horizontal
                style={{ width: '95%', height: '100%', backgroundColor:'red'}}
                data={[filteredData[currentIndex]]}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={renderItem}
            />
            <View style={{ flexDirection: 'row', width:'100%', justifyContent:'space-evenly', marginVertical:28, }}>
                <Button title="Previous" onPress={handlePrevious} disabled={currentIndex === 0} />
                <Button title="Next" onPress={handleNext} disabled={currentIndex === filteredData.length - 1} />
            </View>

        </ScrollView>
    )
}

export default ShopAllScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.bgLight,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    scrollContainer:{
        backgroundColor:colors.uCon,
        width: screenWidth*5,
        flexGrow:1,
    },
})