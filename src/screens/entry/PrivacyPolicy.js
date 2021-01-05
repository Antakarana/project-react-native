import React, { useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import styles from './styles/LoginSignupStyle';
import lang from '../../lang/Language';
import { WebView } from 'react-native-webview';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Indicator,TouchBtn } from '../common/common_components/index';

const screenWidth = Math.round(Dimensions.get('window').width);

const PrivacyPolicy = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [showIndicator, setShowIndicator] = useState(true);
  const isThereAcceptBtn = useNavigationParam('isThereAcceptBtn');

  return (
    <View style={styles.field_login}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      {showIndicator && <Indicator />}
      <WebView
        source={{
          uri: 'https://www.tegsoft.com/tegsoft-data-and-privacy-policy/bize',
        }}
        onLoad={() => setShowIndicator(false)}
      />
      {isThereAcceptBtn && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#FFFFFF',
            width: screenWidth,
          }}>
          <TouchBtn
            lang={lang.accept}
            func={() => navigate('SignupWithEmail', { isChecked: true })}
            styleBtn={styles.btn_accept}
            txtStyle={styles.txt_login}
          />
        </View>
      )}
    </View>
  );
};
export { PrivacyPolicy };
