import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity  } from 'react-native';


function Genre({text}) {
    return (
        <View>
            <TouchableOpacity style={[styles.genre]}>
                <Text style={styles.genre__text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    
})
export default Genre