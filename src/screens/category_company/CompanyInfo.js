import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS, Platform, FlatList, StatusBar, ScrollView } from 'react-native';
import { Indicator, ListItemSeparator, TouchBtn, OpenURLButton } from '../common/common_components/index';
import { ServiceConnection_CompanyInfo, ServiceConnection_CompanyReviews, ServiceConnection_VoteToReview, ServiceConnection_CallHistoryByCompany } from '../../config/api/ApiFunctions';
import images from '../../assets/img_paths/images';
import lang from '../../lang/Language';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import _ from 'lodash';
import styles from './styles/CompanyInfoStyle';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

const CompanyInfo = ({ navigation }) => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyReviews, setCompanyReviews] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const { navigate } = useNavigation();
  const companyInfoData = useSelector(companyInfoData => companyInfoData.companyInfo.companyInfo);

  useEffect(() => {
    _getCompanyInfo(companyInfoData.companyId);
    _getCompanyReviews(companyInfoData.companyId);
    navigation.setParams({
      title: companyInfoData.companyName
    });
  }, []);

  _getCompanyInfo = async () => {
    const responseCompanyInfo = await ServiceConnection_CompanyInfo(companyInfoData.companyId);
    if (responseCompanyInfo.success) {
      await setCompanyInfo(responseCompanyInfo.result);
      setShowIndicator(false);
    }
    else if (responseCompanyInfo == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getCompanyReviews = async () => {
    const responseCompanyReviews = await ServiceConnection_CompanyReviews(
      companyInfoData.companyId);
    if (responseCompanyReviews.success) {
      await setCompanyReviews(responseCompanyReviews.result.reviews);
      setShowIndicator(false);
    }
    else if (responseCompanyReviews == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };

  _vote = async (index, reviewId, status) => {
    let data = {
      "reviewId": reviewId,
      "userVote": status
    }
    const responseVoteToReview = await ServiceConnection_VoteToReview(data);
    if (responseVoteToReview.success) {
      companyReviews[index].user_vote = status;
      let companyReviewStatus = companyReviews[index].user_vote;
      setIsVoted(!isVoted);
      setCompanyReviews(companyReviews)
    }
  }
  _checkAndNavigate = async () => {
    setShowIndicator(true);
    const responseCallHistoryByCompany = await ServiceConnection_CallHistoryByCompany(companyInfoData.companyId);
    if (responseCallHistoryByCompany.result.call_history && _.size(responseCallHistoryByCompany.result.call_history.services) > 0) {
      setShowIndicator(false);
      navigate('CallHistoryByCompany', { callHistoryByCompanyData: responseCallHistoryByCompany.result.call_history });
    }
    else {
      setShowIndicator(false);
      navigate('IVRNode');
    }
  }
  return (
    <SafeAreaView style={styles.field_company_info}>
      {showIndicator && <Indicator />}
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      <ScrollView>
        {/* <TouchableOpacity onPress={() => navigate('CompanyCall')}>
          <Text>Company Call</Text>
        </TouchableOpacity> */}
        {_.size(companyInfo) > 0 && (
          <View style={styles.field_company_information}>
            <View>
              <Image
                source={{ uri: companyInfo.img_path }}
                style={styles.img_company}
              />
              <View style={styles.field_company_info_txt}>
                <Text style={styles.title}>{lang.companies_name}: </Text>
                <Text style={styles.txt_info}>{companyInfo.name}</Text>
              </View>
              <View style={styles.field_company_info_txt_website}>
                <Text style={styles.title}>{lang.website}: </Text>
                <OpenURLButton url={companyInfo.website} >{companyInfo.website}</OpenURLButton>
              </View>
              <View style={styles.field_company_info_txt_category}>
                <Text style={styles.title}>{lang.category}: </Text>
                <Text style={styles.txt_info}>{companyInfo.category}</Text>
              </View>
              <View style={styles.field_company_info_txt_rating}>
                <Text style={styles.title}>{lang.rating}: </Text>
                {companyInfo.rating ? (
                  <>
                    <Text style={styles.txt_number_zero}>0</Text>
                    {
                      Platform.OS == 'ios' ?
                        <ProgressViewIOS
                          style={styles.progress_bar_rating_ios}
                          progressTintColor="#FA8732"
                          indeterminate={false}
                          progressViewStyle='bar'
                          progress={companyInfo.rating * 0.1}
                        />
                        :
                        <ProgressBarAndroid
                          styleAttr="Horizontal"
                          indeterminate={false}
                          style={styles.progress_bar_rating}
                          progress={companyInfo.rating * 0.1}
                        />
                    }
                    <Text style={styles.txt_number_ten}>10</Text>
                  </>
                ) : (
                    <View />
                  )}
                <View style={styles.flex_direction_column}>
                  <Text
                    style={
                      companyInfo.rating
                        ? styles.txt_info_rating
                        : styles.txt_no_rating
                    }>
                    {companyInfo.rating ? companyInfo.rating : lang.no_rated_yet}
                  /10
                </Text>
                  <Text style={styles.txt_reviews}>
                    {companyInfo.review_count}{' '}
                    {companyInfo.reviews ? lang.reviews : lang.reviews}
                  </Text>
                </View>
              </View>
              <View style={styles.field_touch_btn}>
                <TouchBtn
                  lang={lang.touch}
                  func={() => _checkAndNavigate()}
                  isThereImage={true}
                  imgPath={images.icon_touch_phone}
                  imgStyle={styles.icon_touch_phone}
                  styleBtn={styles.btn_touch}
                  txtStyle={styles.txt_touch}
                />
              </View>
              {_.size(companyReviews) < 1 ? (
                <>
                  <Image
                    source={images.icon_no_company_comment}
                    style={styles.img_no_review}
                  />
                  <Text style={styles.txt_no_any_company_comment}>
                    {lang.no_any_company_comment}
                  </Text>
                </>
              ) : (
                  <>
                    <View style={styles.field_review_top} />
                    <View style={styles.flex_direction_row}>
                      <Text style={styles.txt_comment}>{lang.comments}</Text>
                      {_.size(companyReviews) > 0 && (
                        <Text style={styles.txt_comment_count}>
                          ({_.size(companyReviews)})
                        </Text>
                      )}
                    </View>
                    <View style={styles.field_flatlist}>
                      <FlatList
                        data={companyReviews}
                        scrollEnabled={false}
                        extraData={isVoted}
                        ItemSeparatorComponent={ListItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item, index) => (
                          <View style={styles.field_list}>
                            <Image
                              source={{ uri: item.item.user_img_path }}
                              style={styles.img_review_user} />
                            <View style={styles.content_review}>
                              <Text style={styles.txt_review}>{item.item.review}</Text>
                              <View style={styles.field_review_txt}>
                                <Text style={styles.txt_review_rating}>{item.item.rating}/10</Text>
                                <Text style={styles.txt_is_review_correct}>{lang.is_comment_correct}</Text>
                                <View style={styles.field_review_replies}>
                                  <TouchableOpacity style={item.item.user_vote === null ? styles.no_any_review : item.item.user_vote === false ? styles.no_any_review : styles.review_is_yes} onPress={() => _vote(item.index, item.item.reviewId, true)}>
                                    <Text style={item.item.user_vote === null ? styles.no_any_review_txt : item.item.user_vote === true ? styles.yes_review_txt : styles.no_any_review_txt}>{lang.yes} ({item.item.number_of_users_agreed_the_review})</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={item.item.user_vote === null ? styles.no_any_review : item.item.user_vote === false ? styles.review_is_no : styles.no_any_review} onPress={() => _vote(item.index, item.item.reviewId, false)}>
                                    <Text style={item.item.user_vote === null ? styles.no_any_review_txt : item.item.user_vote === true ? styles.no_any_review_txt : styles.no_review_txt}>{lang.no} ({item.item.number_of_users_disagreed_the_review})</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export { CompanyInfo };