const requestTypeGET = 'GET';
const requestTypePOST = 'POST';
const requestTypePUT = 'PUT';
const requestTypePATCH = 'PATCH';
const requestTypeDELETE = 'DELETE';

const liveApiURL = 'https://tc0001.tegsoftcloud.com/TegsoftTouch/v1/touch/';
const baseApiURL = 'http://169.50.37.184:9090/';
const testApiURL = 'http://10.10.0.10:9090/';

const extendLogin = 'Login';
const extendSignup = 'Signup';
const extendForgotPassword = 'ForgotPassword';
const extendResetPassword = 'ResetPassword';
const extendVerificationCode = 'VerificationCode';
const extendStatistics = 'Statistics';
const extendCallHistory = 'CallHistoryStatistics'; //CallHistoryStatistics must be replaced by CallHistory, after updating mock data.
const extendCategories = 'Categories';
const extendTrendingCompanies = 'Companies?list=trending';
const extendFavouriteCompanies = 'Companies?list=favourite';
const extendMayBeInterestedCompanies = 'Companies?list=mayBeInterested';
const extendLastCalledCompanies = 'Companies?list=recentlyCalled';
const extendVoteToReview = 'VoteToReview';
const extendSearchAndListCompanies = 'Companies?search='; //+ CompanyNameValue&Item=ItemValue
const extendCompaniesByCategory = 'Companies?category='; //CategoryId
const extendCompanyInfo = 'CompanyDetails?companyId='; //companyIdValue
const extendCompanyReviews = 'CompanyReviewDetails?companyId='; //companyIdValue
const extendReviews = 'Reviews';
const extendIVRNode = 'http://169.50.37.184:8888/IVRNode'; //this url must be updated when the app has passed live.
const extendCallHistoryByCompany = 'CallHistory?companyId='; //companyIdValue
const extendCompaniesAddFavourites = 'CompaniesAddFavourites';
const extendUserReviews = 'Reviews?userId='; //userIdValue
const extendDeleteReview='Reviews';

const mainURL = baseApiURL;

export {
  mainURL,
  requestTypeGET,
  requestTypePOST,
  requestTypePUT,
  requestTypeDELETE,
  requestTypePATCH,
  extendLogin,
  extendSignup,
  extendForgotPassword,
  extendResetPassword,
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
  extendCompanyInfo,
  extendCompanyReviews,
  extendReviews,
  extendIVRNode,
  extendCallHistoryByCompany,
  extendCompaniesAddFavourites,
  extendUserReviews,
  extendDeleteReview
};