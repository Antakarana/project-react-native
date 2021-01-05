import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import styles from './styles/MyProfileStyle';
import lang from '../../lang/Language';
import _ from 'lodash';
import { TouchBtn } from '../common/common_components/index';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const MyProfile = ({ navigation }) => {
    const userInfo = useNavigationParam('userInfo');

    const _selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }
    return (
        <SafeAreaView style={styles.field_profile}>
            <View style={styles.subfield_profile}>
                <TouchableOpacity style={styles.field_img_user} onPress={() => _selectImage()} >
                    <Image
                        source={{ uri: userInfo.img_path ? userInfo.img_path : "" }}
                        style={styles.img_user}
                    />
                </TouchableOpacity>
                <View style={styles.field_profile}>
                    <Text style={styles.txt_menu_items_name_surname}>
                        {userInfo.name ? userInfo.name : lang.name}{' '}
                        {userInfo.surname ? userInfo.surname : lang.surname}
                    </Text>
                    <TouchBtn
                        lang={lang.edit_profile}
                        func={() => { navigation.navigate('EditProfile') }}
                        styleBtn={styles.btn_view_profile}
                        txtStyle={styles.txt_btn_view_profile}
                    />
                </View>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_title}>{lang.phone_number}</Text>
                <Text style={styles.txt_title_value}>{userInfo.phone_number ? userInfo.phone_number : lang.phone_number}</Text>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_title}>{lang.gender}</Text>
                <Text style={styles.txt_title_value}>{userInfo.gender ? userInfo.gender : lang.gender}</Text>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_title}>{lang.birth_date}</Text>
                <Text style={styles.txt_title_value}>{userInfo.birth_date ? userInfo.birth_date : lang.birth_date}</Text>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_title}>{lang.only_email}</Text>
                <Text style={styles.txt_title_value}>{userInfo.email ? userInfo.email : lang.only_email}</Text>
            </View>
        </SafeAreaView>
    );
};
export { MyProfile };