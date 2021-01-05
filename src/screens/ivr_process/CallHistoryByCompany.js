import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, StatusBar, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import lang from '../../lang/Language';
import { Indicator, ListItemSeparator, TouchBtn } from '../common/common_components/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import _ from 'lodash';
import images from '../../assets/img_paths/images';
import styles from './styles/CallHistoryByCompanyStyle';
import { useSelector } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

const CallHistoryByCompany = ({ navigation }) => {
    const [showIndicator, setShowIndicator] = useState(false);
    const callHistoryByCompanyData = useNavigationParam('callHistoryByCompanyData');
    const { navigate } = useNavigation();
    const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo)

    useEffect(() => {
        navigation.setParams({
            title: companyInfoData.companyName
        })
    }, []);
    _navigateToIVRNode = async () => {
        navigate('IVRNode')
        // if (nodeID !== null) navigate('IVRNode', { nodeId: nodeID });
        // else navigate('CompanyCall', { nodeId: null });
    }
    _navigateToCompanyCall = async () => {
        navigate('CompanyCall')
        // if (nodeID !== null) navigate('IVRNode', { nodeId: nodeID });
        // else navigate('CompanyCall', { nodeId: null });
    }
    return (
        <SafeAreaView style={styles.field_call_history_by_company}>
            <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
            <ScrollView>
                {showIndicator && <Indicator />}
                <View style={styles.field_wrap_txt}>
                    <Text style={styles.txt_welcome}>{lang.welcome} {lang.to} {callHistoryByCompanyData.name} {lang.call_center}</Text>
                    <Text style={styles.txt_description}>{callHistoryByCompanyData.description}</Text>
                </View>
                <View style={styles.field_call_history}>
                    <Text style={styles.txt_call_history} >{lang.call_history} ({_.size(callHistoryByCompanyData.services)})</Text>
                    <View style={styles.field_call_history_table}>
                        <FlatList
                            data={callHistoryByCompanyData.services}
                            scrollEnabled={false}
                            ItemSeparatorComponent={ListItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item, index) => (
                                <TouchableOpacity style={styles.field_list} onPress={_navigateToCompanyCall}>
                                    <Image source={images.icon_phone} style={styles.icon_phone} />
                                    <View style={styles.field_title_subtitle}>
                                        <Text style={styles.title}>{item.item.title}</Text>
                                        <Text style={styles.subtitle}>{item.item.subtitle}</Text>
                                    </View>
                                    <View style={styles.field_icon_next_arrow}>
                                        <Image source={images.icon_next_arrow} style={styles.icon_next_arrow} resizeMode='contain' />
                                    </View>
                                </TouchableOpacity>
                            )} />
                    </View>
                    <View style={styles.field_btn_call_history}>
                        <Text style={styles.txt_or_make_call} >{lang.or_make_a_new_call}</Text>
                        <TouchBtn style={styles.field_btn}
                            func={_navigateToIVRNode}
                            styleBtn={styles.btn_new_call}
                            txtStyle={styles.txt_new_call}
                            lang={lang.new_call} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export { CallHistoryByCompany };