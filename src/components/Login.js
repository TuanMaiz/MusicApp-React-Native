import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity  } from 'react-native';
function Login({ navigation}) {
    return (
        <View style={styles.login}>
            <Text style={[styles.login__text]}>Login with your account</Text>
            <TextInput style={[styles.login__input, styles.mt10]} placeholderTextColor={'#555'}  placeholder="username"/>
            <TextInput style={[styles.login__input , styles.mt10]} placeholderTextColor={'#555'}   placeholder="password"/>
            <TouchableOpacity style={[styles.login__btn ,styles.login__signIn, styles.mt10]}>
                <Text style={styles.login__text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.login__btn, styles.login__register]} onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.login__text, styles.underline]}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mt10: {
        marginTop: 10,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    login: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "black"
    },
    login__input: {
        width: "90%",
        paddingVertical: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 15,
        color: "white"
    },
    login__btn: {
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 15,
        width: "90%",
        display: "flex",
        alignItems: "center",
        paddingVertical: 12
    },
    login__signIn: {
        backgroundColor: '#1ED760',      
    },
    login__text: {
        color: '#fff',       
    },
    login__register: {        
            
    }
})
export default Login