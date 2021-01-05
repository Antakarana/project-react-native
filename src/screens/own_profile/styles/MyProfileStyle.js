import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_profile: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    field_profile: {
        margin: 10
    },
    field_infos: {
        marginHorizontal:16,
        marginVertical: 20
    },
    btn_view_profile: {
        marginVertical: 10
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
    txt_menu_items_name_surname: {
        fontSize: 16,
        color: '#FA8732',
        fontFamily: 'Roboto-Bold'
    },
    icons_on_drawer: {
        width: 20,
        height: 20,
        marginRight: 5,
        color: '#999999'
    },
    txt_title: {
        fontFamily: 'Roboto-Light',
        fontSize: 17,
        color:'#666666',
        letterSpacing: 0.2
    },
    txt_title_value: {
        fontSize:21,
        fontFamily:'Roboto-Bold',
        letterSpacing: 0.25,
        color:'#666666',
        marginTop: 3
    }
});
export default styles;