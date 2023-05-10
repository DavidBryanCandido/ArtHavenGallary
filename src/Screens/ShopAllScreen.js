import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'

const ShopAllScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>

            </ScrollView>
        </View>
    )
}

export default ShopAllScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgLight,
        justifyContent: 'center',
      },
})