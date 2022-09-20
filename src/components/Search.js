import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 
import NavBar from './NavBar.js';
const Search = ({ navigation }) => {
    return (
        <View style={styles.search}>
            <View style={[styles.search__searchSection]}>
                <Text style={[styles.search__searchText, styles.white]}>Search</Text>
                <View style={[styles.search__searchContainer]}>
                    <TextInput style={[styles.search_searchInput, styles.mt10]} placeholderTextColor={'#555'}  placeholder="Search here"/>
                    <Icon name="search1" size={30} color="#fff" />
                </View>
                
                <View style={styles.search__searchByGenre}>
                    <Text style={styles.white}>Search by genre</Text>
                    <View style={styles.search__genreContainer}>
                        {/* Genre goes here */}
                    </View>
                    
                </View>
            </View>
            <NavBar navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    white:{
        color: "white",
        fontWeight: "bold",
    },
    search: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "black",
        height: "100%",
        position: "relative",
    },
    search__searchSection:{
        marginTop: 100,
    },
    search__searchText: {
        fontSize: 32,
    },
    search__searchContainer:{
        width: "85%",
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#fff",
        padding: 8,
        borderRadius: 16,
    },
    search_searchInput:{
        width: "90%",
        paddingVertical: 0,
        color: "#fff"
    },
    search__searchByGenre:{
        marginTop: 50,
    }
})
export default Search