import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_profile: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    field_content: {
        marginHorizontal: 7.5,
        marginTop: 27
    },
    height_between_inputs: {
        height: 17.7
    },
    field_gender: {
        alignItems:'center',
        flexDirection: 'row',
        marginTop: 35,
        marginBottom: 30,
        marginLeft: 25
    },
    txt_gender: {
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        color: '#999999',
        lineHeight: 16.8,
        letterSpacing: 0
    },
    btn_save_changes: {
        width: screenWidth * 0.544,
        alignSelf: 'center'
    },
    txt_save_changes: {
        marginVertical: 10,
        marginHorizontal: 41,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        paddingVertical: 5
    },
    field_touch_btn: {
        top: 66,
        alignSelf: 'center'
    }
});
export default styles;