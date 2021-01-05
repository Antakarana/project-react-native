import React, { useState, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../../dashboard_comment/styles/DashboardStyle';
import images from '../../../assets/img_paths/images';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import setCompanyInfo from '../../../redux/actions/companyInfo';
import { ServiceConnection_CallHistoryByCompany } from '../../../config/api/ApiFunctions';
import _ from 'lodash';

const ListItem = (props) => {
    const { item, index } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const _onToggle = useCallback(
        () => {
            setIsOpen(isOpen => !isOpen);
        },
        [isOpen],
    );
    _setCompanyInfoDataAndNavigate = async (item, directedScreen) => {
        const companyInfoData = {
            companyId: item.company_id,
            companyName: item.name,
            companyImg: item.img_path
        }
        dispatch(setCompanyInfo(companyInfoData));
        if (directedScreen == 'IVRNode') _checkAndNavigate(item);
        else navigate(directedScreen);
    }
    _checkAndNavigate = async (item) => {
        const responseCallHistoryByCompany = await ServiceConnection_CallHistoryByCompany(item.company_id);
        if (responseCallHistoryByCompany.result.call_history && _.size(responseCallHistoryByCompany.result.call_history.services) > 0) {
            navigate('CallHistoryByCompany', { callHistoryByCompanyData: responseCallHistoryByCompany.result.call_history });
        }
        else navigate('IVRNode');
    }
    return (
        <TouchableOpacity key={index} onPress={() => _setCompanyInfoDataAndNavigate(item, 'CompanyInfo')}>
            <View style={styles.callhistory_companies}>
                <Image source={{ uri: item.img_path }} style={styles.img_brand} resizeMode='contain' />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={styles.txt_brand}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={images.icon_phone} style={styles.icon_phone} />
                        <Text style={styles.txt_call_counts}>{item.call_count}</Text>
                        <Image source={images.icon_clock_gray} style={styles.icon_clock} />
                        <Text style={styles.txt_call_duration}>{item.call_duration} {item.call_duration_time_unit}</Text>
                    </View>
                </View>
                {
                    !isOpen ?
                        <View style={styles.field_closed_toggle}>
                            <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle} style={styles.btn_table_toggle} >
                                <Image source={images.icon_table_toggle} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.field_open_toggle}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate(item, 'IVRNode')}>
                                    <Image source={images.icon_phone} style={styles.icon_toggle_phone} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _setCompanyInfoDataAndNavigate(item, 'CompanyInfo')} style={styles.btn_clickable_field}>
                                    <Image source={images.icon_about_tegsoft_touch} style={styles.icon_toggle_mark} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={_onToggle}>
                                    <Image source={images.icon_toggle_close} style={styles.icon_toggle_close} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                }
            </View>
        </TouchableOpacity>
    )
}
export { ListItem };