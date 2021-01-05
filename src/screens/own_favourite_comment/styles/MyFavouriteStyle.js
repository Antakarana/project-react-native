import { StyleSheet, Dimensions } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_my_favourite: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    shadow_flatlist: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        marginVertical: 10,
        ...CommonStyles.shadow
    },
    field_list: {
        marginVertical: 5
    },
    btn_touch: {
        width: screenWidth * 0.544,
        alignSelf: 'center',
        marginVertical: 21
    },
    txt_touch_btn: {
        marginVertical: 15,
        marginHorizontal: 20,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 19.2
    },
    icon_empty_fav: {
        width: 48,
        height: 44,
        alignSelf: 'center',
        marginBottom: 34
    },
    txt_empty_fav_desc: {
        marginHorizontal: 34,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        color: '#999999',
        letterSpacing: 0,
        fontSize: 13
    }
});
export default styles;