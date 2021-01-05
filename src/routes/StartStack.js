import { createStackNavigator } from 'react-navigation-stack';
import { Start } from '../screens/entry/index';

const StartStack = createStackNavigator({
    Start: {
        screen: Start,
        navigationOptions: {
            headerShown: false
        }
    },
});
export default StartStack;