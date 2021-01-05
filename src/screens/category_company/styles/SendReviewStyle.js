import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    field_review: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 27,
        marginBottom: 10
    },
    field_review_description: {
        width: screenWidth,
        paddingHorizontal: 28,
        marginBottom: 56
    },
    field_input_button: {
        marginTop: 51,
        alignItems: 'center'
    },
    txt_recommend_description: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        color: '#666666',
        lineHeight: 22,
        letterSpacing: -0.01
    },
    line: {
        borderWidth: 2,
        borderColor: '#CCCCCC'
    },
    field_second_line: {
        marginTop: 18
    },
    indent_to_bottom: {
        position: 'absolute',
        right: screenWidth / 2 - 6.5,
        bottom: -10,
        borderStyle: 'solid',
        borderTopWidth: 13,
        borderRightWidth: 9,
        borderLeftWidth: 9,
        borderTopColor: '#CCCCCC',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent'
    },
    indent_to_top: {
        position: 'absolute',
        right: screenWidth / 2 - 6.5,
        borderStyle: 'solid',
        bottom: 0,
        borderBottomWidth: 13,
        borderRightWidth: 9,
        borderLeftWidth: 9,
        borderBottomColor: '#CCCCCC',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent'
    },
    input_review: {
        width: screenWidth - 25,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        color: '#999999',
        paddingBottom: 17,
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0
    },
    txt_rating: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        marginBottom: Platform.OS === 'android' ? 3 : 0
    },
    btn_send_review: {
        width: screenWidth * 0.544,
        alignSelf: 'center'
    },
    txt_send_review: {
        marginVertical: 10,
        marginHorizontal: 41,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        paddingVertical: 5
    },
    field_send_review: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    img_company: {
        width: 214.2,
        height: 105,
        alignSelf: 'center',
        marginTop: 34,
        marginBottom: 25
    }
});

export default styles;