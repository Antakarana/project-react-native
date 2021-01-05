import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStack from './AuthStack';
import { DashboardStack, CompaniesStack, PrivacyPolicyStack, CompanyStack, MyFavouriteStack, MyCommentStack, ProfileStack, AboutTheAppStack } from './MainStack';
import StartStack from './StartStack';
import { stackNavigationOptions, HeaderLeftEnd } from '../screens/common/common_components/HeaderBar';
import { SideBar } from '../screens/dashboard_comment';
import { IVRNode, CompanyCall } from '../screens/ivr_process/index';
import { SendReview } from '../screens/category_company/index';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import lang from '../lang/Language';

const StartNavigator = createStackNavigator({
    StartStack: {
        screen: StartStack,
        navigationOptions: {
            headerShown: false
        }
    }
});
const AuthNavigator = createStackNavigator({
    AuthStack: {
        screen: AuthStack,
        navigationOptions: {
            headerShown: false
        }
    }
});
const DrawerNavigator = createDrawerNavigator({
    DashboardStack: {
        screen: DashboardStack
    },
    CompanyStack: {
        screen: CompanyStack
    },
    CompaniesStack: {
        screen: CompaniesStack
    },
    PrivacyPolicyStack: {
        screen: PrivacyPolicyStack
    },
    MyFavouriteStack: {
        screen: MyFavouriteStack
    },
    MyCommentStack: {
        screen: MyCommentStack
    },
    ProfileStack: {
        screen: ProfileStack
    },
    AboutTheAppStack: {
        screen: AboutTheAppStack
    }
}, {
    contentComponent: (props) => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.72
});

const TestNavigator = createStackNavigator({
        DrawerNavigator: {
            screen: DrawerNavigator,
            navigationOptions: {
                headerShown: false
            }
        },
        IVRNode: {
            screen: IVRNode,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('title', lang.company_information),
                headerLeft: () => <HeaderLeftEnd navigation={navigation} lang={lang.hang_up} />,
                ...stackNavigationOptions
            })
        },
        CompanyCall: {
            screen: CompanyCall,
            navigationOptions: {
                headerShown: false
            }
        },
        SendReview: {
            screen: SendReview,
            navigationOptions: {
                headerShown: false
            }
        }
    },
    {
        mode: 'modal'
    }
)
const RootNavigator = createSwitchNavigator({
    Start: {
        screen: StartNavigator
    },
    Auth: {
        screen: AuthNavigator
    },
    Main: {
        screen: TestNavigator
    }
})

export default createAppContainer(RootNavigator);