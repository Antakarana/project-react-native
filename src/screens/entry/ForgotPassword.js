import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard,StatusBar } from 'react-native';
import images from '../../assets/img_paths/images';
import lang from '../../lang/Language';
import styles from './styles/LoginSignupStyle';
import { TouchBtn } from '../common/common_components/index';
import { ServiceConnection_ForgotPassword } from '../../config/api/index';
import { TxtInput } from './common_components/index';
import { useNavigation } from 'react-navigation-hooks';
import _ from 'lodash';

const EnterEmail = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');

  const emailValidation = (email) => {
    let reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    return reg.test(email);
  };

  _forgotPassword = async () => {
    if (_.size(email) > 1) {
      const responseForgotPassword = await ServiceConnection_ForgotPassword({
        email: email,
      });
      if (responseForgotPassword) {
        if (responseForgotPassword.success) {
          navigate('ResetPassword', { email: email });
        }
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.field_login}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
        <View style={styles.field_enter_email}>
          <Text style={styles.subtitle_write_email}>{lang.write_your_email}</Text>
          <Text style={styles.txt_confirm_email_desc}>
            {lang.send_link_to_change_password}
          </Text>
          <TxtInput
            placeholder={lang.email}
            onChangeText={(txt) => setEmail(txt.toLowerCase())}
            value={email}
            isLowerCase={true}
            iconPath={images.icon_avatar}
            keyboardType={'email-address'}
            validation={() => emailValidation(email)}
            errorText={lang.no_email_valid}
            isAutoCapitalization={true}
          />
          <TouchBtn
            lang={lang.send_me_link}
            func={() => _forgotPassword()}
            styleBtn={styles.btn_enter_email}
            txtStyle={styles.txt_login}
            isDisabled={emailValidation(email) == true ? false : true}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export { EnterEmail };