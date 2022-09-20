import React from 'react';
import { StyleSheet, View, Image, Text } from "react-native";


const PlayList = (props) => {
    return( 
    <View style={styles.container}>
        <Image style={styles.image} source={{uri:props.playList.imageURL}}/>
        <View style={styles.PlayList__texts}>
            <Text style={styles.header}>{props.playList.name}</Text>
            <Text style={styles.text}>By {props.playList.author}</Text>
        </View>
    </View>);
   
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        margin: 15,
        flexDirection: 'row',
    },

    image: {
        width: 140,
        height: 140
    },

    header: {

        fontSize: 24,
        color: 'white',
        marginTop: '10px',
    },

    text: {
        fontSize: 18,
        color: '#777',
        marginTop: '5px',


    },
    PlayList__texts:{
        marginLeft: 12,
    }
})

export default PlayList;