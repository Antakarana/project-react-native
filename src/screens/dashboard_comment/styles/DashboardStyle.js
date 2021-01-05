import { StyleSheet, Dimensions } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FA8843'
    },
    field_dashboard: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    callhistory_companies: {
        flexDirection: 'row',
        marginVertical: 10
    },
    field_table: {
        margin: 13
    },
    subfield_dashboard_table: {
        flexDirection: 'row'
    },
    bg_dashboard: {
        backgroundColor: '#FCFCFC'
    },
    txt_dashboard: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto-Bold'
    },
    container: {
        marginTop: -10
    },
    flex_direction_row: {
        flexDirection: 'row'
    },
    border_dashboard_table_left: {
        width: screenWidth * 0.44,
        height: screenWidth * 0.3,
        borderWidth: 0,
        padding: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        marginHorizontal: 5,
        ...CommonStyles.shadow
    },
    border_dashboard_table_right: {
        width: screenWidth * 0.44,
        height: screenWidth * 0.3,
        borderWidth: 0,
        padding: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        marginHorizontal: 5,
        ...CommonStyles.shadow
    },
    title_dashboard_table: {
        color: '#999999',
        fontSize: 10,
        fontFamily: 'Roboto-Medium'
    },
    txt_number: {
        color: '#666666',
        fontSize: 36,
        fontFamily: 'Roboto-Bold',
        opacity: 0.9,
    },
    txt_unit: {
        color: '#666666',
        fontSize: 8,
        fontFamily: 'Roboto-Regular'
    },
    img_table: {
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    img_bg_table: {
        width: 29,
        height: 29,
        justifyContent: 'center',
        position: 'absolute',
        right: 16,
        top: 16
    },
    field_no_comment_desc: {
        position: 'absolute',
        bottom: 130,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.75
    },
    txt_no_comment: {
        fontFamily: 'Roboto-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 13,
        color: '#999999'
    },
    txt_empty_dashboard: {
        color: '#FFFFFF',
        padding: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 12
    },
    field_btn_brand: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        padding: 10
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 5
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16
    },
    icon_no_comment: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 200
    },
    field_empty_dashboard: {
        marginTop: 418
    },
    field_call_history: {
        flex: 1
    },
    txt_call_history: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: '#666666',
        marginLeft: 20,
        marginVertical: 20
    },
    txt_see_all: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: '#FA8732',
        position: 'absolute',
        right: 0,
        marginRight: 30,
        marginVertical: 20
    },
    icon_next: {
        color: '#FA8732',
        position: 'absolute',
        right: 17.5,
        marginTop: 25
    },
    txt_brand: {
        fontSize: 17,
        color: '#666666',
        fontFamily: 'Roboto-Regular'
    },
    img_brand: {
        width: 57,
        height: 30,
        alignSelf: 'center',
    },
    txt_call_counts: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13.6,
        color: '#999999',
        marginVertical: 2
    },
    icon_clock: {
        margin: 5,
        marginLeft: 19,
        width: 13,
        height: 15
    },
    icon_phone: {
        margin: 5,
        height: 12,
        width: 13
    },
    txt_name: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13.6,
        color: '#999999'
    },
    txt_call_duration: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13.6,
        color: '#999999',
        margin: 2
    },
    field_bg_border: {
        width: screenWidth * 0.95,
        borderWidth: 0.1,
        borderColor: '#1B0000',
        alignSelf: 'center',
        ...CommonStyles.shadow
    },
    field_company_info: {
        flexDirection: 'column',
        marginHorizontal: 10
    },
    vertical_space: {
        marginVertical: screenWidth / 7.5
    },
    list_margin_top: {
        marginTop: 110
    },
    icon_left_arrow: {
        backgroundColor: '#FFFFFF',
        width: 24,
        height: 19
    },
    field_call_history_title: {
        flexDirection: 'row',
        marginBottom: -12
    },
    field_btn_empty_dashboard: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center'
    },
    btn_fab: {
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 40
    },
    fab_icon: {
        backgroundColor: '#FFFFFF',
        width: 15,
        height: 15
    },
    icon_dots: {
        color: '#999999',
        alignSelf: 'flex-end',
    },
    field_open_toggle: {
        width: 131,
        height: 41,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 4,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        ...CommonStyles.shadow
    },
    btn_clickable_field: {
        marginHorizontal: 2.5
    },
    icon_toggle_phone: {
        marginRight: 26,
        marginVertical: 15,
        width: 15,
        height: 15
    },
    icon_toggle_mark: {
        marginRight: 26,
        marginTop: 13,
        width: 18,
        height: 18
    },
    icon_toggle_close: {
        marginTop: 15,
    },
    field_closed_toggle: {
        flex: 1,
        position: 'absolute',
        right: 20,
        alignSelf: 'center'
    },
    btn_table_toggle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field_flatlist: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 18,
        marginVertical: 10,
        ...CommonStyles.shadow
    },
    icon_touch_phone: {
        position: 'absolute',
        right: 13
    }
});
export default styles;