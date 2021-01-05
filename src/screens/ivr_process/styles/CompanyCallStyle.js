import { StyleSheet, Dimensions, Platform } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container_gradient: {
        flex: 1
    },
    img_company: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    txt_company_name: {
        fontSize: 21,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        marginVertical: 15,
        color: '#FFFFFF',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    field_icon_calls: {
        flexDirection: 'row'
    },
    border_icon_calls: {
        opacity: 0.7,
        width: 54,
        height: 54,
        borderRadius: 36,
        borderWidth: 2.4,
        borderColor: '#FFFFFF',
        marginHorizontal: 24,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    border_close_call: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#D75A4A',
        zIndex: 20
    },
    field_call_btn: {
        position: 'absolute',
        bottom: -30,
        paddingBottom: Platform.OS === 'ios' ? 140 : 100,
        alignItems: 'center',
        alignSelf: 'center',
        width: screenWidth,
        opacity: 0.3
    },
    icon_voice_call: {
        width: 28,
        height: 30
    },
    icon_mute_call: {
        width: 31,
        height: 37
    },
    icon_number_call: {
        width: 24,
        height: 23
    },
    icon_phone_close_call: {
        width: 36,
        height: 16
    },
    field_out_of_company_img: {
        width: 170,
        height: 170,
        borderRadius: 85,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 25,
        borderColor: '#F9A250',
        justifyContent: 'center',
        marginTop: -screenWidth / 6
    },
    field_company_img: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#FBC28C',
        justifyContent: 'center'
    },
    flex_direction_row: {
        flexDirection: 'row'
    },
    txt_entered_number: {
        fontSize: 20,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: -30,
        textAlign: 'center',
        letterSpacing: -0.48
    }
});

export default styles;