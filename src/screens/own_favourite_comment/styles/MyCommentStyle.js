import { StyleSheet, Dimensions } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_my_comment: {
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
        marginVertical: 21,
      paddingHorizontal:10
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
    icon_empty_comment: {
        width: 55,
        height: 47,
        alignSelf: 'center'
    },
    txt_empty_comment_desc: {
        marginHorizontal: 34,
        marginTop: 34,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        color: '#999999',
        letterSpacing: 0,
        fontSize: 13
    },
    icon_company: {
        width: 53,
        height: 44,
        marginTop: 9,
        marginLeft: 12
    },
    txt_company_name: {
        marginTop: 11,
        marginLeft: 11,
        marginBottom: 7,
        lineHeight: 22,
        letterSpacing: -0.01,
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        color: '#666666'

    },
    icon_comment_balloon: {
        width: 24,
        height: 21,
        marginLeft: 29
    },
    txt_by_who: {
        fontSize: 10,
        color: '#999999',
        letterSpacing: 0,
        fontFamily: 'Roboto-Medium',
        marginLeft: 18,
        marginTop: 5,
        flexWrap: 'wrap',
        width: '60%'
    },
    txt_review_date: {
        fontSize: 10,
        color: '#999999',
        letterSpacing: 0,
        fontFamily: 'Roboto-Medium',
        marginLeft: 18,
        marginTop: 5
    },
    txt_review: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        letterSpacing: 0,
        color: '#666666',
        marginLeft: 7,
        flexWrap: 'wrap'
    },
    txt_rating: {
        fontSize: 11,
        fontFamily: 'Roboto-Bold',
        color: '#FA8732',
        letterSpacing: 0,
        marginLeft: 11
    },
    txt_score: {
        fontSize: 11,
        fontFamily: 'Roboto-Regular',
        color: '#666666',
        letterSpacing: -0.27,
        marginLeft: 7
    },
    btn_icon_toggle: {
        width: 8,
        height: 20,
        position: 'absolute',
        top: 21,
        right: 21,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    icon_toggle: {
        width: 4,
        height: 14
    },
    txt_read_more: {
        fontSize: 10,
        fontFamily: 'Roboto-Bold',
        color: '#FA8732',
        letterSpacing: -0.24,
        lineHeight: 22,
        marginLeft: 7
    },
    flex_direction_row: {
        flexDirection: 'row'
    },
    flex_direction_column: {
        flexDirection: 'column',
    },
    align_center: {
        alignItems: 'center'
    },
    field_bottom_of_comment: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    field_open_toggle: {
        width: 131,
        height: 41,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 20,
        top: 11,
        right: 7,
        backgroundColor: '#FFFFFF',
        ...CommonStyles.shadow
    },


    field_toggle_pencil_btn: {
        paddingRight: 10,
        marginHorizontal: 10
    },
    icon_toggle_pencil: {
        marginRight: 26,
        marginVertical: 15,
        width: 16,
        height: 16
    },
    icon_toggle_rubbish_bin: {
        marginRight: 26,
        marginTop: 13,
        width: 13,
        height: 17
    },
    icon_toggle_close: {
        marginTop: 15,
        width: 12,
        height: 12
    },
    field_closed_toggle: {
        marginRight: 35,
        justifyContent: 'center'
    },
    field_flatlist: {
        backgroundColor: '#FFF',
        marginHorizontal: 18,
        marginVertical: 10,
        ...CommonStyles.shadow
    },



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
    field_yes_no_txt:{
        flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    marginVertical:20
},
    btn_yes_no: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 60,
        height: 24
    },
    txt_yes: {
        fontFamily: 'Roboto-Bold',
        color: '#FA8632',
        fontSize: 20
    },
    txt_no: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color:'#FFFFFF',
        marginHorizontal:10
    },
    field_modal: {
        marginTop: 140,
        width: 259,
        height: 280,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    icon_rubbish_bin: {
        width: 40,
        height: 75,
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