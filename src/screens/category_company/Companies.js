import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Keyboard, View, FlatList, StatusBar, TextInput, Image, Text, ScrollView, BackHandler, TouchableHighlight } from 'react-native';
import { Header, Button, Content } from 'native-base';
import lang from '../../lang/Language';
import { Indicator } from '../common/common_components/index';
import {
  ServiceConnection_TrendingCompanies,
  ServiceConnection_LastCalledCompanies,
  ServiceConnection_MayBeInterestedCompanies,
  ServiceConnection_FavouriteCompanies,
  ServiceConnection_Categories,
  ServiceConnection_SearchAndListCompanies,
  ServiceConnection_CompaniesByCategory,
} from '../../config/api/index';
import styles from './styles/CompaniesStyle';
import images from '../../assets/img_paths/images';
import { CompanyItem } from './common_components/index';
import { SearchListItem, ListItemSeparator } from '../common/common_components/index';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from 'react-navigation-hooks';
import Voice from '@react-native-community/voice';

const Companies = ({ navigation }) => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isThereCompanyFromSearching, setIsThereCompanyFromSearching] = useState(false);
  const [isSelectedCategory, setIsSelectedCategory] = useState(false);
  const [trendingCompanies, setTrendingCompanies] = useState([]);
  const [favouriteCompanies, setFavouriteCompanies] = useState([]);
  const [mayBeInterestedCompanies, setMayBeInterestedCompanies] = useState([]);
  const [lastCalledCompanies, setLastCalledCompanies] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [searchingCompanies, setSearchingCompanies] = useState([]);
  const [companiesByCategory, setCompaniesByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isThereEnteredText, setIsThereEnteredText] = useState(false);
  const { navigate } = useNavigation();
  /** Voice (Microphone) Variables -Start-*/
  const [started, setStarted] = useState("");
  const [recognized, setRecognized] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [pitch, setPitch] = useState("");
  const [result, setResult] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  /** Voice (Microphone) Variables -End-*/
  const [startRecognizingValue, setStartRecognizingValue] = useState(false);
  const [isFinishedVoiceRegister, setIsFinishedVoiceRegister] = useState(false);

  let [trendingCompaniesListState, setTrendingCompaniesListState] = useState({ page: 1, isRefreshing: false });
  const [pageCount, setPageCount] = useState(1);

  const backAction = () => {
    setIsOnFocus(false);
    setSearchText('');
    setIsThereEnteredText(false);
    setIsThereCompanyFromSearching(false);
    setIsSelectedCategory(false);
    return true;
  };

  useEffect(() => {
    _getLastCalledCompanies();
    _getFavouriteCompanies();
    _getMayBeInterestedCompanies();
    _getTrendingCompanies();
    /** Start Voice (Microphone) Functions */
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    /** Finish Voice (Microphone) Functions */
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.log('isOnFocus ', isOnFocus);
  }, [isOnFocus]);

  _getLastCalledCompanies = async () => {
    const responseLastCalledCompanies = await ServiceConnection_LastCalledCompanies();
    if (responseLastCalledCompanies.success) {
      await setLastCalledCompanies(
        responseLastCalledCompanies.result.companies,
      );
    }
    else if (responseLastCalledCompanies == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getFavouriteCompanies = async () => {
    const responseFavouriteCompanies = await ServiceConnection_FavouriteCompanies();
    if (responseFavouriteCompanies.success) await setFavouriteCompanies(responseFavouriteCompanies.result.companies);
    else if (responseFavouriteCompanies == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getMayBeInterestedCompanies = async () => {
    const responseMayBeInterestedCompanies = await ServiceConnection_MayBeInterestedCompanies();
    if (responseMayBeInterestedCompanies.success) await setMayBeInterestedCompanies(responseMayBeInterestedCompanies.result.companies);
    else if (responseMayBeInterestedCompanies == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getTrendingCompanies = async (page) => {
    const responseTrendingCompanies = await ServiceConnection_TrendingCompanies(page);
    if (responseTrendingCompanies.success) {
      setPageCount(responseTrendingCompanies.result.page_count);
      await setTrendingCompanies(responseTrendingCompanies.result.companies);
      setTimeout(() => setShowIndicator(false), 1000);
    }
    else if (responseTrendingCompanies == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getCategories = async () => {
    const responseCategories = await ServiceConnection_Categories();
    if (responseCategories.success) await setCategories(responseCategories.result.categories);
    else if (responseCategories == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _searchAndListCompanies = async (searchedText, startRecognizingValue) => {
    if (searchedText.length > 0) {
      setIsOnFocus(true);
      setIsThereEnteredText(true);
      setSearchText(searchedText);
    } else {
      setIsThereEnteredText(false);
      setIsThereCompanyFromSearching(false);
      setSearchText('');
    }
    if (searchedText.length > 2) {
      setIsThereEnteredText(true);
      setSearchText(searchedText);
      const responseSearchAndListCompanies = await ServiceConnection_SearchAndListCompanies(searchedText);
      if (responseSearchAndListCompanies.success) {
        await setSearchingCompanies(responseSearchAndListCompanies.result.companies);
        setIsThereCompanyFromSearching(true);
        if (startRecognizingValue === true) {
          setStartRecognizingValue(false);
        }
      }
      else if (responseSearchAndListCompanies == "unauthorization") {
        AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
        setShowIndicator(false);
        navigate("Login");
      }
    }
    else setIsThereCompanyFromSearching(false);
  };
  _getCompaniesByCategory = async (categoryId, categoryName) => {
    setShowIndicator(true);
    const responseCompaniesByCategory = await ServiceConnection_CompaniesByCategory(categoryId);
    if (responseCompaniesByCategory.success) {
      await setIsOnFocus(false);
      await setCategoryName(categoryName);
      await setCompaniesByCategory(responseCompaniesByCategory.result.companies);
      setIsSelectedCategory(true);
      setIsThereCompanyFromSearching(false);
      Keyboard.dismiss();
      setShowIndicator(false);
      navigate('CompaniesByCategory', { selectedCategory: categoryName, companiesByCategory: responseCompaniesByCategory.result.companies });
    }
    else if (responseCompaniesByCategory == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
    else setShowIndicator(false);
  };
  _onFocus = async () => {
    await setIsOnFocus(true);
    await _getCategories();
  };
  _setFocusAndDismissKeyboard = async () => {
    setIsOnFocus(false);
    setIsThereCompanyFromSearching(false);
    setIsSelectedCategory(false);
  };
  _openDrawer = () => {
    setIsThereCompanyFromSearching(false);
    navigation.openDrawer();
  };
  _closeDrawer = () => {
    navigation.closeDrawer();
  };
  _clearInput = () => {
    setSearchText('');
    setIsThereEnteredText(false);
    setIsThereCompanyFromSearching(false);
  };
  _backInput = async () => {
    setIsOnFocus(false);
    setSearchText('');
    setIsThereEnteredText(false);
    setIsSelectedCategory(false);
    setIsThereCompanyFromSearching(false);
  };
  _handleRefresh = () => {
    setTrendingCompaniesListState({ isRefreshing: true }, () => {
      _getTrendingCompanies();
    });
  };
  _handleLoadMore = () => {
    if (pageCount > page) {
      setTrendingCompaniesListState({ page: page + 1 }, () => {
        _getTrendingCompanies(page);
      });
    }
  };

  /** Voice (Microphone) Functions -Start- */
  onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  onSpeechRecognized = (e) => {
    setRecognized('√');
  };

  onSpeechEnd = (e) => {
    console.log('onSpeechEnd ---------------- : ', e);
    setIsFinishedVoiceRegister(true);
    setEnd('√');
  };

  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    setResult(e.value);
  };

  onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };
  /** Voice (Microphone) Functions -End- */

  _startRecognizing = async () => {
    setStartRecognizingValue(true)
    setRecognized("");
    setStarted("");
    setEnd("");
    setError("");
    setPartialResults([]);
    try {
      await Voice.start('tr-TR');
    } catch (e) {
      console.error(e);
    }
  };
  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setRecognized("");
    setStarted("");
    setEnd("");
    setError("");
    setPartialResults([]);
  };
  const { isRefreshing, page } = trendingCompaniesListState;
  return (
    <View style={styles.field_companies}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      {showIndicator && <Indicator />}
      <Header
        style={styles.field_header}
        androidStatusBarColor="#FA8732"
        iosBarStyle="light-content">
        <View style={styles.header_body}>
          {isOnFocus ||
            (isSelectedCategory && !isOnFocus && !isThereCompanyFromSearching) ? (
              <Button
                transparent
                onPress={() => _backInput()}
                style={styles.btn_icon}>
                <Image
                  source={images.icon_left_arrow}
                  styles={styles.icon_left}
                />
              </Button>
            ) : (
              <TouchableOpacity
                onPress={() => _openDrawer()}
                style={styles.btn_icon}>
                <Image source={images.icon_menu} style={styles.icon_menu} />
              </TouchableOpacity>
            )}
          <>
            <TextInput
              style={styles.input_search}
              placeholder={lang.search_to_touch}
              onFocus={() => _onFocus()}
              value={searchText}
              autoCapitalize="none"
              onChangeText={text => _searchAndListCompanies(text)}
              underlineColorAndroid="transparent"
              selectionColor={'#FA8732'}
            />
            {isThereEnteredText ? (
              <Button
                transparent
                onPress={() => _clearInput()}
                style={styles.btn_delete_input}>
                <Image
                  source={images.icon_delete_input}
                  style={styles.icon_delete_input}
                  resizeMode="stretch"
                />
              </Button>
            ) : (
                <TouchableOpacity style={styles.btn_icon_microphone} onPress={_startRecognizing}>
                  <Image source={images.icon_microphone} style={styles.icon_microphone} />
                </TouchableOpacity>
              )}

          </>
        </View>
      </Header>
      {
        isFinishedVoiceRegister === true ?
          partialResults.map((result, index) => {
            _searchAndListCompanies(result, startRecognizingValue);
            setIsFinishedVoiceRegister(false);
          })
          : null
      }
      <Content>
        {isOnFocus === false && Keyboard.dismiss()}
        {isOnFocus && !isThereCompanyFromSearching ? (
          <ScrollView style={styles.field_categories} keyboardShouldPersistTaps='handled'>
            <View style={styles.subfield_categories}>
              <Text style={styles.txt_categories}>{lang.categories}</Text>
              <FlatList
                style={{ margin: 5 }}
                data={categories}
                scrollEnabled={false}
                keyboardShouldPersistTaps='handled'
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={item => (
                  <TouchableOpacity
                    onPress={() =>
                      _getCompaniesByCategory(
                        item.category_id,
                        item.item.name
                      )}>
                    <View style={styles.item_category}>
                      <View style={styles.field_icon_category}>
                        <Image
                          source={{ uri: item.item.img_path }}
                          resizeMode="contain"
                          style={styles.icon_categories}
                        />
                      </View>
                    </View>
                    <Text style={styles.txt_category}>{item.item.name}</Text>
                  </TouchableOpacity>
                )} />
            </View>
          </ScrollView>
        ) : isOnFocus && isThereCompanyFromSearching ? (
          <View style={styles.shadow_flatlist}>
            <FlatList
              data={searchingCompanies}
              ItemSeparatorComponent={ListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SearchListItem
                  item={item}
                  index={index}
                  lang={lang.reviews}
                  isList={true} />
              )} />
          </View>
        ) : (
              <ScrollView>
                {lastCalledCompanies && lastCalledCompanies.length > 0 && (
                  <CompanyItem
                    data={lastCalledCompanies}
                    lang={lang.last_called_companies} />
                )}
                {favouriteCompanies && favouriteCompanies.length > 0 && (
                  <CompanyItem
                    data={favouriteCompanies}
                    lang={lang.your_favourite_companies} />
                )}
                {mayBeInterestedCompanies &&
                  mayBeInterestedCompanies.length > 0 && (
                    <CompanyItem
                      data={mayBeInterestedCompanies}
                      lang={lang.you_may_be_interested} />
                  )}
                {trendingCompanies && trendingCompanies.length > 0 && (
                  <View style={styles.field_company}>
                    <View style={styles.trending_companies}>
                      <Text style={styles.title_on_companies}>
                        {lang.trending_companies}
                      </Text>
                    </View>
                    <View style={styles.shadow_flatlist}>
                      <FlatList
                        data={trendingCompanies}
                        scrollEnabled={false}
                        ItemSeparatorComponent={ListItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={isRefreshing}
                        onRefresh={_handleRefresh}
                        onEndReached={_handleLoadMore}
                        onEndThreshold={0}
                        renderItem={({ item, index }) => (
                          <SearchListItem
                            item={item}
                            index={index}
                            lang={lang.reviews}
                            isList={true} />
                        )} />
                    </View>
                  </View>
                )}
              </ScrollView>
            )}
      </Content>
    </View>
  );
};
export { Companies };