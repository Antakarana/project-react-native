import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, StatusBar, Text, Dimensions, Image, BackHandler } from 'react-native';
import lang from '../../lang/Language';
import { Indicator, TouchBtn } from '../common/common_components/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { ServiceConnection_Reviews } from '../../config/api/index';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles/SendReviewStyle';
import { StackActions, NavigationActions } from 'react-navigation';

const screenWidth = Math.round(Dimensions.get('window').width);

const _animatedStyles = (index, animatedValue) => {
    return {
        opacity: animatedValue.interpolate({
            inputRange: [0.9, 1.1],
            outputRange: [0.7, 0.8]
        })
    }
}
const SendReview = ({ navigation }) => {
    const [showIndicator, setShowIndicator] = useState(true);
    const [review, setReview] = useState('');
    const ratingNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [activeSlide, setActiveSlide] = useState(0);
    const { navigate } = useNavigation();
    const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo);
    const reviewData = useNavigationParam('reviewData');

    const backAction = () => {
        return true;
    };

    useEffect(() => {
        navigation.setParams({
            title: companyInfoData.companyName
        });
        reviewData.review && setReview(reviewData.review);
        setShowIndicator(false);
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    useEffect(() => {
        reviewData.rating ? setActiveSlide(parseInt(reviewData.rating)) : setActiveSlide(0);
    }, []);

    _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.field_review, { paddingTop: item != activeSlide ? 4 : 0, paddingTop: item != activeSlide ? 5 : 0, marginRight: (item == 0 && item == activeSlide) ? 0 : item == activeSlide ? -10 : 15, marginLeft: (item == 0 && item == activeSlide) ? 2 : item == activeSlide ? 2 : 6 }]}>
                <View style={{ width: item == activeSlide ? 53 : 45, height: item == activeSlide ? 53 : 45, borderRadius: 116, backgroundColor: '#666666', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.txt_rating, {
                        fontSize: item == activeSlide ? 36 : 24
                    }]}>{item}</Text>
                </View>
            </View>
        );
    }
    _sendReview = async () => {
        setShowIndicator(true);
        let data = {
            "company_id": companyInfoData.companyId,
            "rating": activeSlide.toString(),
            "review": review ? review : ""
        }
        const responseReviews = await ServiceConnection_Reviews(data);
        if (responseReviews.success) {
            setShowIndicator(false);
            const popAction = StackActions.popToTop();

            navigation.dispatch(popAction)
        }
        else if (responseReviews == "unauthorization") {
            AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
            setShowIndicator(false);
            navigate("Login");
        }
    };
    return (
        <SafeAreaView style={styles.field_send_review}>
            <StatusBar backgroundColor="#FFFFFF" barStyle={'dark-content'} />
            {showIndicator && <Indicator />}
            <View style={styles.field_review_description}>
                <Image
                    source={{ uri: companyInfoData.companyImg }}
                    style={styles.img_company}
                    resizeMode='contain'
                />
                <Text style={styles.txt_recommend_description}>{lang.recommend_description}</Text>
            </View>
            <View>
                <View style={styles.line} />
                <View style={styles.indent_to_bottom} />
            </View>
            <View>
                <Carousel
                    sliderWidth={screenWidth}
                    sliderHeight={53}
                    itemWidth={60}
                    data={ratingNumbers}
                    useScrollView={true}
                    renderItem={_renderItem}
                    slideInterpolatedStyle={_animatedStyles}
                    containerCustomStyle={{ opacity: 1 }}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
            </View>
            <View style={styles.field_second_line}>
                <View style={styles.line} />
                <View style={styles.indent_to_top} />
            </View>
            <View style={styles.field_input_button}>
                <TextInput
                    style={styles.input_review}
                    placeholder={lang.write_your_comment}
                    placeholderTextColor='#999999'
                    onChangeText={(txt) => setReview(txt)}
                    underlineColorAndroid="transparent"
                    selectionColor={'#FA8732'}
                    value={review}
                />
                <TouchBtn
                    lang={lang.send_your_review}
                    func={() => _sendReview()}
                    styleBtn={styles.btn_send_review}
                    txtStyle={styles.txt_send_review}
                    style={{ marginTop: 50 }}
                />
            </View>
        </SafeAreaView>
    );
};

export { SendReview };