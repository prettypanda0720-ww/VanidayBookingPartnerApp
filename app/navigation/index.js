import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from '@screens/SplashScreen';
import Main from './main';
import Loading from '@screens/Loading';
import SignIn from '@screens/SignIn';

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignIn: SignIn,
    Main: Main,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
