import {
  mainURL,
  requestTypeGET,
  requestTypePOST,
  requestTypePUT,
  requestTypePATCH,
  requestTypeDELETE,
  extendLogin,
  extendSignup,
  extendVerificationCode,
  extendStatistics,
  extendCallHistory,
  extendCategories,
  extendTrendingCompanies,
  extendFavouriteCompanies,
  extendMayBeInterestedCompanies,
  extendLastCalledCompanies,
  extendVoteToReview,
  extendSearchAndListCompanies,
  extendCompaniesByCategory,
  extendForgotPassword,
  extendResetPassword,
  extendCompanyInfo,
  extendCompanyReviews,
  extendReviews,
  extendIVRNode,
  extendCallHistoryByCompany,
  extendCompaniesAddFavourites,
  extendUserReviews,
  extendDeleteReview
} from './path';
import _ApiRequest from './ApiRequest';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Login Api Function
 * @param {Object} data including email and password as Object
 * @return {Object}
 */
const ServiceConnection_Login = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendLogin;
    const requestParams = data;
    const responseLogin = await _ApiRequest(
      url,
      requestTypePOST,
      requestParams,
    );
    if (responseLogin.success) resolve(responseLogin);
  });
};

/**
 * Signup Api Function
 * @param {Object} data including email and password as Object
 * @return {Object}
 */
const ServiceConnection_Signup = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendSignup;
    const requestParams = data;
    const responseSignup = await _ApiRequest(
      url,
      requestTypePOST,
      requestParams,
    );
    if (responseSignup.success) resolve(responseSignup);
  });
};

/**
 * Verification Code Api Function
 * @param {String} data including code
 * @return {Object}
 */
const ServiceConnection_VerificationCode = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendVerificationCode;
    const requestParams = data;
    const responseVerificationCode = await _ApiRequest(
      url,
      requestTypePOST,
      requestParams,
      true
    );
    if (responseVerificationCode.success) resolve(responseVerificationCode);
  });
};

/**
 * Forgot Password Api Function
 * @param {String} data including email
 * @return {Object}
 */
const ServiceConnection_ForgotPassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendForgotPassword;
    const requestParams = data;
    const responseForgotPassword = await _ApiRequest(
      url,
      requestTypePOST,
      requestParams,
      true
    );
    if (responseForgotPassword.success) resolve(responseForgotPassword);
  });
};

/**
 * Reset Password Api Function
 * @param {Object} data including code and password as Object
 * @return {Object}
 */
const ServiceConnection_ResetPassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendResetPassword;
    const requestParams = data;
    const responseResetPassword = await _ApiRequest(
      url,
      requestTypePOST,
      requestParams,
      true
    );
    if (responseResetPassword.success) resolve(responseResetPassword);
  });
};

/**
 * Statistics Api Function
 * @return {Object}
 */
