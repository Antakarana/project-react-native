import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Dimensions, Text, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/img_paths/images';
import styles from './styles/CompanyCallStyle';
import { useSelector } from 'react-redux';
import { NumberItem } from './common_components/NumberItem';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function countProperties(obj) {
    let count = 0;
    for (let property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}
const CompanyCall = ({ navigation }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isShownNumberPad, setIsShownNumberPad] = useState(false);
    const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo);
    let enteredCallNumber = useSelector(enteredCallNumber => enteredCallNumber.enteredCallNumber);
    let [callNumber, setCallNumber] = useState("");
    const { navigate } = useNavigation();

    const backAction = () => {
        return true;
    };
    useEffect(() => {
        if (enteredCallNumber) {
            const sizeEnterCallNumberObj = countProperties(enteredCallNumber);
            if (sizeEnterCallNumberObj > 0) {
                let newString = enteredCallNumber.enteredCallNumber.toString();
                let enterCallNumber = newString.replace(/,/g, '')
                setCallNumber(enterCallNumber);
            }
        }
    });
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
    _mute = async () => {
        setIsMuted(!isMuted);
    }
    _showNumberPad = async () => {
        setIsShownNumberPad(!isShownNumberPad);
    }
    _endCall = async () => {
        await setCallNumber("");
        navigate('SendReview', { reviewData: '' });
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
            <LinearGradient colors={['#FA8632', '#F8C232']} style={styles.container_gradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={{
                    alignItems: 'center', alignSelf: 'center', position: isShownNumberPad == true ? 'absolute' : 'relative',
                    bottom: isShownNumberPad == true ? (Platform.OS === 'ios' ? 400 : 120) : (Platform.OS === 'ios' ? -screenHeight * 0.132 : -130)
                }}>
                    <View style={{
                        position: isShownNumberPad == true ? 'absolute' : 'relative',
                        bottom: isShownNumberPad == true ? (Platform.OS === 'ios' ? screenHeight * 0.2 : screenHeight * 0.45) : -screenHeight * 0.016
                    }}>
                        <View style={styles.field_out_of_company_img}>
                            <View style={styles.field_company_img}>
                                <Image
                                    source={{ uri: companyInfoData.companyImg }}
                                    style={styles.img_company}
                                    resizeMode='contain' />
                            </View>
                        </View>
                        <Text style={styles.txt_company_name}>{companyInfoData.companyName}</Text>
                        <Text style={styles.txt_entered_number}>{callNumber}</Text>
                    </View>
                    <View style={[styles.field_icon_calls, {
                        marginBottom: screenHeight * 0.15, position: isShownNumberPad == true ? 'absolute' : 'relative',
                        bottom: isShownNumberPad == true ? (Platform.OS === 'ios' ? -screenHeight * 0.133 : 120) : (Platform.OS === 'ios' ? -screenHeight * 0.33 : -130)
                    }]}>
                        <TouchableOpacity style={styles.border_icon_calls} onPress={() => { }}>
                            <Image
                                source={images.icon_voice_call}
                                style={styles.icon_voice_call}
                                resizeMode='contain' />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.border_icon_calls, { backgroundColor: isMuted ? '#FFFFFF' : 'transparent' }]} onPress={() => _mute()}>
                            <Image
                                source={isMuted ? images.icon_clicked_mute_call : images.icon_mute_call}
                                style={styles.icon_mute_call}
                                resizeMode='contain' />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.border_icon_calls, { backgroundColor: isShownNumberPad ? '#FFFFFF' : 'transparent' }]} onPress={() => _showNumberPad()}>
                            <Image
                                source={isShownNumberPad ? images.icon_clicked_number_call : images.icon_number_call}
                                style={styles.icon_number_call}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.field_call_btn, { backgroundColor: isShownNumberPad ? '#000000' : 'transparent' }]}>
                    {
                        isShownNumberPad ? <>
                            <View style={[{ marginTop: 16.5 }, styles.flex_direction_row]}>
                                <NumberItem num={"1"} bottom right />
                                <NumberItem num={"2"} bottom right />
                                <NumberItem num={"3"} bottom right />
                            </View>
                            <View style={styles.flex_direction_row}>
                                <NumberItem num={"4"} bottom right />
                                <NumberItem num={"5"} bottom right />
                                <NumberItem num={"6"} bottom right />
                            </View>
                            <View style={styles.flex_direction_row}>
                                <NumberItem num={"7"} bottom right />
                                <NumberItem num={"8"} bottom right />
                                <NumberItem num={"9"} bottom right />
                            </View>
                            <View style={styles.flex_direction_row}>
                                <NumberItem num={"*"} right />
                                <NumberItem num={"0"} right />
                                <NumberItem num={"#"} right />
                            </View>
                        </> : null}
                </View>
                <TouchableOpacity onPress={() => _endCall()} style={styles.border_close_call}>
                    <Image
                        source={images.icon_phone_close_call}
                        style={styles.icon_phone_close_call}
                        resizeMode='contain' />
                </TouchableOpacity>
            </LinearGradient>
        </>
    )
};

export { CompanyCall };