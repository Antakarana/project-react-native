import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_txt_description: {
        width: screenWidth,
        marginTop: 24,
    },
    txt_description: {
        fontSize: 17,
        color: '#666666',
        fontFamily: 'Roboto-Regular',
        lineHeight: 22,
        letterSpacing: -0.01,
        textAlign: 'center',
        marginHorizontal: 68.5,
        flexWrap: 'wrap'
    },
    input_ivr_node: {
        width: screenWidth - 36,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#999999',
        paddingBottom: 17,
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0,
        color: '#999999'
    },
    field_input_description: {
        marginTop: 17,
        marginLeft: 24,
        fontSize: 12,
        letterSpacing: 0,
        fontFamily: 'Roboto-Regular',
        color: '#666666'
    },
    btn_next: {
        width: screenWidth * 0.816,
        alignSelf: 'center'
    },
    txt_next: {
        marginVertical: 10,
        marginHorizontal: 41,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 15.6,
        letterSpacing: 0,
        paddingVertical: 7.5
    },
    icon_next_btn: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 15
    },
    txt_review_desc: {
        color: '#FA8632',
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 27,
        letterSpacing: 0
    },
    btn_review_now: {
        width: 176,
        alignSelf: 'center',
        marginBottom: 42
    },
    txt_review_now: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15.6,
        color: '#FFFFFF',
        letterSpacing: 0,
        textAlign: 'center',
        paddingVertical: 15
    },
    btn_exit: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        height: 24
    },
    txt_exit: {
        fontFamily: 'Roboto-Bold',
        color: '#FA8632',
        fontSize: 20
    },
    field_modal: {
        marginTop: 140,
        width: 259,
        height: 425,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    icon_warning: {
        width: 11,
        height: 54,
        alignSelf: 'center',
        marginTop: 43,
        marginBottom: 22
    },
    container: {
        flex:1,
        justifyContent:'center',
        marginTop: -70
    }
});
export default styles;