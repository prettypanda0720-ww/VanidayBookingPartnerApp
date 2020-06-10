import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from '@screens/SplashScreen';
import Main from './main';
import Loading from '@screens/Loading';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import Setting from '@screens/Setting';
import ResetPassword from '@screens/ResetPassword';

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignIn: SignIn,
    Main: Main,
    Setting: Setting,
    SignUp: SignUp,
    ResetPassword: ResetPassword,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
