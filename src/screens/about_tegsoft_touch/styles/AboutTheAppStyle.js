import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    field_about_the_app: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    field_infos: {
        height: 54,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    txt_key: {
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        color: '#666666', position: 'absolute',
        left: 18.5,
        marginVertical: 16,
        letterSpacing: -0.01,
        lineHeight: 22
    },
    txt_value: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#666666',
        marginLeft: 18.5,
        marginVertical: 16,
        letterSpacing: -0.36,
        position: 'absolute',
        right: 40
    }
});
export default styles;