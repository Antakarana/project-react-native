import { StyleSheet, Dimensions } from 'react-native';
import CommonStyles from '../../common/CommonStyles';

const screenWidth = Math.round(Dimensions.get('window').width);
const horizontalMargin = 20;
const slideWidth = 280;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const styles = StyleSheet.create({
    field_companies: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        backgroundColor: '#FA8843'
    },
    header_body: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        left: 30
    },
    field_header: {
        flexDirection: 'row',
        backgroundColor: '#FA8732',
        height: 70,
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        color: '#FFFFFF',
        justifyContent: 'center'
    },
    centralized: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: -16
    },
    btn_icon_left: {
        marginLeft: 15
    },
    btn_left_icon: {
        marginLeft: -15
    },
    btn_icon_microphone: {
        width: 40,
        height: 40,
        marginLeft: -35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field_company: {
        backgroundColor: '#FFFFFF',
        marginVertical: 5
    },
    title: {
        flex: 1,
        position: 'absolute'
    },
    field_subtitle: {
        marginTop: 12,
        marginBottom: 17
    },
    txt_companies: {
        color: '#FFFFFF'
    },
    btn_icon: {
        width: 40,
        height: 40,
        marginLeft: -15,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    icon_left: {
        marginLeft: -10
    },
    title_on_companies: {
        fontFamily: 'Roboto-Bold',
        color: '#666666',
        fontSize: 16,
        marginLeft: 20
    },
    icon_next: {
        width: 6,
        height: 10,
        position: 'absolute',
        right: 10,
        alignSelf: 'center'
    },
    img_brand: {
        width: 51,
        height: 30,
        alignSelf: 'center'
    },
    img_trending_brand: {
        width: 51,
        height: 30,
        alignSelf: 'center'
    },
    trending_company: {
        marginVertical: 10,
        marginTop: 5
    },
    field_border: {
        paddingHorizontal: 10,
        marginRight: 15,
        width: screenWidth * 0.85,
        height: 80,
        borderRadius: 5,
        borderColor: '#1B0000',
        backgroundColor: '#FFFFFF',
        margin: 2,
        ...CommonStyles.shadow
    },
    txt_call_counts: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#999999',
        marginLeft: 5
    },
    txt_name: {
        marginLeft: 5
    },
    txt_call_duration: {
        marginLeft: 5,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#999999'
    },
    flex_direction_row: {
        flexDirection: 'row',
        marginLeft: -10,
    },
    trending_companies: {
        flexDirection: 'row',
        marginVertical: 10,
        marginBottom: 10
    },
    txt_see_all: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: '#FA8732',
        position: 'absolute',
        right: 0,
        marginRight: 35,
        marginBottom: 10
    },
    icon_next: {
        color: '#FA8732',
        position: 'absolute',
        right: 22.5,
        marginTop: 5
    },
    txt_brand: {
        fontSize: 17,
        color: '#666666',
        fontFamily: 'Roboto-Regular'
    },
    slide: {
        width: itemWidth,
        height: itemHeight
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    txt_rating: {
        color: '#FA8732',
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        marginRight: 10
    },
    txt_reviews: {
        color: '#666666',
        fontFamily: 'Roboto-Regular',
        fontSize: 14
    },
    field_rating_review: {
        flexDirection: 'row'
    },
    field_icons_on_companies: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        right: 20
    },
    field_icons_on_trending_companies: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        right: 10
    },
    icon_table_toggle: {
        width: 4,
        height: 14,
        alignSelf: 'center',
        position: 'absolute',
        right: -20
    },
    icon_favourite_company_list: {
        alignSelf: 'center',
        right: 30
    },
    icon_favourite: {
        alignSelf: 'center',
        right: 20
    },
    horizontal_scrollabled_table: {
        height: screenWidth * 0.25
    },
    field_trending_companies: {
        width: screenWidth * 0.95
    },
    shadow_flatlist: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        marginVertical: 10,
        ...CommonStyles.shadow
    },
    subfield_trending_companies: {
        padding: 5,
        paddingTop: 10
    },
    header: {
        backgroundColor: '#FA8843',
        height: 80
    },
    txt_categories: {
        color: '#FFFFFF'
    },
    input_search: {
        width: screenWidth * 0.8,
        height: 42,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 0,
        paddingLeft: 15,
        fontSize: 16,
        alignItems: 'center',
        marginHorizontal: -5
    },
    icon_left: {
        marginLeft: -5
    },
    icon_microphone: {
        justifyContent: 'flex-end',
        width: 12,
        height: 21
    },
    field_categories: {
        width: screenWidth,
        backgroundColor: '#FFFFFF'
    },
    subfield_categories: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    txt_categories: {
        fontSize: 22,
        fontFamily: 'Roboto-Bold',
        color: '#666666',
        marginTop: 10,
        marginLeft: 5,
        alignSelf: 'flex-start'
    },
    item_category: {
        marginHorizontal: 15,
        marginVertical: 10,
        width: (screenWidth - (44 + 90)) / 3,
        height: (screenWidth - (44 + 90)) / 3,
        borderRadius: 5,
        borderColor: '#1B0000',
        backgroundColor: '#FFFFFF',
        margin: 2,
        ...CommonStyles.shadow
    },
    icon_categories: {
        width: 36,
        height: 36
    },
    field_icon_category: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    horizontal_central: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    txt_category: {
        marginLeft: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: '#666666'
    },
    container: {
        width: 250,
        height: 100,
        backgroundColor: '#FFFFFF'
    },
    txt_category_name: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        marginHorizontal: screenWidth / 4.5
    },
    marginVertical10: {
        marginVertical: 10
    },
    btn_delete_input: {
        width: 30,
        height: 30,
        marginLeft: -screenWidth * 0.09
    },
    icon_delete_input: {
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
        borderRadius: 20,
        right: 1,
        backgroundColor: '#FFFFFF',
        ...CommonStyles.shadow
    },
    btn_table_toggle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_clickable_field: {
        marginHorizontal: 2.5
    },
    field_btn_table_toggle: {
        marginRight: -30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field_toggle_phone_btn: {
        paddingRight: 10,
        marginHorizontal: 10
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
        marginTop: 15
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

});
export default styles;