import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    borderRadius,
} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/styles'
import AutoHeightImage from 'react-native-auto-height-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const { width: screenWidth } = Dimensions.get('window') // Get the width of the screen

const PostedCard = ({
    PostedImage,
    ArtistPf,
    ArtName,
    ArtistName,
    ArtistHandle,
    Price = 0,
    Likes = 0,
    Comments = 0,
    numberOfLines = 1,
    size1 = 20,
    size2 = 16,
    screenWidth,
    borderRadius,
    marginBottom,
    onPress,
    handleImageLoad,
}) => {
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
        <TouchableOpacity
            style={{
                ...styles.container,
                overflow: 'hidden',
                borderRadius: borderRadius,
                marginBottom: marginBottom,
            }}
            width={screenWidth}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <AutoHeightImage
                source={PostedImage}
                width={screenWidth}
                onHeightChange={handleImageLoad}
            />
            <LinearGradient
                style={{
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    left: 0,
                    justifyContent: 'flex-end',
                }}
                width={screenWidth}
                colors={['rgba(13, 44, 81, .0)', 'rgba(0, 0, 0, 1)']}
            >
                <View
                    style={{
                        width: '100%',
                        height: 130,
                        alignSelf: 'center',
                        paddingVertical: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 70,
                            alignItems: 'center',
                        }}
                        activeOpacity={0.9}
                    >
                        <View
                            style={{
                                height: 45,
                                width: 45,
                                backgroundColor: colors.uCon,
                                borderRadius: 10,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: colors.bgLight,
                                marginHorizontal: 10,
                                overflow: 'hidden',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={ArtistPf}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </View>
                        <View style={{ height: 50, width: '80%' }}>
                            <Text
                                style={{
                                    fontSize: size1,
                                    width: 190,
                                    color: '#FFFFFF',
                                }}
                                numberOfLines={numberOfLines}
                            >
                                {ArtName}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: size2,
                                        maxWidth: 150,
                                        color: '#8CD1F5',
                                    }}
                                    numberOfLines={numberOfLines}
                                >
                                    By: {ArtistName}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        //backgroundColor:colors.buttons2,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 5,
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    <Ionicons
                                        name="at"
                                        size={18}
                                        color={'#8CD1F5'}
                                        style={{
                                            paddingTop: 2,
                                            padding: 2,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#8CD1F5',
                                            fontSize: 16,

                                            padding: 0,
                                            height: 28,
                                        }}
                                        numberOfLines={numberOfLines}
                                    >
                                        {ArtistHandle}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            width: '100%',
                            height: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: '100%',
                                height: '100%',
                                paddingTop: 5,
                            }}
                        >
                            <TouchableOpacity
                                style={{ flexDirection: 'row', height: 35 }}
                                activeOpacity={0.6}
                            >
                                <Ionicons
                                    name="heart-outline"
                                    size={26}
                                    color={colors.buttons}
                                    style={{ marginHorizontal: 10 }}
                                />
                                <Text
                                    style={{
                                        color: colors.text1,
                                        fontSize: 20,
                                    }}
                                >
                                    {shortenNumber(Likes)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', height: 35 }}
                                activeOpacity={0.6}
                            >
                                <Ionicons
                                    name="chatbox-ellipses-outline"
                                    size={26}
                                    color={colors.buttons}
                                    style={{ marginHorizontal: 10 }}
                                />
                                <Text
                                    style={{
                                        color: colors.text1,
                                        fontSize: 20,
                                    }}
                                >
                                    {shortenNumber(Comments)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', height: 35 }}
                                activeOpacity={0.6}
                            >
                                <Ionicons
                                    name="download-outline"
                                    size={26}
                                    color={colors.buttons}
                                    style={{ marginHorizontal: 10 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            {Price > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        borderRadius: 5,
                        padding: 5,
                        margin: 5,
                        backgroundColor: colors.bgLight,
                        top: 0,
                        overflow: 'hidden',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            padding: 5,
                            paddingHorizontal: 10,
                            backgroundColor: colors.buttons2,
                            overflow: 'hidden',
                        }}
                        activeOpacity={0.9}
                    >
                        <Text
                            style={{
                                color: colors.bgLight,
                                fontWeight: 'bold',
                            }}
                        >
                            $ {shortenNumber(Price)}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default PostedCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgLight,
        alignSelf: 'center',
        minHeight: 200,
        maxHeight: 700,
        overflow: 'hidden',
        borderTopWidth: 0.5,
        borderColor: colors.fbBlue,
    },
})
