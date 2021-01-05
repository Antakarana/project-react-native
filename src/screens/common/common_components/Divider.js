import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const Divider = () => {
    return (
        <View style={styles.divider} />
    )
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        opacity: 0.2,
        marginVertical: 5,
        backgroundColor: '#000000',
        alignSelf: 'stretch',
        alignItems: 'stretch'
    }
})
export { Divider };