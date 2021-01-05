import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import images from '../../assets/img_paths/images';
import lang from '../../lang/Language';
import styles from './styles/LoginSignupStyle';
import { TxtInput } from './common_components/index';
import { TouchBtn } from '../common/common_components/index';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import { ServiceConnection_Signup } from '../../config/api/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import _ from 'lodash';
import CheckBox from 'react-native-check-box';
import _msgToast from '../common/common_components/ResponseHandlerModal';

const SignupWithEmail = () => {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const isChecked = useNavigationParam('isChecked');
  const nameInput = useRef(null);
  const surnameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);

  useEffect(() => {
    if (isChecked) {
      setCheck(true);
    }
  }, [isChecked]);

  const nameValidation = (name) => {
    return name && name.length > 2;
  };

  const emailValidation = (email) => {
    let reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    return reg.test(email);
  };

  const phoneValidation = (phoneNumber) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
    if (parsedPhoneNumber) {
      return parsedPhoneNumber.isValid();
    } else if (phoneNumber) {
      return false;
    } else {
      return true;
    }
  };

  const passwordValidation = (password) => {
    return password.length >= 6 && password.length <= 8;
  };

  _signupWithEmail = async () => {
    const nameValid = nameInput.current.validate();
    const surnameValid = surnameInput.current.validate();
    const emailValid = emailInput.current.validate();
    const phoneValid = phoneInput.current.validate();
    const passwordValid = passwordInput.current.validate();

    if (nameValid && surnameValid && emailValid && phoneValid && passwordValid) {
      let data = {
        name: name,
        surname: surname,
        email: email,
        phone: phoneNumber ? phoneNumber : '',
        password: password,
      };
      if (check === false) _msgToast('error', lang.check_privacy_policy)
      else {
        const responseSignup = await ServiceConnection_Signup(data);
        if (responseSignup) {
          if (responseSignup.success) {
            navigate('ConfirmEmail', {
              responseSignup: responseSignup,
              email: email,
            });
          }
        }
      }
    }
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  return (
    <View style={styles.field_login}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      <ScrollView>
        <View style={styles.field_signup_with_email}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <Image
              source={images.logo_tegsoft}
              style={styles.logo_tegsoft_signup_email}
              resizeMode="stretch"
            />

            <TxtInput
              ref={nameInput}
              placeholder={lang.name}
              onChangeText={(txt) => setName(txt)}
              value={name}
              iconPath={images.icon_avatar}
              validation={() => nameValidation(name)}
              errorText={lang.name_at_least_3_chars}
            />

            <TxtInput
              ref={surnameInput}
              placeholder={lang.surname}
              onChangeText={(txt) => setSurname(txt)}
              value={surname}
              iconPath={images.icon_avatar}
              validation={() => nameValidation(surname)}
              errorText={lang.surname_at_least_3_chars}
            />

            <TxtInput
              ref={emailInput}
              placeholder={lang.email}
              onChangeText={(txt) => setEmail(txt.toLowerCase())}
              value={email}
              isLowerCase={true}
              iconPath={images.icon_email_entry_screen}
              keyboardType={'email-address'}
              validation={() => emailValidation(email)}
              errorText={lang.no_email_valid}
              isAutoCapitalization={true}
            />

            <TxtInput
              ref={phoneInput}
              placeholder={lang.phone_with_validation}
              onChangeText={(txt) => setPhoneNumber(txt)}
              iconPath={images.icon_phone_entry_screen}
              value={new AsYouType().input(phoneNumber)}
              keyboardType={'phone-pad'}
              validation={() => phoneValidation(phoneNumber)}
              optional
              errorText={lang.enter_valid_phone}
            />

            <TxtInput
              ref={passwordInput}
              placeholder={lang.password_with_chars}
              onChangeText={(txt) => setPassword(txt)}
              value={password}
              iconPath={images.icon_lock}
              secureTextEntry
              shouldValidate={true}
              validation={() => passwordValidation(password)}
              errorText={lang.password_6_8_chars}
            />

            <View style={styles.field_privacy_policy}>
              <CheckBox
                style={{ paddingLeft: 20 }}
                onClick={() => setCheck(!check)}
                checkBoxColor={"#FA8732"}
                uncheckedCheckBoxColor={"#FA8732"}
                isChecked={check}
              />
              <Text style={styles.txt_read_and_accepted}>
                {lang.read_and_accepted}{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigate('PrivacyPolicy', { isThereAcceptBtn: true })
                }>
                <Text style={styles.txt_privacy_policy}>
                  {lang.privacy_and_policy}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchBtn
              lang={lang.signup}
              func={() => _signupWithEmail()}
              styleBtn={styles.btn_signup_email}
              txtStyle={styles.txt_login}
              style={{ zIndex: 10 }}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <Image
        source={images.img_footer}
        style={styles.img_footer_login}
        resizeMode="stretch"
      />
    </View>
  );
};
export { SignupWithEmail };