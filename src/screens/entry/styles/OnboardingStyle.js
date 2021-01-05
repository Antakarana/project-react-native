import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    txt_next: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        letterSpacing: 0.54,
        color: '#FA8732'
    },
    txt_skip: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        letterSpacing: 0.54,
        color: '#999999'
    },
    img_onboarding: {
        width: screenWidth
    },
    title: {
        marginTop: 100,
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: '#666666'
    },
    text: {
        width: screenWidth,
        alignSelf: 'center',
        marginVertical: 25,
        paddingHorizontal: 40,
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#666666'
    },
    btn_lets_start: {
        width: 190,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        right: screenWidth / 4.5,
        top: -10
    },
    txt_lets_start: {
        fontSize: 15,
        color: '#FFFFFF',
        paddingVertical: 16
    },
    active_dot_style: {
        backgroundColor: '#FA8732',
        marginBottom: 120
    },
    dot_style: {
        backgroundColor: '#FDE9D6',
        marginBottom: 120
    }
});
export default styles;