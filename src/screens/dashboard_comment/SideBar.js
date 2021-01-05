import React, { useState, useEffect } from 'react';
import { View, Image, Text, Share, Alert, Platform, Linking } from 'react-native';
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import styles from './styles/SideBarStyle';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import lang from '../../lang/Language';
import images from '../../assets/img_paths/images';
import { TouchBtn, DrawerItem, Divider } from '../common/common_components/index';

const SideBar = ({ navigation, props }) => {
  const { navigate } = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  let activeIndex = navigation.state.index;
  let activeRouteName = navigation.state.routes[activeIndex].routeName;
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    setActiveRoute(activeRouteName);
  }, [activeRouteName, activeRoute]);

  useEffect(() => {
    _getUserInfo();
  }, []);

  _getUserInfo = async () => {
    const userInformation = await AsyncStorage.getItem('@userInfo');
    const newUserInformation = await JSON.parse(userInformation);
    await setUserInfo(newUserInformation);
  };
  _logout = async () => {
    await AsyncStorage.removeItem('@token');
    navigation.navigate('Login');
  };
  _closeDrawerAndNavigate = async (directedScreen, params) => {
    navigation.closeDrawer();
    navigate(directedScreen, params);
  };
  const onShare = async () => {
    try {
      await Share.share({
        message: lang.share_the_app_desc,
        title: lang.tegsoft_touch,
        uri: images.logo_tegsoft
      })
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  _closeDrawerAndRate = async () => {
    navigation.closeDrawer();
    const APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/apple-store/com.tegsoft.touch?mt=8';
    const PLAY_STORE_LINK = 'market://details?id=com.tegsoft.touch';
    if (Platform.OS == 'ios') {
      Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
    }
    else {
      Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
    }
  }
  return (
    <StyleProvider style={getTheme(material)}>
      <Container style={styles.field_sidebar}>
        <Content>
          <View style={styles.subfield_profile}>
            <View style={styles.field_img_user}>
              <Image
                source={{ uri: userInfo.img_path ? userInfo.img_path : "" }}
                style={styles.img_user}
              />
            </View>
            <View style={styles.field_profile}>
              <Text style={styles.txt_menu_items_name_surname}>
                {userInfo.name ? userInfo.name : lang.name}{' '}
                {userInfo.surname ? userInfo.surname : lang.surname}
              </Text>
              <TouchBtn
                lang={lang.view_profile}
                func={() => _closeDrawerAndNavigate('MyProfile', {userInfo})}
                styleBtn={styles.btn_view_profile}
                txtStyle={styles.txt_btn_view_profile}
              />
            </View>
          </View>
          <View style={styles.field_drawer_items}>
            <DrawerItem
              iconName={'search'}
              onPressFunc={() => _closeDrawerAndNavigate('Companies')}
              lang={lang.search_to_touch}
              iconPath={images.icon_search}
              isBgColor={activeRouteName == 'CompaniesStack' ? true : false}
            />
            <Divider />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndNavigate('Dashboard')}
              lang={lang.my_dashboard}
              iconPath={images.icon_my_dashboard}
              isBgColor={activeRouteName == 'DashboardStack' ? true : false}
            />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndNavigate('MyFavourite')}
              lang={lang.my_favourites}
              iconPath={images.icon_my_favourite}
              isBgColor={activeRouteName == 'MyFavouriteStack' ? true : false}
            />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndNavigate('MyComment')}
              lang={lang.my_reviews}
              iconPath={images.icon_my_comments}
              isBgColor={activeRouteName == 'MyCommentStack' ? true : false}
            />
            <Divider />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndNavigate('AboutTheApp')}
              lang={lang.about_tegsoft_touch}
              iconPath={images.icon_about_tegsoft_touch}
              isBgColor={activeRouteName == 'AboutTheAppStack' ? true : false}
            />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndNavigate('PrivacyPolicy')}
              lang={lang.privacy_and_policy}
              iconPath={images.icon_privacy}
              isBgColor={activeRouteName == 'PrivacyPolicyStack' ? true : false}
            />
            <Divider />
            <DrawerItem
              onPressFunc={() => _closeDrawerAndRate()}
              lang={lang.rate_our_app}
              iconPath={images.icon_rate_our_app}
            />
            <DrawerItem
              onPressFunc={onShare}
              lang={lang.share_our_app}
              iconPath={images.icon_share_our_app}
            />
            <Divider />
            <DrawerItem
              onPressFunc={() => _logout()}
              lang={lang.logout}
              iconPath={images.icon_logout}
            />
          </View>
        </Content>
      </Container>
    </StyleProvider>
  );
};
export { SideBar };