import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import images from "../../../assets/img_paths/images";

const stackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#FA8732',
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
        fontSize: 17,
        fontFamily: 'Roboto-Bold'
    },
    headerBackImage: () => {
        return (
            <Image source={images.icon_left_arrow} style={styles.icon} />
        )
    }
}

const HeaderRight = ({ navigation,directedScreen }) => {
    return (
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate(directedScreen)} >
            <Image source={images.icon_touch_phone} style={[styles.icon, styles.icon_phone]} />
        </TouchableOpacity>
    )
}

const HeaderLeftDrawer = ({ navigation }) => {
    _toggleDrawer = () => {
        navigation.toggleDrawer();
    }
    return (
        <TouchableOpacity style={styles.icon} onPress={_toggleDrawer}>
            <Image source={images.icon_menu} style={styles.icon} />
        </TouchableOpacity>
    )
}
const HeaderLeftEnd = ({ navigation, lang }) => {
    return (
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Text style={styles.txt_hang_up}>{lang}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    icon: {
        margin: 8
    },
    txt_hang_up: {
        fontSize: 17,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Light'
    },
    icon_phone: {
        width: 22,
        height: 22
    }
});

export { stackNavigationOptions, HeaderLeftDrawer, HeaderLeftEnd, HeaderRight };