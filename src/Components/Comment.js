import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Button  } from 'react-native';
import { colors } from '../Global/styles';
import Header from './Header';
import AutoHeightImage from 'react-native-auto-height-image';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window'); // Get the width of the screen

const Comment = ({ 
    route, 
    navigation, 
    numberOfLines = 1, 
    size1 = 22, 
    size2 = 18, 
}) => 

{   
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const onMenuPress = () => {
        navigation.goBack()
        onPress={toggleModal}
    }
    function shortenNumber(num) {
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1) + 't';
            } else if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'b';
            } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm';
            } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
            } else {
            return num.toString();
            }
        }
    const [showAllTags, setShowAllTags] = useState(false);
    const maxTagsToShow = 5;

    const { selectedItem } = route.params;
    // Use the selectedItem data to render the preview screen
    return (
        <ScrollView contentContainerStyle={{ ...styles.container }}>
            <Header 
                menuOrBack={'chevron-left'}
                onMenuPress={onMenuPress}
            />
            <TouchableOpacity style={{ ...styles.imgCon, }} onPress={toggleModal}>
                <AutoHeightImage 
                    source={selectedItem.PostedImage}  
                    width={screenWidth*.99}
                />            
            </TouchableOpacity>
            <View style={{ width:'100%', height: 40, flexDirection:'row', justifyContent:'center', }}>
                <View style={{ justifyContent:'flex-start', alignItems:'center', flexDirection:'row', width:'100%', height:'100%',paddingTop:5, marginLeft:16,}} >
                    <TouchableOpacity style={{ flexDirection:'row', height:35, marginRight:10,}}  activeOpacity={.6}  >
                        <Ionicons 
                            name='heart-outline'
                            size={26}
                            color={colors.buttons}
                            style={{marginHorizontal:10,}}
                        />
                        <Text style={{ color:colors.text1, fontSize:20, }} >{shortenNumber(selectedItem.Likes)}</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity style={{ flexDirection:'row', height:35, marginRight:10,}}  activeOpacity={.6}  >
                        <Ionicons 
                            name='chatbox-ellipses-outline'
                            size={26}
                            color={colors.buttons}
                            style={{marginHorizontal:10,}}
                        />
                        <Text style={{ color:colors.text1, fontSize:20, }}>{shortenNumber(selectedItem.Comments)}</Text>                            
                    </TouchableOpacity>
                    {selectedItem.Price <= 0 ?
                        <TouchableOpacity style={{ flexDirection:'row', height:35, marginRight:10,}}  activeOpacity={.6}  >
                            <Ionicons 
                                name='download-outline'
                                size={26}
                                color={colors.buttons}
                                style={{marginHorizontal:10,}}
                            />
                        </TouchableOpacity>  
                    : null} 
                </View>
            </View>
            <TouchableOpacity 
                style={{ 
                    flexDirection:'row',  
                    height:80, 
                    alignItems:'center', 
                    // borderBottomColor: colors.text2,
                    // borderBottomWidth:1,
                    // justifyContent:'center',
                    // alignSelf:'center',
                    // width:'95%',
                }} 
                activeOpacity={.7} 
            >
                <View 
                    style={{ 
                        height:55, 
                        width:55, 
                        backgroundColor:colors.uCon, 
                        borderRadius:10, 
                        overflow:'hidden', 
                        borderWidth:1, 
                        borderColor:colors.bgLight,
                        marginHorizontal:10, 
                        overflow:'hidden', 
                        alignItems:'center',
                    }}
                >
                    <Image 
                        source={selectedItem.ArtistPf} 
                        style={{ 
                            height:'100%', 
                            width: '100%',
                        }}  
                    />
                </View>
                <View style={{ height:50, width:275, }} >
                    <Text style={{  fontSize: size1, width: '90%', color: '#FFFFFF', }} numberOfLines={numberOfLines} >{selectedItem.ArtName}</Text>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{ fontSize: size2, width: '70%', color: '#8CD1F5', }} numberOfLines={numberOfLines}>By: {selectedItem.ArtistName}</Text>
                    </View>
                </View>                    
            </TouchableOpacity>
            
            {selectedItem.Price > 0 ? 
                <TouchableOpacity 
                    style={{ 
                        flexDirection:'row', 
                        backgroundColor:colors.buttons2, 
                        paddingHorizontal:10, 
                        width:280, 
                        paddingVertical:10,
                        borderRadius:50, 
                        justifyContent:'center',
                        alignSelf:'center',
                        marginVertical:16,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight:'bold',}}>Download for </Text>
                    <Text style={{ fontSize: 16, fontWeight:'bold', }}>
                        ${selectedItem.Price}
                    </Text>
                </TouchableOpacity> 
            : null}
            <View 
                style={{ 
                    width:290, 
                    height:2,
                    backgroundColor:colors.text2, 
                    alignSelf:'center',
                    marginBottom:16,
                }}>
            </View>
            <View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 300, marginHorizontal: 16 }}>
                    {selectedItem.tags.slice(0, showAllTags ? selectedItem.tags.length : maxTagsToShow).map((tag, index) => (
                    <Text key={index} style={{ ...styles.tags }}>
                        {tag}
                    </Text>
                    ))}

                    
                </View>
                {!showAllTags && selectedItem.tags.length > maxTagsToShow && (
                    <TouchableOpacity onPress={() => setShowAllTags(true)} style={{...styles.showMore, }}>
                        <Text style={{ ...styles.textshow }}>Show {selectedItem.tags.length - maxTagsToShow} more tags</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            
            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={{ backgroundColor: colors.bgLight , flexGrow:1,}}>
                    <Header 
                        menuOrBack={'chevron-left'}
                        onMenuPress={onMenuPress}
                    />
                    <View  style={{ ...styles.imgCon2, }} >
                        <AutoHeightImage 
                            source={selectedItem.PostedImage}  
                            width={screenWidth*.99}
                        />    
                        <Ionicons 
                            name='close'
                            size={40}
                            onPress={toggleModal}
                            style={{
                                backgroundColor:colors.buttons3,
                                color:colors.buttons,
                                padding:5,
                                paddingLeft:14,
                                paddingTop:14,
                                borderWidth:5,
                                borderColor:colors.bgLight,
                                borderRadius:50,
                                position:'absolute',
                                bottom:-40,
                            }}
                        />
                    </View>                
                </ScrollView>

            </Modal>
        </ScrollView>
    );
}

export default Comment;


const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        backgroundColor:colors.bgLight,
    },
    imgCon:{
        height:300,
        width:'100%',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:3,
    },
    imgCon2:{
        width:'100%',
        // height:'100%',
        //overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:3,
        
    },
    tags:{
        padding:5, 
        paddingHorizontal:10, 
        margin:5, 
        backgroundColor:colors.hBG, 
        borderRadius:5, 
        fontSize:16, 
        color:colors.buttons, 
        borderWidth:1, 
        borderColor:colors.text2,
    },
    showMore:{
        alignSelf:'center',  
        marginVertical:10,
        backgroundColor:colors.hBG,
        paddingHorizontal:10,
        padding:5,
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.buttons,
    },
    textshow:{
        fontSize:14,
        color:colors.buttons2,
    },
})