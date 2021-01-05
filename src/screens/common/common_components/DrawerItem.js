import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../dashboard_comment/styles/SideBarStyle';

const DrawerItem = (props) => {
    setStyles = (styles) => {
        this.root.setNativeProps({
            style: styles,
        })
    }

    return (
        <View>
            <TouchableOpacity onPress={() => props.onPressFunc()} style={props.isBgColor == true ? { backgroundColor: '#E5E5E5' } : { backgroundColor: '#FFFFFF' }}>
                <View style={props.isBgColor && styles.selected_item_start} />
                <View style={styles.field_menu_items}>
                    <Image source={props.iconPath} style={styles.icons_on_drawer} resizeMode='stretch' />
                    <Text style={styles.txt_menu_items}>{props.lang}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export { DrawerItem };