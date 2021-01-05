import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import images from '../../assets/img_paths/images';
import lang from '../../lang/Language';
import styles from './styles/LoginSignupStyle';
import { TouchBtn, Indicator } from '../common/common_components/index';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceConnection_VerificationCode } from '../../config/api/index';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import _ from 'lodash';

const CELL_COUNT = 6;
const ConfirmEmail = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [showIndicator, setShowIndicator] = useState(true);
  const responseSignup = useNavigationParam('responseSignup');
  const email = useNavigationParam('email');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setTimeout(() => setShowIndicator(false), 1000);
  }, []);
  _confirmCode = async () => {
    if (value.length == 6) {
      let data = await { code: value };
      navigate('Dashboard');
      const responseConfirmCode = await ServiceConnection_VerificationCode(data);
      if (responseConfirmCode.success) _setInfo();
    }
  };
  _setInfo = async () => {
    const userInfo = await responseSignup.result;
    await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
    const token = await userInfo.token;
    const tokenType = await userInfo.token_type;
    await AsyncStorage.multiSet([['@token', token], ['@tokenType', tokenType]]);
    navigate('Dashboard');
  };
  return (
    <View style={styles.field_login}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      {showIndicator && <Indicator />}
      <View style={styles.field_confirm_email}>
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
        <TouchBtn
          lang={lang.confirm_email}
          func={() => _confirmCode()}
          txtStyle={styles.txt_confirm_email_btn}
          styleBtn={styles.field_btn_confirm_code}
          isDisabled={_.size(value) == 6 ? false : true}
        />
      </View>
    </View>
  );
};
export { ConfirmEmail };
