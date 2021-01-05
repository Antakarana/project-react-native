import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../dashboard_comment/styles/DashboardStyle';
import images from '../../../assets/img_paths/images';

const TouchBtn = (props) => {
    const {
        style,
        styleBtn,
        isDisabled,
        func,
        txtStyle,
        lang,
        imgPath,
        imgStyle
    } = props;
    return (
        <View style={style}>
            <TouchableOpacity style={styleBtn}
                disabled={isDisabled ? true : false}
                onPress={() => func()}>
                <LinearGradient colors={['#FA8632', '#F8C232']} style={isDisabled ? [styles.gradient, { opacity: 0.3 }] : styles.gradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}>
                    <Text style={txtStyle}>{lang}</Text>
                    {
                        props.isThereImage &&
                        <Image
                            source={imgPath}
                            style={imgStyle}
                            resizeMode='contain'
                        />
                    }
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
export { TouchBtn };