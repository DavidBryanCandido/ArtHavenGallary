import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useRef } from 'react'
import { colors } from '../Global/styles'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { FIRESTORE_DB, FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import Input from '../Components/Input'

const PostScreen = ({ navigation, PostedImage }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedButton, setSelectedButton] = useState(null)

    const handleImageSelection = async () => {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                console.log('Permission denied for accessing media library')
                return
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri)
            }
        } catch (error) {
            console.log('Error while accessing media library:', error)
        }
    }

    const handleButtonSelection = (button) => {
        setSelectedButton(button)
    }
    return (
        <ScrollView style={{ ...styles.container }}>
            <View style={styles.showView}>
                <Ionicons
                    name="chevron-back-outline"
                    size={35}
                    color={colors.buttons}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                <Image
                    source={require('../../assets/ArtHaven_logo.png')}
                    style={{
                        height: 35,
                        width: 110,
                        marginLeft: -16,
                        // alignSelf: 'center',
                    }}
                />
                <View></View>
            </View>

            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                }}
            >
                <View
                    style={{
                        width: '90%',
                        marginHorizontal: 20,
                        backgroundColor: colors.text2,
                        minHeight: 300,
                        borderWidth: 3,
                        borderColor: 'grey',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ width: '100%', minHeight: 250 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.buttons,
                                padding: 10,
                                paddingHorizontal: 16,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.bgLight,
                            }}
                            onPress={handleImageSelection}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={{
                                    color: colors.bgLight,
                                    fontWeight: 'bold',
                                }}
                            >
                                Select Image
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{ marginBottom: 16 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                        marginTop: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            ...styles.btn,
                            backgroundColor:
                                selectedButton === 'free'
                                    ? colors.buttons2
                                    : 'transparent',
                            borderWidth: selectedButton == 'free' ? 0 : 1,
                        }}
                        onPress={() => handleButtonSelection('free')}
                    >
                        <Text
                            style={{
                                ...styles.btnText,
                                color:
                                    selectedButton == 'premium'
                                        ? colors.ipBG2
                                        : colors.text1,
                            }}
                        >
                            Free
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...styles.btn,
                            backgroundColor:
                                selectedButton === 'premium'
                                    ? colors.buttons2
                                    : 'transparent',
                            borderWidth: selectedButton == 'premium' ? 0 : 1,
                        }}
                        onPress={() => handleButtonSelection('premium')}
                    >
                        <Text
                            style={{
                                ...styles.btnText,
                                color:
                                    selectedButton == 'free'
                                        ? colors.ipBG2
                                        : colors.text1,
                            }}
                        >
                            Premium
                        </Text>
                    </TouchableOpacity>
                </View>
                {selectedButton === 'premium' && (
                    <Input placeholder={'Price'} />
                )}
                <Input placeholder={'Art Name'} />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={{ ...styles.btn, width: 320 }}>
                    <Text style={styles.btnText}>Post Art</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
    },
    showView: {
        // position: 'absolute',
        // top: 0,
        backgroundColor: colors.hBG,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.buttons,
    },
    btn: {
        backgroundColor: colors.buttons2,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 140,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
})
