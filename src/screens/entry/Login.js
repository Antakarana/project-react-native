import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import styles from './styles/LoginSignupStyle';
import lang from '../../lang/Language';
import { TouchBtn } from '../common/common_components/index';
import images from '../../assets/img_paths/images';
import { useNavigation } from 'react-navigation-hooks';

const Login = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [state, setState] = useState({ isClickedSignup: false });

  useEffect(() => {
    if (navigation.state.params) {
      if (navigation.state.params.isClickedSignup) setState({ isClickedSignup: true })
    }
  })
  useEffect(() => {
    _setIsLogin();
  }, [navigation.getParam('clickedSignup', false)]);
  _setIsLogin = async () => {
    if (navigation.state.params) {
      await setState({
        isClickedSignup: navigation.getParam('clickedSignup', false),
      });
    }
  };
  const { isClickedSignup } = state;
  return (
    <SafeAreaView style={styles.field_login}>
      <View style={styles.subfield_login}>
        <Image source={images.logo_tegsoft} style={styles.logo_tegsoft} />
        {!isClickedSignup ? (
          <Text style={styles.txt_login_with}>{lang.login_with}</Text>
        ) : (
            <Text style={styles.txt_login_with}>{lang.signup_with}</Text>
          )}
        <View style={styles.field_social_media}>
          <Image
            source={images.icon_google_btn}
            style={styles.icon_google_btn}
          />
          <Image source={images.icon_fb_btn} style={styles.icon_fb_btn} />
        </View>
        <Text style={styles.txt_or}>{lang.or}</Text>
        {!isClickedSignup ? (
          <TouchBtn
            lang={
              isClickedSignup ? lang.signup_with_email : lang.login_with_email
            }
            func={() => navigate('LoginWithEmail')}
            styleBtn={styles.btn_login}
            txtStyle={styles.txt_login}
          />
        ) : (
            <TouchBtn
              lang={
                isClickedSignup ? lang.signup_with_email : lang.signup_with_email
              }
              func={() => navigate('SignupWithEmail')}
              styleBtn={styles.btn_login}
              txtStyle={styles.txt_login}
            />
          )}
      </View>
      <View style={styles.field_no_account_login}>
        {!isClickedSignup ? (
          <>
            <Text style={styles.txt_dont_have_account}>
              {lang.dont_have_an_account}{' '}
            </Text>
            <TouchableOpacity onPress={() => setState({ isClickedSignup: true })}>
              <Text style={styles.txt_sign_up}>{lang.signup}</Text>
            </TouchableOpacity>
          </>
        ) : (
            <>
              <Text style={styles.txt_dont_have_account}>
                {lang.have_an_account}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => setState({ isClickedSignup: false })}>
                <Text style={styles.txt_sign_up}>{lang.login}</Text>
              </TouchableOpacity>
            </>
          )}
      </View>
      <Image
        source={images.img_footer}
        style={styles.img_footer_login}
        resizeMode="stretch"
      />
    </SafeAreaView>
  );
};
export { Login };