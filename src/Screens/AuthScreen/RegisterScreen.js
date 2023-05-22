import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native'
import React, { useState, useRef } from 'react'
import { colors, title, parameters } from '../../Global/styles'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import PasswordTextInput from '../../Components/PasswordTextInput'
import SignInAlternative from '../../Components/SignInAlternative'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const RegisterScreen = ({ navigation }) => {
    const confirmRef = useRef(null)

    const onMenuPress = () => {
        navigation.goBack()
    }

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const generateUserHandle = (username) => {
        // Check if the username is already in use, if yes, generate a unique handle
        // You can implement your own logic to generate a unique handle
        // For simplicity, we'll append a number to the username
        let handle = username
        let handleExists = false
        let count = 1

        while (handleExists) {
            handle = `${username}${count}`
            // Check if the handle exists in the database or your user records
            // Set handleExists to true if the handle exists
            // You can implement your own logic to check handle existence
            handleExists = checkHandleExists(handle)
            count++
        }

        return handle
    }

    const handleSignUp = () => {
        // Generate the user handle
        const userHandle = generateUserHandle(username)

        // Create the user object with the required fields
        const user = {
            fullName,
            username,
            email,
            userHandle,
        }

        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user
                console.log('User signed up:', user)

                // Store user data in Firestore
                addUserToFirestore(
                    user.uid,
                    userHandle,
                    user.email,
                    user.displayName
                )

                navigation.navigate('SignInScreen')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert(errorMessage)

                // Handle the error here
            })
    }

    const addUserToFirestore = async (
        userId,
        userHandle,
        email,
        displayName
    ) => {
        try {
            const usersCollectionRef = collection(FIRESTORE_DB, 'users')
            await addDoc(usersCollectionRef, {
                userId,
                fullName,
                username,
                userHandle,
                email,
                displayName,
            })
            console.log('User added to Firestore')
        } catch (error) {
            console.error('Error adding user to Firestore:', error)
        }
    }

    return (
        <ScrollView style={{ ...styles.container }}>
            <Header
                menuOrBack={'arrow-left'}
                title={'MY ACCOUNT'}
                onMenuPress={onMenuPress}
                //post={'duplicate-outline'}
                //logo={require('../../../assets/ArtHaven_logo.png')}
                //menu={'menu-outline'}
            />
            <View style={{ marginLeft: 16, marginVertical: 16, width: '90%' }}>
                <Text style={title}>Sign Up</Text>
            </View>
            <View>
                <Input
                    placeholder={'Full Name'}
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Input
                    placeholder={'Username'}
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    placeholder={'Email'}
                    value={email}
                    onChangeText={setEmail}
                />
                <PasswordTextInput
                    placeholder={'Password'}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Confirm Password'}
                        placeholderTextColor={colors.text2}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        style={styles.input}
                        ref={confirmRef}
                        // onSubmitEditing={Rea}
                    />
                </View>

                <View style={{ ...styles.btnStyle }}>
                    <TouchableOpacity
                        style={parameters.styledButton}
                        //onPress={() => {navigation.navigate('SignInScreen')}}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (password === confirmPassword) {
                                handleSignUp()
                            } else {
                                alert('Passwords do not match.')
                                confirmRef.current.clear() // clear the confirm password input
                            }
                        }}
                    >
                        <Text
                            style={{
                                ...parameters.buttonTitle2,
                                textTransform: 'capitalize',
                            }}
                        >
                            CREATE MY ACCOUNT
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignSelf: 'center' }}>
                    <Text
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 280,
                            textAlign: 'center',
                            alignSelf: 'center',
                        }}
                    >
                        <Text style={styles.termandconditions}>
                            By creating or logging into an account you are
                            agreeing with our
                        </Text>
                        <Text style={styles.textStyle}>
                            {' '}
                            Terms &amp; Conditions{' '}
                        </Text>
                        <Text style={styles.termandconditions}>and</Text>
                        <Text style={styles.textStyle}>
                            {' '}
                            Privacy Statement{' '}
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={{ ...styles.orCon }}>
                <View style={{ ...styles.leftline }}></View>
                <Text style={{ ...styles.or }}>Or</Text>
                <View style={{ ...styles.rightline }}></View>
            </View>
            {Platform.OS === 'android' ? (
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SignInAlternative
                        name={'facebook'}
                        title={'Sign In with Facebook'}
                        bg={(backgroundColor = colors.fbBlue)}
                        //onPress={navigation.navigate('BottomNavigator')}
                    />
                    <SignInAlternative
                        name={'google'}
                        title={'Sign In with Google'}
                        bg={(backgroundColor = colors.google)}
                    />
                </View>
            ) : null}
            <View
                style={{
                    // flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                    width: '100%',
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        navigation.navigate('SignInScreen')
                    }}
                    style={{
                        flexDirection: 'row',
                        width: 300,
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: colors.text2,
                            fontSize: 15,
                            marginRight: 5,
                            textAlign: 'center',
                        }}
                    >
                        Already have an account with ArtHaven ?{' '}
                        <Text
                            style={{
                                color: colors.buttons2,
                                fontSize: 15,
                                textDecorationLine: 'underline',
                            }}
                        >
                            Sign In
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
        // alignItems: 'center',
    },
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        marginHorizontal: 20,
    },
    forgotpass: {
        textAlign: 'center',
        color: colors.text2,
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    orCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
        marginHorizontal: 20,
    },
    leftline: {
        height: 1,
        width: '40%',
        backgroundColor: colors.ipBG2,
    },
    or: {
        marginLeft: 10,
        marginRight: 10,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    rightline: {
        height: 1,
        width: '40%',
        backgroundColor: colors.ipBG2,
    },
    termandconditions: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 0,
        color: colors.text1,
    },
    textStyle: {
        fontSize: 15,
        color: colors.buttons2,
    },
    inputContainer: {
        backgroundColor: colors.ipBG2,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 16,
        color: colors.buttons,
        width: 320,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 0,
        color: colors.buttons,
        fontSize: 16,
        paddingLeft: 0,
        paddingHorizontal: 16,
    },
})
