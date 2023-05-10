import { StyleSheet, Text, View,ImageBackground, TextInput  } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { Ionicons } from '@expo/vector-icons';

const ShopScreen = ({searchQuery, setSearchQuery}) => {
    return (
        <View>
            <ImageBackground 
                source={require('../../assets/tree.png')} 
                style={{
                    width:'100%', 
                    height:200,
                }} 
                blurRadius={15}
            >
                <View 
                    style={{  
                        justifyContent:'center', 
                        alignItems:'center', 
                        height:'100%', 
                        width:'100%', 
                    }}
                >
                    <View style={styles.blurShopContainer}>
                        <Text style={styles.blurShopText}>Shop for art from creator you like </Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <View 
                            style={{ 
                                backgroundColor: colors.ipBG, 
                                width: '90%', 
                                height: 40, 
                                flexDirection: 'row', 
                                borderRadius: 5, 
                                overflow: 'hidden', 
                                justifyContent:'center',
                                alignItems:'center', 
                                marginVertical:16,
                            }}>        
                            <TextInput 
                                placeholder="Search.  Tags, Artist  etc. " 
                                placeholderTextColor={colors.buttons2} 
                                style={{
                                    color: colors.buttons,
                                    fontSize: 16,
                                    width: '70%',
                                }} 
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                    
                            <View 
                                style={{
                                    backgroundColor:colors.buttons3, 
                                    marginLeft:16, 
                                    height:'100%',
                                    width:'15%',
                                    justifyContent:'center', 
                                    alignItems:'center', 
                                }}
                            >
                                <Ionicons 
                                    name='search'
                                    size={26}
                                    color={colors.buttons}
                                    onPress={setSearchQuery}
                                />  
                            </View>
                        </View>
                    </View>                
                </View>
            </ImageBackground>
        </View>
    )
}

export default ShopScreen

const styles = StyleSheet.create({
    blurShopContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:250,
      },
      blurShopText:{
        color:colors.text1,

        textAlign:'center',
        fontSize:32,
      },

})