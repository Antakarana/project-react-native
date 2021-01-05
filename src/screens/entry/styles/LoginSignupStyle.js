import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  field_login: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  txt_login: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    paddingVertical: 5,
    textAlign: 'center'
  },
  subfield_login: {
    marginVertical: screenHeight * 0.16,
    alignItems: 'center'
  },
  logo_tegsoft: {
    marginBottom: 21
  },
  txt_login_with: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#717171',
    marginVertical: 15
  },
  field_social_media: {
    flexDirection: 'row'
  },
  icon_google_btn: {
    marginRight: 39
  },
  txt_or: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 43,
    marginBottom: 23
  },
  btn_login: {
    width: 204,
    height: 40
  },
  field_no_account: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  field_no_account_login: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: screenWidth / 5 + 25
  },
  txt_dont_have_account: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular'
  },
  txt_signup: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline'
  },
  img_footer: {
    width: screenWidth
  },
  img_footer_login: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth
  },
  field_login_with_email: {
    marginVertical: 43
  },
  field_signup_with_email: {
    marginVertical: 44,
    paddingBottom: 30,
    zIndex: 10
  },
  logo_tegsoft_login_email: {
    alignSelf: 'center',
    marginBottom: 15
  },
  logo_tegsoft_signup_email: {
    alignSelf: 'center',
    marginBottom: 20
  },
  input_login: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 11.2
  },
  input_phone_signup: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 19,
    paddingLeft: 40,
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    marginTop: -30,
    marginVertical: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 11.2
  },
  input_phone_signup_success: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    marginHorizontal: 18,
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomColor: '#00A13F',
    borderRadius: 4,
    marginTop: -30,
    marginVertical: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 11.2
  },
  input_phone_signup_error: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    marginHorizontal: 18,
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomColor: '#FF0619',
    borderRadius: 4,
    marginTop: -30,
    marginVertical: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 11.2
  },
  input: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 40,
    fontSize: 11.2,
    marginVertical: -5
  },
  input_success: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderBottomColor: '#00A13F',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 40,
    fontSize: 11.2,
    marginVertical: -5
  },
  input_error: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0619',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 40,
    fontSize: 11.2,
    marginVertical: -5
  },
  icon_success_error: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 11,
    width: 12,
    height: 13
  },
  icon_input_login: {
    left: 30,
    top: 10,
    marginBottom: 20,
    zIndex: 5,
    width: 13,
    height: 14
  },
  icon_lock_signup: {
    marginHorizontal: 5,
    width: 13,
    height: 14,
    marginLeft: 32.5,
    marginTop: 20,
    zIndex: 10
  },
  txt_forgot_password: {
    marginTop: 8,
    color: '#FA8632',
    fontSize: 12,
    fontFamily: 'Roboto-Bold'
  },
  btn_login_email: {
    width: screenWidth * 0.544,
    alignSelf: 'center'
  },
  btn_signup_email: {
    width: screenWidth * 0.544,
    alignSelf: 'center',
    zIndex: 10
  },
  txt_sign_up: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#666666',
    textDecorationLine: 'underline'
  },
  txt_dont_have_account: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#666666'
  },
  field_privacy_policy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12.3,
    marginBottom: 32.7,
    zIndex: 10
  },
  checkbox: {
    marginLeft: 15,
    borderRadius: 2,
    color: '#F7921E',
    width: 18,
    height: 18
  },
  txt_read_and_accepted: {
    fontFamily: 'Roboto-Light',
    color: '#878787',
    fontSize: 12,
    marginLeft: 5
  },
  txt_privacy_policy: {
    fontFamily: 'Roboto-Bold',
    color: '#EDA700',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  field_confirm_email: {
    marginTop: 35
  },
  txt_confirm_email: {
    marginTop: 17,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#999999',
    alignSelf: 'center'
  },
  txt_confirm_email_desc: {
    marginVertical: 20,
    fontSize: 11.2,
    fontFamily: 'Roboto-Regular',
    color: '#ADADAD',
    alignSelf: 'center',
    textAlign: 'center',
    width: screenWidth * 0.66,
    flexWrap: 'wrap'
  },
  img_confirm_email: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  field_verification_code_number: {
    paddingHorizontal: screenWidth * 0.25
  },
  txt_confirm_email_btn: {
    color: '#FFFFFF',
    padding: 10,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center'
  },
  field_btn_confirm_code: {
    marginHorizontal: 85,
    marginVertical: 47
  },
  field_btn_reset_password: {
    marginHorizontal: 75,
    marginVertical: 28
  },
  txt_return: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#7D7D7D'
  },
  txt_return_to_login: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: '#7D7D7D',
    textDecorationLine: 'underline'
  },
  btn_return_login: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  icon_success: {
    width: 15,
    height: 11
  },
  icon_error: {
    width: 15,
    height: 15
  },
  icon_success_reset_password: {
    width: 56,
    height: 43
  },
  field_confirm_code: {
    backgroundColor: '#E5E5E5',
    marginHorizontal: 5,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_code: {
    fontSize: 24,
    color: '#FA8632',
    textAlign: 'center'
  },
  field_enter_email: {
    marginVertical: 43
  },
  subtitle_write_email: {
    marginVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#A3A3A3'
  },
  input_confirm_email: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 35,
    fontSize: 11.2,
    marginVertical: 15,
    marginHorizontal: 27.5
  },
  input_confirm_email_success: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderBottomColor: '#00A13F',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 35,
    fontSize: 11.2,
    marginVertical: 15,
    marginHorizontal: 27.5
  },
  input_confirm_email_error: {
    borderWidth: 0.8,
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0619',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    paddingLeft: 35,
    fontSize: 11.2,
    marginVertical: 15,
    marginHorizontal: 27.5
  },
  btn_enter_email: {
    width: screenWidth * 0.544,
    alignSelf: 'center',
    marginTop: 25
  },
  btn_accept: {
    width: screenWidth * 0.544,
    alignSelf: 'center',
    marginBottom: 24,
    marginVertical: 20
  },
  icon_input_enter_email: {
    left: 40,
    top: 45,
    zIndex: 5
  },
  btn_forgot_password: {
    marginLeft: 20
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'srgba(0,0,0,0.7)'
  },
  text_style: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon_error: {
    width: 52,
    height: 52
  },
  txt_error: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: '#FF0619',
    paddingTop: 12
  },
  txt_success_reset_password: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: '#FA8632',
    paddingTop: 20
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 22.5,
    marginLeft: 5,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  subfield_reset_password: {
    marginTop: 38
  },
  root: {
    flex: 1
  },
  code_filed_root: {
    marginVertical: 30,
    alignItems: 'center',
    alignSelf: 'center'
  },
  code_fied_container: {
    width: 25,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    overflow: "hidden"
  },
  cell: {
    flex: 1,
    fontSize: 24,
    backgroundColor: '#E5E5E5',
    color: '#FA8632',
    textAlign: 'center'
  },
  focus_cell: {
    backgroundColor: '#FA8632',
    color: '#FFFFFF',
    lineHeight: 27.5
  },
  txt_optional: {
    alignSelf: 'flex-end',
    right: 40,
    top: -20,
    marginTop: -18,
    fontSize: 11.2,
    fontFamily: 'Roboto-Regular',
    color: '#999999'
  },
});
export default styles;