import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, SafeAreaView, StatusBar } from 'react-native';
import lang from '../../lang/Language';
import AsyncStorage from '@react-native-community/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import images from '../../assets/img_paths/images';
import { TouchBtn } from '../common/common_components/index';
import { useNavigation } from 'react-navigation-hooks';
import styles from './styles/OnboardingStyle';

const screenHeight = Math.round(Dimensions.get('window').height);
const smallDeviceHeight = 667;

const slides = [
    {
        key: 1,
        title: lang.touch_for_free,
        text: lang.onboarding1_desc,
        image: images.img_onboarding1,
        backgroundColor: '#FA8732'
    },
    {
        key: 2,
        title: lang.touch_in_your_way,
        text: lang.onboarding2_desc,
        image: images.img_onboarding2,
        backgroundColor: '#FA8732'
    },
    {
        key: 3,
        title: lang.avoid_killing_me,
        text: lang.onboarding3_desc,
        image: images.img_onboarding3,
        backgroundColor: '#FA8732'
    },
    {
        key: 4,
        title: lang.make_your_voice_heard,
        text: lang.onboarding4_desc,
        image: images.img_onboarding4,
        backgroundColor: '#FA8732'
    }
];
const Onboarding = ({ navigation }) => {
    const { navigate } = useNavigation();

    useEffect(() => {
        _set();
    }, []);

    _set = async () => {
        await AsyncStorage.setItem('@isShownOnboarding', 'yes');
    }
    _renderItem = ({ item }) => {
        return (
            <SafeAreaView>
                <Image source={item.image} style={styles.img_onboarding} />
                <View style={{ marginTop: screenHeight <= smallDeviceHeight ? 15 : 100 }}>
                    <Text style={[styles.title, { marginTop: 5 }]}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </SafeAreaView>
        );
    }
    _renderSkipButton = () => {
        return (
            <Text style={styles.txt_skip}>{lang.skip}</Text>
        )
    }
    _renderNextButton = () => {
        return (
            <Text style={styles.txt_next}>{lang.next}</Text>
        )
    }
    _renderDoneButton = () => {
        return (
            <TouchBtn
                style={{
                    flex: 1
                }}
                lang={lang.lets_start}
                func={() => {
                    navigate('Login')
                }}
                styleBtn={styles.btn_lets_start}
                txtStyle={styles.txt_lets_start}
            />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
            <AppIntroSlider
                style={{ backgroundColor: '#FFFFFF' }}
                renderItem={_renderItem} data={slides}
                showSkipButton={true}
                renderSkipButton={_renderSkipButton}
                renderNextButton={_renderNextButton}
                renderDoneButton={_renderDoneButton}
                activeDotStyle={[styles.active_dot_style, { marginTop: screenHeight <= smallDeviceHeight ? 20 : null }]}
                dotStyle={[styles.dot_style, { marginTop: screenHeight <= smallDeviceHeight ? 20 : null }]}
            />
        </View>
    );
};

export { Onboarding };