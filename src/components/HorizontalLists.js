import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList  } from 'react-native';
import React from 'react'
import ListItem from './ListItem.js'




const renderItem = ({item}) => (
    <ImageContainer title={item.title} imageURL={item.imageURL}/>
)
const HorizontalLists = ({horizontalListsTitle}, data) => {
    return (
        <View style={styles.horizontalLists}>
            <Text style={styles.horizontalLists__title}>{horizontalListsTitle}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor = {item => item.id}
            />           
        </View>
    )
}

export default HorizontalLists

const styles = StyleSheet.create({
    horizontalLists: {
        justifyContent: "center",
        height: "32%",
        backgroundColor: "#ccc"
    },
    horizontalLists__title: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "600",
        paddingLeft: 18,
    },
    horizontalLists__imageContainer:{
        height: 60,
    },
    horizontalLists__image: {
        width: 160,
        height: 160,
        marginLeft: 32,
        marginTop: 10,
    }
})