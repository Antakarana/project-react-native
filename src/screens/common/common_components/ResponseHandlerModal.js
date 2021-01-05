import { StyleSheet, Dimensions } from 'react-native';
import Toast from 'react-native-tiny-toast';
import images from '../../../assets/img_paths/images';

_msgToast = (kind, msg) => {
  Toast.show(msg, {
    containerStyle: styles.container,
    position: 0,
    mask: true,
    maskColor: '#00000065',
    duration: 2000,
    imgSource: kind == 'ok' ? images.icon_tick : images.icon_error,
    imgStyle: kind == 'ok' ? styles.icon_tick : styles.icon_error,
    textStyle: {
      color: kind == 'ok' ? '#FA8632' : '#FF0619',
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
    },
  });
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: 175,
    height: 175,
    borderRadius: 20,
    margin: 2,
    color: '#FA8632',
    zIndex: 21,
    opacity: 1
  },
  icon_tick: {
    width: 56,
    height: 48,
    backgroundColor: '#FFFFFF',
    opacity: 1,
    zIndex: 20
  },
  icon_error: {
    width: 52,
    height: 52,
    backgroundColor: '#FFFFFF',
    opacity: 1,
    zIndex: 20
  },
});
export default _msgToast;