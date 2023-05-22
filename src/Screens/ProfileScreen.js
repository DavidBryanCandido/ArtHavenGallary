import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { Avatar } from 'react-native-elements'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons'
import Header from '../Components/Header'

const { width: screenWidth } = Dimensions.get('window')

const ProfileScreen = ({
    // userbanner,
    // useravatar,
    ArtistName = 'iasudgasgdiagdiagdgaduagdgaidakdgiaudiaudiudiuadiudiuagdiusiadag',
    ArtistHandle = 'skuasdasdoajsdhkaljsdhkahdkabhkdkdbkll',
    numberOfLines = 1,
    navigation,
}) => {
    // const addTodo = async () => {
    //     const doc = addDoc(collection(FIRESTORE_DB, 'todos'), {
    //         title: 'I am a test',
    //         done: false,
    //     })
    //     console.log('working?', doc)
    // }
    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    return (
        <View style={{ ...styles.container }}>
            <View style={styles.topCon}>
                <Image
                    style={styles.banner}
                    source={require('../Img/UserImg/default-banner.jpg')}
                />
                <View
                    style={{
                        borderWidth: 4,
                        borderColor: colors.uCon,
                        width: 80,
                        height: 80,
                        backgroundColor: colors.hBG,
                        borderRadius: 5,
                        overflow: 'hidden',
                        position: 'absolute',
                        marginTop: 90,
                        marginLeft: 16,
                    }}
                >
                    <Image
                        style={styles.avatar}
                        source={require('../Img/UserImg/default-user.png')}
                    />
                </View>
                <View style={{ position: 'absolute', bottom: 8, right: 16 }}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: colors.buttons,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.text1,
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}
                        >
                            Edith Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    padding: 16,
                    paddingLeft: 16,
                    paddingTop: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        color: colors.text1,
                        fontWeight: 'bold',
                    }}
                >
                    User Name
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="at-outline"
                        size={19}
                        color={colors.text2}
                        onPress={() => {
                            navigation.toggleDrawer()
                        }}
                        style={{
                            marginRight: 1,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.text2,
                        }}
                    >
                        User Handle
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: 300,
        height: 400,
        backgroundColor: colors.bgLight,
    },
    topCon: {
        height: 200,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'red',
    },
    banner: {
        width: '100%',
        height: 150,
    },
    avatar: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: -8,
        left: -8,
    },
})
