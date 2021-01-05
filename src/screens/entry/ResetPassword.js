import React, { useState } from 'react';
import { Text, View, ScrollView, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styles from './styles/LoginSignupStyle';
import lang from '../../lang/Language';
import { TouchBtn } from '../common/common_components/index';
import images from '../../assets/img_paths/images';
import { TxtInput } from './common_components/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ServiceConnection_ResetPassword } from '../../config/api';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import _ from 'lodash';

const CELL_COUNT = 6;
const ResetPassword = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const email = useNavigationParam('email');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const passwordValidation = (password) => {
    return password.length >= 6 && password.length <= 8;
  };
  const repeatPasswordValidation = (repeatPassword) => {
    return (
      (repeatPassword.length >= 6 && repeatPassword.length <= 8) &&
      password === repeatPassword
    )
  };
  _resetPassword = async () => {
    if (password == repeatPassword && _.size(password) > 5 && _.size(repeatPassword) > 5) {
      let data = { code: value, password: password };
      const responseResetPassword = await ServiceConnection_ResetPassword(data);
      if (responseResetPassword) {
        if (responseResetPassword.success) {
          navigate('LoginWithEmail');
        }
      }
    }
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.field_login}>
        <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.subfield_reset_password}>
            <Image
              source={images.img_confirm_email}
              style={styles.img_confirm_email}
              resizeMode="stretch"
            />
            <Text style={styles.txt_confirm_email}>{lang.check_email}</Text>
            <Text style={styles.txt_confirm_email_desc}>
              {lang.check_email_desc_before_email}
              {email}.{lang.check_email_desc_after_email}
            </Text>
            <View style={styles.field_verification_code_number}>
              <CodeField
                ref={ref}
                {...props}
                value={value.toLocaleUpperCase()}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.code_filed_root}
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={styles.code_fied_container}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text
                      style={[styles.cell, isFocused && styles.focus_cell]}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>

            <TxtInput
              placeholder={lang.enter_new_password}
              onChangeText={(txt) => setPassword(txt)}
              value={password}
              iconPath={images.icon_lock}
              secureTextEntry
              shouldValidate={true}
              validation={() => passwordValidation(password)}
              errorText={lang.password_6_8_chars}
            />
            <TxtInput
              placeholder={lang.confirm_new_password}
              onChangeText={(txt) => setRepeatPassword(txt)}
              value={repeatPassword}
              iconPath={images.icon_lock}
              secureTextEntry
              shouldValidate={true}
              validation={() => repeatPasswordValidation(repeatPassword)}
              errorText={lang.dont_match_password}
            />

            <TouchBtn
              lang={lang.reset_my_password}
              func={() => _resetPassword()}
              txtStyle={styles.txt_confirm_email_btn}
              styleBtn={styles.field_btn_reset_password}
              isDisabled={(_.size(value) == 6 && passwordValidation(password) && repeatPasswordValidation(repeatPassword)) ? false : true} />

            <TouchableOpacity
              onPress={() => navigate('Login')}
              style={styles.btn_return_login}>
              <Text style={styles.txt_return}>{lang.return_to} </Text>
              <Text style={styles.txt_return_to_login}>{lang.login}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
export { ResetPassword };