import { StyleSheet, Dimensions } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_call_history_by_company: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    field_wrap_txt: {
        width: screenWidth,
    },
    txt_welcome: {
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        color: '#F6911E',
        lineHeight: 22,
        letterSpacing: -0.01,
        alignSelf: 'center',
        marginTop: 24,
        flexWrap: 'wrap',
        textAlign: 'center',
        paddingHorizontal: 68.5
    },
    txt_description: {
        marginTop: 55,
        fontSize: 17,
        color: '#666666',
        lineHeight: 22,
        letterSpacing: -0.01,
        alignSelf: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        paddingHorizontal: 44
    },
    field_call_history: {
        flex: 1,
        marginHorizontal: 13.5,
        marginTop:45
    },
    field_btn_call_history: {
        marginHorizontal: 13.5
    },
    txt_call_history: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: '#666666',
        lineHeight: 28,
        letterSpacing: -0.29,
        marginLeft: 14.3
    },
    field_call_history_table: {
        marginTop: 17,
        backgroundColor: '#FFFFFF',
        ...CommonStyles.shadow
    },
    field_list: {
        flexDirection: 'row'
    },
    icon_phone: {
        width: 25,
        height: 25,
        marginLeft: 25,
        marginVertical: 20
    },
    field_title_subtitle: {
        flexDirection: 'column',
        marginLeft: 28
    },
    title: {
        marginTop: 12,
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.01,
        color: '#666666'
    },
    subtitle: {
        marginTop: 3,
        fontFamily: 'Roboto-Regular',
        fontSize: 13.6,
        letterSpacing: 0.22,
        color: '#999999'
    },
    field_icon_next_arrow: {
        flex: 1,
        position: 'absolute',
        right: 20,
        alignSelf: 'center'
    },
    icon_next_arrow: {
        width: 10,
        height: 6
    },
    txt_or_make_call: {
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        color: '#666666',
        lineHeight: 22,
        letterSpacing: -0.01,
        textAlign: 'center',
        marginTop: 15
    },
    field_btn: {
        marginVertical: 24,
        marginHorizontal: 35
    },
    btn_new_call: {
        width: 306,
        alignSelf: 'center',
        zIndex: 10,
    },
    txt_new_call: {
        marginVertical: 10,
        marginHorizontal: 41,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 15.6,
        paddingVertical: 5
    }
});

export default styles;