import { StyleSheet, Text, View, Image,  } from 'react-native'
import React from 'react'
import { colors, parameters } from '../Global/styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({
    title,
    menuOrBack,
    logo,      
    post,
    navigation,
    onMenuPress,
    onPostPress,
    fontSize = 18,
}) => 

{
    return (
        <View style={{ ...styles.container, }}>
            <LinearGradient 
                style={styles.header} 
                colors={['rgba(13, 44, 81, 9)', 'rgba(9, 31, 61, 1)']}
            >
                    <Text style = {{ ...styles.headerText, fontSize: fontSize, fontWeight: 'bold',}} > {title} </Text>
                <View style={{ ...styles.innerHeader,}}>
                    <MaterialCommunityIcons 
                        name={menuOrBack}
                        size={40}
                        color={colors.buttons}
                        style={{
                            left:16,
                        }}
                        onPress={onMenuPress}
                    />
                    <View 
                        style={{ 
                            height: '100%', 
                            alignItems:'center', 
                            justifyContent:'center', 
                            marginRight:0,
                        }}>
                            <Image 
                                source={logo} 
                                style={{ 
                                    height: 35,
                                    width:110,
                                }}
                            />                    
                    </View>
                    <MaterialCommunityIcons 
                        name={post}
                        size={35}
                        color={colors.buttons}
                        style={{
                            right:16,
                            
                        }}
                        onPress={onPostPress}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor: colors.ipBG,
        height: parameters.headerHeight + 1,
        width:'100%',
        borderColor:colors.buttons2,
        borderBottomWidth:3,
    },
    header:{
        flexDirection:'row',
        height: parameters.headerHeight,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    innerHeader:{
        flexDirection:'row',
        width: '100%', 
        height:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    headerText:{
        color: colors.text1,
        //backgroundColor:'red',
        textAlign:'center',
        marginLeft:'23%',
        width:150,
        position:'absolute',
      },
})