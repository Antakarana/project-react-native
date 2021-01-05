import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_sidebar: {
        paddingVertical: 20
    },
    icon_drawer_user:
    {
        width: screenWidth / 6,
        height: screenWidth / 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth / 12
    },
    field_menu_items: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10
    },
    btn_menu_items: {
        marginHorizontal: 10
    },
    txt_menu_items_name_surname: {
        fontSize: 16,
        color: '#FA8732',
        fontFamily: 'Roboto-Bold'
    },
    txt_menu_items: {
        fontSize: 16,
        color: '#999999',
        fontFamily: 'Roboto-Regular',
        marginHorizontal: 10
    },
    marginTop30: {
        marginTop: 30
    },
    field_profile: {
        margin: 10
    },
    btn_view_profile: {
        marginVertical: 10
    },
    gradient: {
        borderRadius: 15,
        padding: 5
    },
    field_img_user: {
        width: 70,
        height: 70,
        backgroundColor: '#E5E5E5',
        borderRadius: 140,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    img_user: {
        width: 65,
        height: 65,
        borderRadius: 130,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    icons_on_drawer: {
        width: 20,
        height: 20,
        marginRight: 5,
        color: '#999999'
    },
    txt_btn_view_profile: {
        fontSize: 10,
        margin: 5,
        marginHorizontal: 15,
        color: '#FFFFFF',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Roboto-Bold'
    },
    subfield_profile: {
        flexDirection: 'row',
        margin: 15
    },
    field_drawer_items: {
        marginVertical: 20
    },
    selected_item: {
        width: '100%',
        height: 40,
        backgroundColor: '#E5E5E5'
    },
    selected_item_start: {
        width: 3,
        height: 40,
        backgroundColor: '#FA8732',
        marginBottom: -40
    },
});
export default styles;