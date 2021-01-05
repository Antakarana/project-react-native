import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'
import { useNavigation } from 'react-navigation-hooks';

const Start = ({ navigation }) => {
    const { navigate } = useNavigation();
    const [token, setToken] = useState("");

    _getToken = async () => {
        const tokenValue = await AsyncStorage.getItem('@token');
        await setToken(tokenValue);
        _navigate();
    }
    _navigate = async () => {
        const isShownOnboarding = await AsyncStorage.getItem('@isShownOnboarding');
        if (isShownOnboarding != 'yes') navigate("Onboarding");
        else if (token) navigate("Dashboard");
        else navigate("Login");
    }
    useEffect(() => {
        _getToken();
        SplashScreen.hide();
    }, []);
    return (
        <StatusBar hidden />
    )
}
export { Start };