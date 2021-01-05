import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch} from 'react-redux';
import setEnteredCallNumber from '../../../redux/actions/enterCallNumber';

const screenWidth = Math.round(Dimensions.get('window').width);
let enteredNumber = [];
let clickedCount=0;

const NumberItem = (props) => {
    const { num, bottom, right } = props;
    const dispatch = useDispatch();

    _clickedNumberPad = async (number) => {
        enteredNumber.push(number.toString());
        dispatch(setEnteredCallNumber(enteredNumber));
    }
    return (
        <View style={{ borderRightWidth: right ? 1 : 0, borderBottomWidth: bottom ? 1 : 0, borderColor: '#FFFFFF' }}>
            <TouchableOpacity onPress={() => _clickedNumberPad(num)} style={styles.field_number}>
                <Text style={styles.txt_number}>{num}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    field_number: {
        width: screenWidth / 3,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderColor: '#FFFFFF',
        opacity: 0.3
    },
    txt_number: {
        fontSize: 30,
        color: '#FFFFFF',
        textAlign: 'center'
    },
});

export { NumberItem };