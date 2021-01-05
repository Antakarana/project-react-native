import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StatusBar, TextInput, TouchableOpacity, Image, Modal, Text, BackHandler, Keyboard } from 'react-native';
import lang from '../../lang/Language';
import { Indicator, TouchBtn } from '../common/common_components/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { ServiceConnection_IVRNode } from '../../config/api/ApiFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../assets/img_paths/images';
import styles from './styles/IVRNodeStyle';
import { useSelector } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

const IVRNode = ({ navigation }) => {
    const [showIndicator, setShowIndicator] = useState(false);
    const [data, setData] = useState({});
    const [isReviewed, setIsReviewed] = useState("");
    const [isShownModal, setIsShownModal] = useState(false);
    const [inputPayload, setInputPayload] = useState("");
    const [nodeType, setNodeType] = useState('');
    const [nodeId, setNodeId] = useState();
    const { navigate } = useNavigation();
    const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo);

    const backAction = () => {
        return true;
    };
    useEffect(() => {
        _checkWhichIVRNode();
        navigation.setParams({
            title: companyInfoData.companyName
        });
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
    _checkWhichIVRNode = async (key) => {
        setShowIndicator(true);
        setInputPayload("")
        Keyboard.dismiss()
        const data =
        {
            "company_id": companyInfoData.companyId,
            "node_id": nodeId,
            "key": key,
        }
        const responseIVRNode = await ServiceConnection_IVRNode(data);        
        if (responseIVRNode.success) {
            if (responseIVRNode.result.node_type === 'SHORT_NUMBER' ||
                responseIVRNode.result.node_type === 'QUEUE') {
                navigate('CompanyCall')
                return
            }

            await setNodeType(responseIVRNode.result.node_type);
            await setData(responseIVRNode.result.data);
            await setIsReviewed(responseIVRNode.result.session_to_review);
            const modalVisible = await responseIVRNode.result.session_to_review ? true : false
            await setIsShownModal(modalVisible);
            setShowIndicator(false);
            setNodeId(responseIVRNode.result.node_id)
        }
        else if (responseIVRNode == "unauthorization") {
            AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
            setShowIndicator(false);
            navigate("Login");
        }
    }
    _sendReview = () => {
        setIsShownModal(false);
        // const replaceAction = StackActions.replace({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'SendReview' })],
        //   });
          navigate(StackActions.replace({ routeName: 'SendReview' }));
        // navigate('SendReview');
    }
    const modal_background_style = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    _clickedExit = async () => {
        setIsShownModal(false);
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.field_companies}>
            <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
            {showIndicator && <Indicator />}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShownModal}>
                <View style={[styles.container, modal_background_style]}>
                    <View style={styles.field_modal}>
                        <Image source={images.icon_warning} style={styles.icon_warning} resizeMode='contain' />
                        <Text style={styles.txt_review_desc}>{lang.no_review_text}</Text>
                        <Text style={styles.txt_review_desc}>{lang.no_review_text2}</Text>
                        <TouchBtn
                            lang={lang.review_now.toUpperCase()}
                            func={() => _sendReview()}
                            styleBtn={styles.btn_review_now}
                            txtStyle={styles.txt_review_now}
                            style={{ marginTop: 59 }}
                        />
                        <TouchableOpacity onPress={() => _clickedExit()} style={styles.btn_exit} >
                            <Text style={styles.txt_exit}>{lang.exit.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {
                data.menu == null && nodeType === 'IVR' ?
                    <>
                        <View style={styles.field_txt_description}>
                            <Text style={styles.txt_description}>{data.description && data.description}</Text>
                        </View>
                        <View style={{ marginTop: 75 }}>
                            <TextInput
                                style={styles.input_ivr_node}
                                placeholderTextColor='#999999'
                                onChangeText={(txt) => setInputPayload(txt)}
                                value={inputPayload}
                                underlineColorAndroid="transparent"
                                selectionColor={'#FA8732'}
                                keyboardType={'number-pad'}
                            />
                            <TouchBtn
                                lang={lang.next}
                                func={() => _checkWhichIVRNode(inputPayload)}
                                isThereImage={true}
                                imgPath={images.icon_next_btn}
                                imgStyle={styles.icon_next_btn}
                                styleBtn={styles.btn_next}
                                txtStyle={styles.txt_next}
                                style={{ marginTop: 28 }}
                            />
                        </View>
                    </>
                    :
                    data.menu && (nodeType === 'IVR' || nodeType === 'menu') ?
                        <>
                            <View style={styles.field_txt_description}>
                                <Text style={styles.txt_description}>{data.description && data.description}</Text>
                            </View>
                            <View style={{ marginTop: 19 }}>
                                <FlatList
                                    data={data.menu}
                                    scrollEnabled={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={(item, index) => (
                                        <TouchBtn
                                            lang={(item.item.text).toUpperCase()}
                                            func={() => { _checkWhichIVRNode(item.item.key) }}
                                            isThereImage={true}
                                            imgPath={images.icon_next_btn}
                                            imgStyle={styles.icon_next_btn}
                                            styleBtn={styles.btn_next}
                                            txtStyle={styles.txt_next}
                                            style={{ marginTop: 23 }}
                                        />
                                    )} />
                            </View>
                        </>
                        : null
            }
        </SafeAreaView>
    );
};

export { IVRNode };