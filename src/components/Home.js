import { StyleSheet, Text, View, SafeAreaView, SectionList, TextInput, Button, TouchableOpacity, FlatList  } from 'react-native';
import React from 'react'
import NavBar from './NavBar.js';
import HorizontalLists from './HorizontalLists.js';
import ListItem from './ListItem.js';

const Home = ({ navigation }) => {
    const Songs = [
        {
            title: "Made for you",            
            data: [
                {
                    id: 1,
                    name: 'meoo11',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                }, 
                {
                    id: 2,
                    name: 'meoo22',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                },
                {
                    id: 3,
                    name: 'meoo22111111111111111111111111111111111111111111111111111',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                }
            ],          
            
        },
        {
            title: "Not made for you",            
            data: [
                {
                    id: 1,
                    name: 'meoo11',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                }, 
                {
                    id: 2,
                    name: 'meoo22',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                },
                {
                    id: 3,
                    name: 'meoo22111111111111111',
                    imageURL: 'https://dummyimage.com/400x400/ccc/fff',
                }
            ]
        },
        
        
        
    ];
    const renderItem = ({item}) => {
        return (
                <ListItem item={item} />
        )
    }
    return (
        <View style={styles.home}>
            <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    stickySectionHeadersEnabled={false}
                    sections={Songs}
                    keyExtractor={item => item.id}
                    renderItem={({ item, section }) => {
                        return null;
                    }}
                    renderSectionHeader={({ section, item }) => (
                        <>
                            <Text style={styles.home__sectionHeader}>{section.title}</Text>
                                <FlatList
                                horizontal
                                data={section.data}
                                renderItem={renderItem}
                                showsHorizontalScrollIndicator={false}
                                />
                        </>
                    )}
                />
            </SafeAreaView>
            <NavBar navigation={navigation}/>
                
        </View>
        
        
    )
}

export default Home
const styles = StyleSheet.create({
    home: {       
        alignItems: 'center',
        height: "100%",
        backgroundColor: "#101010",
        paddingTop: "10%",
    },
    home__contents: {
        
    },
    home__sectionHeader:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    }

})