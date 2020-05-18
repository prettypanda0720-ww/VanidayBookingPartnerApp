import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from '@screens/SplashScreen';
import Main from './main';
import Loading from '@screens/Loading';

const AppNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    Loading: Loading,
    Main: Main,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(AppNavigator);
