import React, { useState, useRef } from 'react';
import { Text, View, KeyboardAvoidingView, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StatusBar } from 'react-native';
import images from '../../assets/img_paths/images';
import lang from '../../lang/Language';
import styles from './styles/LoginSignupStyle';
import { TxtInput } from './common_components/index';
import { TouchBtn } from '../common/common_components/index';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceConnection_Login } from '../../config/api/index';
import { useNavigation } from 'react-navigation-hooks';
import _ from 'lodash';
import { Indicator } from '../common/common_components/index';

const LoginWithEmail = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [showIndicator, setShowIndicator] = useState(false);

  const emailValidation = email => {
    let reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    return reg.test(email);
  };
  const passwordValidation = password => {
    return password.length >= 6 && password.length <= 8;
  };

  _login = async () => {
    const emailValid = emailInput.current.validate();
    const passwordValid = passwordInput.current.validate();

    if (emailValid && passwordValid) {
      const responseLogin = await ServiceConnection_Login({ email, password });
      if (responseLogin) {
        if (responseLogin.success) {
          setShowIndicator(true);
          await AsyncStorage.setItem('@userInfo',JSON.stringify(responseLogin.result));
          let token = await responseLogin.result.token;
          let tokenType = await responseLogin.result.token_type;
          await AsyncStorage.multiSet([
            ['@token', token],
            ['@tokenType', tokenType],
          ]);
          navigate('Dashboard');
        }
      }
    }
  };
  _isClickedSignup = () => {
    navigate('Login', { clickedSignup: true });
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.field_login}>
        <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
        {showIndicator && <Indicator />}
        <View style={styles.field_login_with_email}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <Image
              source={images.logo_tegsoft}
              style={styles.logo_tegsoft_login_email}
              resizeMode="stretch"
            />
            <TxtInput
              ref={emailInput}
              placeholder={lang.email}
              onChangeText={txt => setEmail(txt.toLowerCase())}
              value={email}
              isLowerCase={true}
              iconPath={images.icon_email_entry_screen}
              keyboardType={'email-address'}
              validation={() => emailValidation(email)}
              errorText={lang.no_email_valid}
              isAutoCapitalization={true}
            />
            <TxtInput
              ref={passwordInput}
              placeholder={lang.password}
              onChangeText={txt => setPassword(txt)}
              value={password}
              iconPath={images.icon_lock}
              secureTextEntry
              validation={() => passwordValidation(password)}
              errorText={lang.password_6_8_chars}
            />
            <TouchableOpacity
              onPress={() => navigate('EnterEmail')}
              style={styles.btn_forgot_password}>
              <Text style={styles.txt_forgot_password}>{lang.forgot_password}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchBtn
          lang={lang.login}
          func={() => {
            _login();
          }}
          styleBtn={styles.btn_login_email}
          txtStyle={styles.txt_login}
        />
        <View style={styles.field_no_account_login}>
          <Text style={styles.txt_dont_have_account}>
            {lang.dont_have_an_account}{' '}
          </Text>
          <TouchableOpacity onPress={() => _isClickedSignup()}>
            <Text style={styles.txt_sign_up}>{lang.signup}</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={images.img_footer}
          style={styles.img_footer_login}
          resizeMode="stretch"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export { LoginWithEmail };
