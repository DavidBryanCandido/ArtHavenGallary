import { StyleSheet, Text, View, Linking, Pressable, Alert, Switch,TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Button, Icon } from 'react-native-elements'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = (props) => {
    const navigation = useNavigation(); // Hook for accessing the navigation object

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={{ ...styles.UserCon}}>
                    <TouchableOpacity style={{ flexDirection:'row', marginLeft:20,}} activeOpacity={.9}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={60}
                            source = {require('../Img/UserImg/skull_fp.png')}
                        />
                        <View style={{ width: 175,height:55, alignContent:'center',justifyContent:'center', marginLeft:10,}}>
                            <Text style={{ fontSize: 15, color:colors.text2, }}>Signed in as</Text>  
                            <Text style={{ fontSize: 18, color:colors.text1, fontWeight:'900',}} >DaVoidC</Text>  
                        </View>                
                    </TouchableOpacity>

                    <View style={{ ...styles.bellowCon}} >
                        <TouchableOpacity style={{ flexDirection:'row', }} activeOpacity={.7}>
                            <Text style={{ color:colors.text1, marginRight:5, fontWeight:'bold',fontSize: 16,}} >1</Text>
                            <Text style={{ color: colors.text2,fontSize: 16,}} >Following</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection:'row', }} activeOpacity={.7}>
                            <Text style={{ color:colors.text1, marginRight:5, fontWeight:'bold',fontSize: 16,}} >0</Text>            
                            <Text style={{ color: colors.text2,fontSize: 16, }} >Follower</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <View style={{ width:'100%', height:'auto',  borderTopWidth:1, borderTopColor: 'rgba(66, 103, 178, .1)' ,}}>
                    <View style={{ marginLeft:20, paddingVertical:5, }}>
                        <View>
                            <Text style={{ fontSize:18, color:colors.text2, marginBottom:5,}} >Preferences</Text>
                        </View>
                        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between',}} >
                            <Text style={{ fontSize:17, color:colors.text2, fontWeight:'bold',}} >Dark Theme</Text>
                            <View style={{ marginRight:10, }}>
                                <Switch 
                                    trackColor={{ false: colors.buttons, true: colors.buttons2 }}
                                    thumbColor={colors.buttons3}
                                />
                            </View>
                            
                        </View>
                        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', }} >
                            <Text style={{ fontSize:17, color:colors.text2, fontWeight:'bold',}} >Safe Mode</Text>
                            <View style={{ marginRight:10, }}>
                                <Switch 
                                    trackColor={{ false: colors.buttons, true: colors.buttons2 }}
                                    thumbColor={colors.buttons3}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
            <DrawerItem
                label="Sign Out"
                labelStyle={{ color:colors.text2, fontSize:16,}}
                onPress={() => {
                    props.navigation.navigate('SignInWelcomeScreen')
                    props.navigation.toggleDrawer();
                }}
                icon={({ size }) =>(
                    <Ionicons 
                        name='log-out-outline'
                        color={colors.text2}
                        size={size = 30}
                     
                    />
                )}
            />
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    UserCon:{
        backgroundColor:'rgba(9, 31, 61, .5)', 
        paddingVertical:10, 
        marginBottom:16,
    },
    bellowCon:{
        flexDirection:'row', 
        justifyContent:'space-evenly',  
        width: '100%',  
        marginTop:10,
    },
})