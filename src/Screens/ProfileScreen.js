import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { Avatar } from 'react-native-elements'

const ProfileScreen = ({
    banner = require('../Img/UserImg/defaultbanner.png'),
    avatar = require('../Img/UserImg/skull_fp.png'),
}) => {
    return (
        <View style={{ ...styles.container }}>
            <View>
                <ImageBackground
                    source={banner}
                    style={{ ...styles.banner }}
                    resizeMode="cover"
                >
                    <View style={{ ...styles.avatarContainer }}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={80}
                            source={avatar}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 330,
        backgroundColor: colors.bgLight,
    },
    banner: {
        height: 160,
        width: '100%',
        backgroundColor: 'red',
    },
    avatarContainer: {
        position: 'absolute',
        // width: '100%',
        // height: '100%',
        marginTop: 115,
        marginLeft: 20,
        padding: 2,
        borderRadius: 50,
        backgroundColor: colors.bgLight,
    },
})