const ServiceConnection_Statistics = async () => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendStatistics;
    const responseStatistics = await _ApiRequest(url, requestTypeGET);
    if (responseStatistics.success) resolve(responseStatistics);
    else if (responseStatistics == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Call History Statisatics Api Function
 * @return {Object}
 */
const ServiceConnection_CallHistory = async (page_count) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCallHistory + `?page=${page_count}`;
    const responseCallHistory = await _ApiRequest(
      url,
      requestTypeGET,
    );
    if (responseCallHistory.success) resolve(responseCallHistory);
    else if (responseCallHistory == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Categories Api Function
 * @return {Object}
 */
const ServiceConnection_Categories = async () => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCategories;
    const responseCategories = await _ApiRequest(url, requestTypeGET);
    if (responseCategories.success) resolve(responseCategories);
    else if (responseCategories == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Trending Companies Api Function
 * @return {Object}
 */
const ServiceConnection_TrendingCompanies = async (page_count) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendTrendingCompanies + `?page=${page_count}`;
    const responseTrendingCompanies = await _ApiRequest(url, requestTypeGET);
    if (responseTrendingCompanies.success) resolve(responseTrendingCompanies);
    else if (responseTrendingCompanies == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Favourite Companies Api Function
 * @return {Object}
 */
const ServiceConnection_FavouriteCompanies = async () => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendFavouriteCompanies;
    const responseFavouriteCompanies = await _ApiRequest(url, requestTypeGET);
    if (responseFavouriteCompanies.success) resolve(responseFavouriteCompanies);
    else if (responseFavouriteCompanies == "unauthorization") resolve("unauthorization")
  });
};

/**
 * May Be Interested Companies Api Function
 * @return {Object}
 */
const ServiceConnection_MayBeInterestedCompanies = async () => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendMayBeInterestedCompanies;
    const responseMayBeInterestedCompanies = await _ApiRequest(
      url,
      requestTypeGET,
    );
    if (responseMayBeInterestedCompanies.success) resolve(responseMayBeInterestedCompanies);
    else if (responseMayBeInterestedCompanies == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Last Called Companies Api Function
 * @return {Object}
 */
const ServiceConnection_LastCalledCompanies = async () => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendLastCalledCompanies;
    const responseLastCalledCompanies = await _ApiRequest(url, requestTypeGET);
    if (responseLastCalledCompanies.success) resolve(responseLastCalledCompanies);
    else if (responseLastCalledCompanies == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Vote to Review Api Function
 * @param {Object} data including reviewId and userVote as Object
 * @return {Object}
 */
const ServiceConnection_VoteToReview = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendVoteToReview;
    const responseVoteToReview = await _ApiRequest(url, requestTypePOST);
    if (responseVoteToReview.success) resolve(responseVoteToReview);
    else if (responseVoteToReview == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Search And List Companies Api Function
 * @param {String} companyName
 * @return {Object}
 */
const ServiceConnection_SearchAndListCompanies = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendSearchAndListCompanies + data;
    const responseSearchAndListCompanies = await _ApiRequest(
      url,
      requestTypeGET,
    );
    if (responseSearchAndListCompanies.success) resolve(responseSearchAndListCompanies);
    else if (responseSearchAndListCompanies == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Companies by Category Api Function
 * @param {String} categoryId
 * @return {Object}
 */
const ServiceConnection_CompaniesByCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCompaniesByCategory + data;
    const responseCompaniesByCategory = await _ApiRequest(url, requestTypeGET);
    if (responseCompaniesByCategory.success) resolve(responseCompaniesByCategory);
    else if (responseCompaniesByCategory == "unauthorization") resolve("unauthorization")
  });
};

/**
 * Company Info Api Function
 * @param {String} companyId
 * @return {Object}
 */
const ServiceConnection_CompanyInfo = async data => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCompanyInfo + data;
    const responseCompanyInfo = await _ApiRequest(url, requestTypeGET);
    if (responseCompanyInfo.success) resolve(responseCompanyInfo);
    else if (responseCompanyInfo == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Company Reviews Api Function
 * @param 
 * @return {object}
 */
const ServiceConnection_CompanyReviews = async data => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCompanyReviews + data;
    const responseCompanyReviews = await _ApiRequest(url, requestTypeGET);
    if (responseCompanyReviews.success) resolve(responseCompanyReviews);
    else if (responseCompanyReviews == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Reviews Api Function
 * @param {Object} data including companyId, rating and review
 * @return {Object}
 */
const ServiceConnection_Reviews = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendReviews;
    const responseReviews = await _ApiRequest(url, requestTypePOST, data);
    if (responseReviews.success) resolve(responseReviews);
    else if (responseReviews == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Call History by Company Api Function
 * @param {Object} companyId
 * @return {Object}
 */
const ServiceConnection_CallHistoryByCompany = async (companyId) => {
  return new Promise(async (resolve, reject) => {

    const url = mainURL + extendCallHistoryByCompany + companyId; //this url must be updated when the app has passed live.
    const responseCallHistoryByCompany = await _ApiRequest(url, requestTypeGET);
    if (responseCallHistoryByCompany.success) resolve(responseCallHistoryByCompany);
    else if (responseCallHistoryByCompany == "unauthorization") resolve("unauthorization");
  });
};

/**
 * IVR Node Api Function
 * @param {Object} data including companyId, nodeId, payload
 * @return {Object}
 */
const ServiceConnection_IVRNode = async (data) => {
  return new Promise(async (resolve, reject) => {
    const url = extendIVRNode; //this url must be updated when the app has passed live.
    const responseIVRNode = await _ApiRequest(url, requestTypePOST, data);
    if (responseIVRNode.success) resolve(responseIVRNode);
    else if (responseIVRNode == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Add Favourites Api Function
 * @param {Object} companyId
 * @return {Object}
 */
const ServiceConnection_CompaniesAddFavourite = async (companyId) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendCompaniesAddFavourites;
    const responseCompaniesAddFavourite = await _ApiRequest(url, requestTypePOST, companyId);
    if (responseCompaniesAddFavourite.success) resolve(responseCompaniesAddFavourite);
    else if (responseCompaniesAddFavourite == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Get User Reviews Api Function
 * @return {Object}
 */
const ServiceConnection_UserReview = async () => {
  return new Promise(async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('@userInfo');
    userInfo = await JSON.parse(userInfo);
    const url = mainURL + extendUserReviews + userInfo;
    const responseUserReview = await _ApiRequest(url, requestTypeGET);
    if (responseUserReview.success) resolve(responseUserReview);
    else if (responseUserReview == "unauthorization") resolve("unauthorization");
  });
};

/**
 * Delete Review Api Function
 * @param {String} reviewId
 * @return {Object}
 */
const ServiceConnection_DeleteReview = async (reviewId) => {
  return new Promise(async (resolve, reject) => {
    const url = mainURL + extendDeleteReview;
    const responseDeleteReview = await _ApiRequest(url, requestTypeDELETE, reviewId);
    if (responseDeleteReview.success) resolve(responseDeleteReview);
    else if (responseDeleteReview == "unauthorization") resolve("unauthorization");
  });
};

export {
  ServiceConnection_Login,
  ServiceConnection_Signup,
  ServiceConnection_VerificationCode,
  ServiceConnection_ForgotPassword,
  ServiceConnection_ResetPassword,
  ServiceConnection_Statistics,
  ServiceConnection_CallHistory,
  ServiceConnection_Categories,
  ServiceConnection_TrendingCompanies,
  ServiceConnection_FavouriteCompanies,
  ServiceConnection_MayBeInterestedCompanies,
  ServiceConnection_LastCalledCompanies,
  ServiceConnection_VoteToReview,
  ServiceConnection_SearchAndListCompanies,
  ServiceConnection_CompaniesByCategory,
  ServiceConnection_CompanyInfo,
  ServiceConnection_CompanyReviews,
  ServiceConnection_Reviews,
  ServiceConnection_CallHistoryByCompany,
  ServiceConnection_IVRNode,
  ServiceConnection_CompaniesAddFavourite,
  ServiceConnection_UserReview,
  ServiceConnection_DeleteReview
};