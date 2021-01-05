import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, StatusBar, ScrollView } from 'react-native';
import lang from '../../lang/Language';
import { Indicator, ListItem, TouchBtn, ListItemSeparator } from '../common/common_components/index';
import { ServiceConnection_Statistics, ServiceConnection_CallHistory } from '../../config/api/index';
import styles from './styles/DashboardStyle';
import images from '../../assets/img_paths/images';
import { StatisticsTableItem } from './common_components/index';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from 'react-navigation-hooks';
import _ from 'lodash';

const Dashboard = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [statistics, setStatistics] = useState({
    total_calls: '',
    saved_time: {},
    saved_money: {},
    score: ''
  });
  const [CallHistory, setCallHistory] = useState();
  let [listState, setListState] = useState({ page: 1, isLoading: false, isRefreshing: false });
  const [pageCount, setPageCount] = useState(1);

  const { navigate } = useNavigation();

  useEffect(() => {
    _getStatistics();
    _getCallHistory();
  }, []);
  _getStatistics = async () => {
    const responseStatistics = await ServiceConnection_Statistics();
    if (responseStatistics.success) {
      await setStatistics({
        total_calls: responseStatistics.result.total_calls,
        saved_time: responseStatistics.result.saved_time,
        saved_money: responseStatistics.result.saved_money,
        score: responseStatistics.result.score
      });
      setShowIndicator(false);
    }
    else if (responseStatistics == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _getCallHistory = async (page) => {
    const responseCallHistory = await ServiceConnection_CallHistory(page);
    if (responseCallHistory.success) {
      let callHistory = responseCallHistory.result.call_history;
      setCallHistory(callHistory);
      setPageCount(responseCallHistory.result.page_count);
      setListState({ isRefreshing: false })
    }
    else if (responseCallHistory == "unauthorization") {
      AsyncStorage.removeItem("@token") && AsyncStorage.removeItem("@token");
      setShowIndicator(false);
      navigate("Login");
    }
  };
  _handleRefresh = () => {
    setListState({ isRefreshing: true }, () => {
      _getCallHistory();
    });
  };
  _handleLoadMore = () => {
    if (pageCount > page) {
      setListState({ page: page + 1 }, () => {
        _getCallHistory(page);
      });
    }
  };
  const { isRefreshing, page } = listState;
  const { total_calls, saved_time, saved_money, score } = statistics;
  return (
    <ScrollView style={styles.field_dashboard}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8732" />
      {showIndicator && <Indicator />}
      <View>
        {statistics && (
          <>
            <View style={styles.field_table}>
              <View style={styles.flex_direction_row}>
                <StatisticsTableItem
                  data={total_calls}
                  style={styles.border_dashboard_table_left}
                  langDesc={lang.total_calls}
                  langUnitDesc={lang.times}
                  img={images.total_calls}
                  iconBgColor={{ backgroundColor: '#C3ECF1' }}
                />
                <StatisticsTableItem
                  data={saved_time.count}
                  style={styles.border_dashboard_table_right}
                  langDesc={lang.time_you_saved}
                  langUnitDesc={saved_time.unit}
                  img={images.icon_clock}
                  iconBgColor={{ backgroundColor: '#FDDBC1' }}
                />
              </View>
            </View>
            <View style={styles.vertical_space} />
            <View style={styles.field_table}>
              <View style={styles.flex_direction_row}>
                <StatisticsTableItem
                  data={saved_time.count}
                  style={styles.border_dashboard_table_left}
                  langDesc={lang.money_you_saved}
                  langUnitDesc={saved_money.currency}
                  img={images.icon_money}
                  iconBgColor={{ backgroundColor: '#B7DFC5' }}
                />
                <StatisticsTableItem
                  data={score}
                  style={styles.border_dashboard_table_right}
                  langDesc={lang.score_avg}
                  img={images.icon_star}
                  iconBgColor={{ backgroundColor: '#BEE4FC' }}
                />
              </View>
            </View>
          </>
        )}
        {CallHistory &&
          (_.size(CallHistory) > 0 ? (
            <View style={styles.list_margin_top}>
              <View style={styles.field_call_history_title}>
                <Text style={styles.txt_call_history}>{lang.call_history}</Text>
              </View>
              <View style={styles.field_flatlist}>
                <FlatList
                  data={CallHistory}
                  scrollEnabled={false}
                  ItemSeparatorComponent={ListItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  refreshing={isRefreshing}
                  onRefresh={_handleRefresh}
                  onEndReached={_handleLoadMore}
                  onEndThreshold={0}
                  renderItem={({ item, index }) => (
                    <ListItem item={item} index={index} />
                  )}
                />
              </View>
            </View>
          ) : (
              <View style={styles.field_empty_dashboard}>
                <View style={styles.icon_no_comment}>
                  <Image source={images.icon_phone_empty_dashboard} resizeMode='contain' />
                </View>
                <View style={styles.field_no_comment_desc}>
                  <Text style={styles.txt_no_comment}>{lang.no_comment}</Text>
                </View>
                <View style={styles.field_btn_empty_dashboard}>
                  <TouchBtn
                    lang={lang.btn_touch}
                    func={() => { }}
                    txtStyle={styles.txt_empty_dashboard}
                    styleBtn={styles.field_btn_brand}
                    style={{ width: 400 }}
                  />
                </View>
              </View>
            ))}
      </View>
    </ScrollView>
  );
};
export { Dashboard };