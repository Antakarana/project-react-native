import React, { useCallback } from "react";
import { Alert, Text, Linking, StyleSheet, TouchableOpacity } from "react-native";
import lang from '../../../lang/Language';

const OpenURLButton = ({ url, style }) => {
    newUrl = url == lang.web_tegsoft ? "https://" + lang.web_tegsoft : url
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(newUrl);
        if (supported) {
            await Linking.openURL(newUrl);
        } else {
            Alert.alert(`${lang.not_url} ${newUrl}`);
        }
    }, [newUrl]);
    return <TouchableOpacity onPress={handlePress} style={style && style}>
        <Text style={styles.txt_info_website}>{url}</Text>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    txt_info_website: {
        textDecorationLine: 'underline',
        color: '#FA8732',
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
    }
});
export { OpenURLButton };