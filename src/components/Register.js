import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Alert  } from 'react-native';
import 'firebase/auth'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function NavBar() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        error: '',
    })


    async function signUp(){
        if(userInfo.email === '' || userInfo.password === '')
        {
            setUserInfo({
                ...userInfo,
                error: "Please enter your email address and password"
            })
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        }
        catch(error) {
            setUserInfo({
            ...userInfo,
            error: error.message,
        })
        }
    }
    
    
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.register__container}>
            <View style={styles.register}>
                <Text style={styles.register__title}>Register your account</Text>
                <TextInput 
                    onChangeText={(newEmail) => setUserInfo({...userInfo, email: newEmail})} 
                    value={userInfo.email}
                    style={[styles.register__input]} 
                    placeholderTextColor={'#555'} 
                    placeholder="Your email here"/>
                <TextInput 
                    onChangeText={(newPassword) => setUserInfo({...userInfo, password: newPassword})} 
                    value={userInfo.password}
                    style={[styles.register__input]} 
                    placeholderTextColor={'#555'}
                    placeholder="Password" 
                    />
                {/* <TextInput 
                    onChangeText={ newVerifyPassword => setVerifyPassword(newVerifyPassword)} 
                    style={[styles.register__input]} 
                    placeholderTextColor={'#555'}
                    value={verifyPassword}
                    placeholder="Verify your password" 
                    secureTextEntry/> */}
                <TouchableOpacity onPress={signUp} style={[styles.register__btnRegister]}>
                    <Text style={styles.register__btnRegisterText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
                
        
    )
}

const styles = StyleSheet.create({
    register__container:{
        height: "100%",

    },   
    register:{
        height: "100%",
        backgroundColor: "#101010",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    register__title:{
        color: "#fff",
        fontSize: 28,
        marginBottom: 36,

    },
    register__input: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#fff",
        padding: 12,
        marginVertical: 4,
        borderRadius: 24,
        color: "#fff",
    },
    register__btnRegister: {
        marginVertical: 12,
        backgroundColor: "#1ED760",
        paddingVertical: 12,
        paddingHorizontal: 64,
        borderRadius: 24,
    },
    register__btnRegisterText: {
        color: "#fff",
    }
})