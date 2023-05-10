import { StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/styles'
import SearchComponent from '../Components/SearchComponents';
import FilterBtn from '../Components/FilterBtn';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible2, setModalVisible2] = useState(false);
    const [searchTerm2, setSearchTerm2] = useState('');
    return (
        <View style={{ ...styles.container, flex: 1}}>
            <SearchComponent 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}

                modalVisible2={modalVisible2}
                setModalVisible2={setModalVisible2}
                searchTerm2={searchTerm2}
                setSearchTerm2={setSearchTerm2}
            />
            <View contentContainerStyle={styles.container2} >
                <ScrollView contentContainerStyle={styles.grid}>
                    <FilterBtn 
                    image={require('../../assets/digital.jpg')} 
                    title='Digital Art' 
                    screenWidth={165} 
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Digital Art');
                    }}
                    />
                    <FilterBtn 
                    image={require('../../assets/traditional.jpg')} 
                    title='Traditional Art' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Traditional Art'); 
                    }}
                    />
                    <FilterBtn 
                    image={require('../Img/PostedImage/Penguin.jpg')} 
                    title='Animals' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Animal');
                    }}
                    />
                    <FilterBtn 
                    image={require('../../assets/AI.jpg')} 
                    title='A.I' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('A.I');
                    }}
                    />   
                    <FilterBtn 
                    image={require('../../assets/portrait.jpg')} 
                    title='Portrait' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Portrait');
                    }}
                    />
                    <FilterBtn 
                    image={require('../../assets/landscape.jpg')} 
                    title='Landscape'  
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Landscape');
                    }}
                    />
                    <FilterBtn 
                    image={require('../../assets/nature.jpg')} 
                    title='Nature' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Nature');
                    }}
                    />
                    <FilterBtn 
                    image={require('../../assets/fantasy.jpg')} 
                    title='Fantasy' 
                    screenWidth={165}
                    onPress={() => {
                        setModalVisible2(true);
                        setSearchTerm2('Fantasy');
                    }}
                    />

                </ScrollView>
            </View>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgLight,
    },
    searchHeader:{
        width:'100%', 
        borderColor:colors.buttons, 
        borderBottomWidth:1, 
        justifyContent: 'center', 
        alignItems:'center',
        marginBottom:10,
    },
    container2: {
      flex: 1, 
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      overflow:'hidden',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: screenWidth,
      justifyContent: 'space-evenly',
      overflow:'hidden',
      paddingBottom:65,
    },
})