import { StyleSheet, Dimensions, Platform } from 'react-native';
import CommonStyles from '../../common/CommonStyles';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  field_company_info: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  field_company_information: {
    margin: 10
  },
  img_company: {
    width: 70,
    height: 70,
    marginVertical: 20,
    alignSelf: 'center'
  },
  title: {
    color: '#999999',
    fontSize: 13,
    fontFamily: 'Roboto-Bold'
  },
  txt_info: {
    color: '#FA8732',
    fontSize: 13,
    fontFamily: 'Roboto-Regular'
  },
  txt_info_rating: {
    color: '#FA8732',
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    marginLeft: 18
  },
  txt_review_rating: {
    color: '#FA8732',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
    marginLeft: 18,
    marginTop: 10
  },
  txt_no_rating: {
    color: '#999999',
    fontSize: 13,
    fontFamily: 'Roboto-Regular'
  },
  txt_reviews: {
    color: '#666666',
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    marginLeft: 18
  },
  txt_touch: {
    height: 40,
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    justifyContent: 'center',
    color: '#FFFFFF',
    paddingVertical: Platform.OS === 'ios' ? 12 : 10
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 40
  },
  txt_touch_btn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    height: 40
  },
  icon_touch_phone: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 15
  },
  field_company_info_txt: {
    flexDirection: 'row',
    marginTop: 126,
    left: 31,
    position: 'absolute'
  },
  field_company_info_txt_website: {
    flexDirection: 'row',
    marginTop: 152,
    left: 78,
    position: 'absolute'
  },
  field_company_info_txt_category: {
    flexDirection: 'row',
    marginTop: 178,
    left: 73,
    position: 'absolute'
  },
  field_company_info_txt_rating: {
    flexDirection: 'row',
    marginTop: 204,
    left: 87,
    position: 'absolute'
  },
  field_touch_btn: {
    position: 'absolute',
    top: 230,
    alignSelf: 'center'
  },
  btn_touch: {
    marginTop: 46.5,
    marginBottom: 20,
    width: 204
  },
  txt_number_zero: {
    marginTop: 12.5,
    marginRight: -7.5,
    marginLeft: 2.5,
    color: '#666666',
    fontSize: 9,
    fontFamily: 'Roboto-Bold'
  },
  txt_number_ten: {
    marginTop: 12.5,
    marginLeft: -10,
    fontSize: 8,
    color: '#666666',
    fontFamily: 'Roboto-Bold'
  },
  img_no_review: {
    width: 55,
    height: 47,
    alignSelf: 'center',
    position: 'absolute',
    top: 360
  },
  txt_no_any_company_comment: {
    alignSelf: 'center',
    position: 'absolute',
    top: 425,
    color: '#999999',
    fontSize: 13,
    fontFamily: 'Roboto-Regular'
  },
  txt_comment: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#666666',
    margin: 5,
    marginBottom: 10
  },
  txt_comment_count: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#666666',
    marginVertical: 5
  },
  field_flatlist: {
    width: screenWidth - 21,
    borderRadius: 5,
    borderColor: '#1B0000',
    backgroundColor: '#FFFFFF',
    margin: 2,
    ...CommonStyles.shadow
  },
  progress_bar_rating: {
    width: 124,
    height: 18,
    marginLeft: 3,
    borderRadius: 4.8,
    transform: [{ scaleX: 1.0 }, { scaleY: 1.5 }]
  },
  progress_bar_rating_ios: {
    marginTop: 7.5,
    backgroundColor: '#E5E5E5',
    width: 124,
    marginLeft: 3,
    borderRadius: 4.8,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.0 }]
  },
  flex_direction_column: {
    flexDirection: 'column'
  },
  flex_direction_row: {
    flexDirection: 'row'
  },
  field_review_txt: {
    flexDirection: 'row',
    width: screenWidth * 0.7
  },
  field_review_top: {
    marginTop: 250
  },
  img_review_user: {
    width: 35,
    height: 35,
    borderRadius: 70,
    marginTop: 15,
    marginLeft: 15
  },
  content_review: {
    flexDirection: 'column',
    width: '85%'
  },
  txt_review: {
    marginTop: 17,
    marginLeft: 18,
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    flexWrap: 'wrap'
  },
  txt_is_review_correct: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#999999',
    marginTop: 11,
    marginLeft: 14,
    flexWrap: 'wrap'
  },
  field_review_replies: {
    flexDirection: 'row',
    position: 'absolute',
    right: -30
  },
  review_is_yes: {
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 9,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10.5,
    borderColor: '#009C00',
    backgroundColor: '#E8F6E7',
    width: 50,
    height: 21
  },
  review_is_no: {
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 9,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10.5,
    borderColor: '#FF0619',
    backgroundColor: '#FEE9EA',
    width: 50,
    height: 21
  },
  no_any_review: {
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 9,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10.5,
    borderColor: '#CCCCCC',
    width: 50,
    height: 21
  },
  yes_review_txt: {
    fontFamily: 'Roboto-Regular',
    color: '#009C00',
    fontSize: 9
  },
  no_review_txt: {
    fontFamily: 'Roboto-Regular',
    color: '#FF0619',
    backgroundColor: '#FEE9EA',
    fontSize: 9
  },
  no_any_review_txt: {
    fontFamily: 'Roboto-Regular',
    color: '#CCCCCC',
    fontSize: 9
  },
  field_list: {
    flexDirection: 'row',
    marginBottom: 10
  }
});
export default styles;