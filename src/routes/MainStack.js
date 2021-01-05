import { createStackNavigator } from 'react-navigation-stack';
import { Dashboard } from '../screens/dashboard_comment/index';
import { PrivacyPolicy } from '../screens/entry/index';
import lang from '../lang/Language';
import React from 'react';
import { stackNavigationOptions, HeaderLeftDrawer, HeaderRight } from '../screens/common/common_components/HeaderBar';
import { Companies, CompanyInfo, SendReview, CompaniesByCategory } from '../screens/category_company/index';
import { IVRNode, CompanyCall, CallHistoryByCompany } from '../screens/ivr_process/index';
import CallJustForTest from '../screens/call_test/CallJustForTest';
import { MyFavourite, MyComment } from '../screens/own_favourite_comment/index';
import { MyProfile, EditProfile } from '../screens/own_profile/index';
import { AboutTheApp } from '../screens/about_tegsoft_touch/index';

const CompanyStack = createStackNavigator({
    Companies: {
        screen: Companies,
        navigationOptions: {
            headerShown: false
        }
    }
});
const MyFavouriteStack = createStackNavigator({
    MyFavourite: {
        screen: MyFavourite,
        navigationOptions: ({ navigation }) => ({
            title: lang.my_favorites,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});
const AboutTheAppStack = createStackNavigator({
    AboutTheApp: {
        screen: AboutTheApp,
        navigationOptions: ({ navigation }) => ({
            title: lang.about_tegsoft_touch,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});
const MyCommentStack = createStackNavigator({
    MyComment: {
        screen: MyComment,
        navigationOptions: ({ navigation }) => ({
            title: lang.my_reviews,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});

const ProfileStack = createStackNavigator({
    MyProfile: {
        screen: MyProfile,
        navigationOptions: ({ navigation }) => ({
            title: lang.my_profile,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: lang.edit_profile
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});

const DashboardStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: ({ navigation }) => ({
            title: lang.dashboard,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    },
    CompanyInfo: {
        screen: CompanyInfo,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title', lang.company_information),
            headerRight: () => <HeaderRight navigation={navigation} directedScreen='IVRNode' />
        })
    },
    CallHistoryByCompany: {
        screen: CallHistoryByCompany,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title', lang.company_information)
        })
    },
    CallJustForTest: {
        screen: CallJustForTest,
        navigationOptions: ({ navigation }) => ({
            title: 'CallJustForTest',
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    },

}, {
    defaultNavigationOptions: stackNavigationOptions
});

const CompaniesStack = createStackNavigator({
    Companies: {
        screen: Companies,
        navigationOptions: {
            headerShown: false
        }
    },
    CompaniesByCategory: {
        screen: CompaniesByCategory,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title', lang.company_information)
        })
    },
    CompanyInfo: {
        screen: CompanyInfo,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title', lang.company_information),
            headerRight: () => <HeaderRight navigation={navigation} directedScreen='IVRNode' />
        })
    },
    CallHistoryByCompany: {
        screen: CallHistoryByCompany,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title', lang.company_information)
        })
    },
    CallJustForTest: {
        screen: CallJustForTest,
        navigationOptions: ({ navigation }) => ({
            title: 'CallJustForTest',
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});
const PrivacyPolicyStack = createStackNavigator({
    PrivacyPolicy: {
        screen: PrivacyPolicy,
        navigationOptions: ({ navigation }) => ({
            title: lang.privacy_and_policy,
            headerLeft: () => <HeaderLeftDrawer navigation={navigation} />
        })
    }
}, {
    defaultNavigationOptions: stackNavigationOptions
});

export { DashboardStack, CompaniesStack, PrivacyPolicyStack, CompanyStack, MyFavouriteStack, MyCommentStack, ProfileStack, AboutTheAppStack };