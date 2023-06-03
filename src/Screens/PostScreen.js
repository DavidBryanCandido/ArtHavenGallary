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
// import { format } from 'date-fns' // Import the format function

import {
    FIRESTORE_DB,
    FIREBASE_APP,
    FIREBASE_AUTH,
    FIREBASE_STORAGE,
} from '../../firebaseConfig'
import Input from '../Components/Input'
import { encode, decode } from 'base-64'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadString } from 'firebase/storage'
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'

const PostScreen = ({ navigation, PostedImage }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedButton, setSelectedButton] = useState(null)
    const [price, setPrice] = useState('')
    const [artName, setArtName] = useState('')
    const [postId, setPostId] = useState(1)

    const handleImageSelection = async () => {
        try {
            // Request permission to access media library
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                console.log('Permission denied for accessing media library')
                return
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if (!result.canceled) {
                // Create a reference to the Firebase Storage bucket
                const storageRef = ref(
                    getStorage(FIREBASE_APP),
                    `images/${result.assets[0].uri.split('/').pop()}`
                )

                // Get the image URI and convert it to a data URL format
                const dataUrl = `data:${result.assets[0].type};base64,${result.assets[0].base64}`
                if (!global.btoa) {
                    global.btoa = encode
                }

                if (!global.atob) {
                    global.atob = decode
                }

                // Upload the image to Firebase Storage
                await uploadString(storageRef, dataUrl, 'data_url')

                setSelectedImage(result.assets[0].uri)
            }
        } catch (error) {
            console.log('Error while accessing media library:', error)
        }
    }
    const handleUploadImage = async () => {
        try {
            const collectionRef = collection(FIRESTORE_DB, 'art')

            // Generate a new postId using a timestamp
            const newPostId = Date.now().toString()

            const docRef = await addDoc(collectionRef, {
                postId: newPostId,
                image: selectedImage,
                button: selectedButton,
                price: selectedButton === 'premium' ? price : null,
                artName: artName,
                userId: getAuth().currentUser.uid,
            })

            setSelectedImage(null)
            setSelectedButton(null)
            setPrice('')
            setArtName('')
        } catch (error) {
            console.log('Error while uploading art:', error)
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
                    <Input
                        placeholder={'Price'}
                        value={price}
                        onChangeText={setPrice}
                    />
                )}
                <Input
                    placeholder={'Art Name'}
                    value={artName}
                    onChangeText={setArtName}
                />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ ...styles.btn, width: 320 }}
                    onPress={handleUploadImage}
                >
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
