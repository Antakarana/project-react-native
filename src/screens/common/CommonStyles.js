import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
    shadow: {
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: '#000000'
    }
});
export default CommonStyles;