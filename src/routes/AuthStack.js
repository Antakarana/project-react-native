import { createStackNavigator } from 'react-navigation-stack';
import { Onboarding, Login, LoginWithEmail, PrivacyPolicy, SignupWithEmail, ConfirmEmail, EnterEmail, ResetPassword } from '../screens/entry/index';
import lang from '../lang/Language';
import { stackNavigationOptions } from '../screens/common/common_components/HeaderBar';

const screens = {
    Onboarding: {
        screen: Onboarding,
        navigationOptions: {
            headerShown: false
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    LoginWithEmail: {
        screen: LoginWithEmail,
        navigationOptions: {
            headerTitle: lang.login_with_email
        }
    },
    SignupWithEmail: {
        screen: SignupWithEmail,
        navigationOptions: {
            headerTitle: lang.signup_with_email
        }
    },
    PrivacyPolicy: {
        screen: PrivacyPolicy,
        navigationOptions: {
            headerTitle: lang.privacy_and_policy
        }
    },
    ConfirmEmail: {
        screen: ConfirmEmail,
        navigationOptions: {
            headerTitle: lang.confirm_email
        }
    },
    EnterEmail: {
        screen: EnterEmail,
        navigationOptions: {
            headerTitle: lang.reset_password
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            headerTitle: lang.reset_password
        }
    }
}
const AuthStack = createStackNavigator(screens, {
    defaultNavigationOptions: stackNavigationOptions
});

export default AuthStack;