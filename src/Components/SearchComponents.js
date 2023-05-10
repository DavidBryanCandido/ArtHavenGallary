import { StyleSheet, Text, TouchableWithoutFeedback, View, TextInput,TouchableOpacity, Modal, SafeAreaView, Dimensions, FlatList } from 'react-native'
import React, {useState, useRef} from 'react'
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { colors, parameters } from '../Global/styles';
import { useNavigation } from '@react-navigation/native';
import { PostedCardData } from '../Global/Data'
import PostedCard from '../Components/PostedCard'
import SearchCard from './SearchCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchComponent = ({modalVisible, setModalVisible, searchTerm, setSearchTerm,
                          modalVisible2, setModalVisible2, searchTerm2, setSearchTerm2

}) => {
 
    const texInput = useRef(0)

    const filteredData = PostedCardData.filter(item =>
        (searchTerm && (item.ArtName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                        item.ArtistName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                        item.ArtistHandle.toLowerCase().includes(searchTerm.trim().toLowerCase()))) ||
        (searchTerm2 && (item.ArtName.toLowerCase().includes(searchTerm2.trim().toLowerCase()) ||
                        item.ArtistName.toLowerCase().includes(searchTerm2.trim().toLowerCase()) ||
                        item.ArtistHandle.toLowerCase().includes(searchTerm2.trim().toLowerCase()) ||
                        item.tags.some(tag => tag.toLowerCase().includes(searchTerm2.trim().toLowerCase()))))
      );
    const navigation = useNavigation(); // Hook for accessing the navigation 
    const handlePreview = (postId) => {
        console.log("Preview clicked for postId: ", postId);
        const selectedItem = PostedCardData.find(item => item.postId === postId);
        navigation.navigate('PostDetails', { selectedItem });
    }
      
  return (
    <View>
        <TouchableWithoutFeedback onPress={()=>{setModalVisible(true)}} >
            <View style={{...styles.searchHeader, height: parameters.headerHeight + 1,}} >
                <View style={{ backgroundColor: colors.ipBG, width: '90%', height: 40, flexDirection: 'row', borderRadius: 5, overflow: 'hidden', justifyContent:'center', alignItems:'center',}}>
                    <Text style={{color: colors.buttons2, fontSize: 16, paddingLeft: 10, width: '85%',}}>Search</Text>
                        <View>
                            <Ionicons 
                                name='search'
                                size={24}
                                color={colors.buttons}
                            />  
                        </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        <Modal
            animationType='fade'
            transparent={false}
            visible={modalVisible}
            
        >
            <View style={styles.modal}>
                <View style={{...styles.searchHeader, height: parameters.headerHeight + 1,}} >
                    <View style={{ backgroundColor: colors.ipBG, width: '90%', height: 40, flexDirection: 'row', borderRadius: 5, overflow: 'hidden', justifyContent:'center', alignItems:'center',}}>
                        <View>
                            <Ionicons 
                                name='arrow-back-outline'
                                size={24}
                                color={colors.buttons}
                                onPress={()=>{
                                    setModalVisible(false)
                                    texInput.current.clear()
                                    setSearchTerm('');
                                }}
                            />  
                        </View>        
                        <TextInput 
                            placeholder="Search" 
                            placeholderTextColor={colors.buttons2} 
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)} 
                            autofocus ={false} 
                            ref={texInput}

                            style={{
                                color: colors.buttons,
                                fontSize: 16,
                                paddingLeft: 16,
                                width: '75%',
                               
                            }} 
                            
                        />
                        <View>
                            <Ionicons 
                                name='close'
                                size={26}
                                color={colors.buttons}
                                onPress={()=>{
                                    texInput.current.clear()
                                    setSearchTerm('');
                                    
                                }}
                            />  
                        </View>
                    </View>
                </View>
                <SafeAreaView
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%', paddingTop: 0, height: screenHeight - 61, }}
                >
                    {searchTerm ? (
                        <View>
                            <FlatList
                                horizontal={false}
                                style={{ width: '100%' }}
                                data={filteredData}
                                keyExtractor={item => item.postId.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <SearchCard 
                                            ArtistPf={item.ArtistPf}
                                            ArtistName={item.ArtistName}
                                            ArtistHandle={item.ArtistHandle}
                                            tags={item.tags}
                                        />
                                    </View>
                                )}
                            />                        
                        </View>
                    ) : (
                        <View style={{ alignItems:'center', }}>
                            <Text style={{ textAlign:'center', marginVertical:10,  fontSize:15, color:colors.text2, width:'80%', }}>
                                Try searching for people, topics, or keywords
                            </Text>     
                            <View style={{ height:'91.5%', width:'100%',}}>
                            
                            </View>                   
                        </View>
                    )}
                    
                </SafeAreaView>
            </View>
        </Modal>
        <Modal
            animationType='fade'
            transparent={false}
            visible={modalVisible2}
            
        >
            <View style={styles.modal}>
                <View style={{...styles.searchHeader, height: parameters.headerHeight + 1,}} >
                    <View style={{ backgroundColor: colors.ipBG, width: '90%', height: 40, flexDirection: 'row', borderRadius: 5, overflow: 'hidden', justifyContent:'center', alignItems:'center',}}>
                        <View>
                            <Ionicons 
                                name='arrow-back-outline'
                                size={24}
                                color={colors.buttons}
                                onPress={()=>{
                                    setModalVisible2(false)
                                    texInput.current.clear()
                                    setSearchTerm2('');
                                }}
                            />  
                        </View>        
                        <TextInput 
                            placeholder="Search"  
                            placeholderTextColor={colors.buttons2} 
                            value={searchTerm2}
                            onChangeText={(text) => setSearchTerm2(text)} 
                            autofocus ={false} 
                            ref={texInput}

                            style={{
                                color: colors.buttons,
                                fontSize: 16,
                                paddingLeft: 16,
                                width: '75%',
                               
                            }} 
                            
                        />
                        <View>
                            <Ionicons 
                                name='close'
                                size={26}
                                color={colors.buttons}
                                onPress={()=>{
                                    texInput.current.clear()
                                    setSearchTerm2('');
                                }}
                            />  
                        </View>
                    </View>
                </View>
                <SafeAreaView
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%', paddingTop: 0, height: screenHeight - 61, }}
                >
                    {searchTerm2 ? (
                        <View>
                            <FlatList
                                horizontal={false}
                                style={{ width: '100%' }}
                                data={filteredData}
                                keyExtractor={item => item.postId.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <PostedCard
                                            borderRadius={0}
                                            marginBottom={3}
                                            screenWidth={screenWidth*.99}
                                            PostedImage={item.PostedImage}
                                            ArtistPf={item.ArtistPf}
                                            ArtName={item.ArtName}
                                            ArtistName={item.ArtistName}
                                            ArtistHandle={item.ArtistHandle}
                                            Price={item.Price}
                                            Likes={item.Likes}
                                            Comments={item.Comments}
                                            postId={item.postId}
                                            onPress={() => handlePreview(item.postId)}
                                        />
                                    </View>
                                )}
                            />                        
                        </View>
                    ) : (
                        <View style={{ alignItems:'center', }}>
                            <Text style={{ textAlign:'center', marginVertical:10,  fontSize:15, color:colors.text2, width:'80%', }}>
                                Try searching for people, topics, or keywords
                            </Text>     
                            <View style={{ height:'91.5%', width:'100%',}}>
                            
                            </View>                   
                        </View>
                    )}
                    
                </SafeAreaView>
            </View>
        </Modal>
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
    searchHeader:{
        width:'100%', 
        borderColor:colors.buttons, 
        borderBottomWidth:1, 
        justifyContent: 'center', 
        alignItems:'center',
        marginBottom:10,
    },
    modal:{
        flex:1,
        backgroundColor:colors.bgLight,
    },
})