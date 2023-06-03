import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons'

const SearchCard = ({
    ArtistPf,
    ArtistName,
    ArtistHandle,
    numberOfLines = 1,
    size1 = 18,
    size2 = 15,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={{
                width: '100%',
                height: 'auto',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: colors.uCon,
                paddingVertical: 15,
            }}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <View
                style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.uCon,
                        width: 55,
                        height: 55,
                        overflow: 'hidden',
                        borderRadius: 50,
                    }}
                >
                    <Image
                        source={{ ArtistPf }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

                <View style={{ marginLeft: 16, height: 50 }}>
                    <Text
                        style={{
                            fontSize: size1,
                            color: colors.text1,
                            width: '73%',
                            height: 24.5,
                            fontWeight: 'bold',
                        }}
                        numberOfLines={numberOfLines}
                    >
                        {ArtistName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignContent: 'center',
                            height: 24.5,
                        }}
                    >
                        <Ionicons name="at" size={16} color={colors.text2} />
                        <Text
                            style={{
                                fontSize: size2,
                                color: colors.text2,
                                marginLeft: 0,
                                width: '40%',
                                height: 24.5,
                            }}
                            numberOfLines={numberOfLines}
                        >
                            {ArtistHandle}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchCard

const styles = StyleSheet.create({})
