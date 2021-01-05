import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import _msgToast from '../../screens/common/common_components/ResponseHandlerModal';
import lang from '../../lang/Language';

/**
 * Api Request Function
 * @param {String} url
 * @param {String} requestType
 * @param {Object} requestParams
 */
const _ApiRequest = async (url, requestType, requestParams, isShownSuccessfulResponseMsg) => {
  return new Promise(async (resolve, reject) => {
    const tokenType = await AsyncStorage.getItem('@tokenType');
    const token = await AsyncStorage.getItem('@token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${token}`,
    };
    try {
      const request = {
        method: requestType,
        url: url,
        headers: headers,
        data: requestParams,
      };
      const result = await axios(request);
      if (result) {
        if (result.data.status_code == 200) {
          isShownSuccessfulResponseMsg === true && _msgToast("ok", result.data.message);
          resolve(result.data);
        }
      }
    } catch (err) {
      if (err.response.data) {
        if (err.response.status == 401) {
          _msgToast('error', err.response.data.error.message);
          resolve("unauthorization")
        } else {
          _msgToast('error', err.response.data.error.message);
          resolve(err.response.data);
        }
      } else {
        _msgToast('error', lang.something_went_wrong);
      }
    }
  });
};
export default _ApiRequest;