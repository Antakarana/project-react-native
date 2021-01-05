import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './styles/AboutTheAppStyle';
import lang from '../../lang/Language';
import _ from 'lodash';
import { OpenURLButton } from '../common/common_components/index';
import DeviceInfo from 'react-native-device-info';

const AboutTheApp = ({ navigation }) => {
    const [appVersion, setAppVersion] = useState();

    useEffect(() => {
        setAppVersion(DeviceInfo.getVersion());
    }, []);

    return (
        <SafeAreaView style={styles.field_profile}>
            <View style={styles.field_infos}>
                <Text style={styles.txt_key}>{lang.powered_by}</Text>
                <Text style={styles.txt_value}>{lang.tegsoft}</Text>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_key}>{lang.version}</Text>
                <Text style={styles.txt_value}>{appVersion}</Text>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_key}>{lang.more_about_app}</Text>
                <OpenURLButton style={[styles.txt_value, { color: '#FA8732', textDecorationLine: 'underline' }]} url={lang.web_tegsoft}>{lang.web_tegsoft}</OpenURLButton>
            </View>
            <View style={styles.field_infos}>
                <Text style={styles.txt_key}>{lang.update_the_app}</Text>
                <Text style={styles.txt_value}>{lang.update_the_app_value}</Text>
            </View>
        </SafeAreaView>
    );
};
export { AboutTheApp };