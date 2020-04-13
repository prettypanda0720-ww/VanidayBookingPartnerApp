import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {BaseColor, BaseStyle} from '@config';
import {Icon} from '@components';
import * as Utils from '@utils';

/* Bottom Screen */
import Home from '@screens/Home';
import Clients from '@screens/Clients';
import Notification from '@screens/Notification';
import Sales from '@screens/Sales';
import Setting from '@screens/Setting';
import PreviewImage from '@screens/PreviewImage';
/* Stack Screen */
import Walkthrough from '@screens/Walkthrough';
import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import Schedule from '@screens/Schedule';
import CreateClient from '@screens/CreateClient';
import ClientProfile from '@screens/ClientProfile';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import Currency from '@screens/Currency';

// Transition for navigation by screen name
const handleCustomTransition = ({scenes}) => {
  const nextScene = scenes[scenes.length - 1].route.routeName;
  switch (nextScene) {
    case 'PreviewImage':
      Utils.enableExperimental();
      return Utils.zoomIn();
    default:
      return false;
  }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
  initialRouteName: 'Home',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: BaseColor.primaryColor,
    inactiveTintColor: BaseColor.grayColor,
    style: BaseStyle.tabBar,
    labelStyle: {
      fontSize: 12,
    },
  },
};

// Tab bar navigation
const routeConfigs = {
  Home: {
    screen: Notification,
    navigationOptions: ({navigation}) => ({
      // title: 'Home',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="calendar" size={20} solid />;
      },
    }),
  },
  Sales: {
    screen: Sales,
    navigationOptions: ({navigation}) => ({
      title: 'Sales',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="bookmark" size={20} solid />;
      },
    }),
  },
  Clients: {
    screen: Clients,
    navigationOptions: ({navigation}) => ({
      title: 'Clients',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="user-circle" size={20} solid />;
      },
    }),
  },
  Notification: {
    screen: Notification,
    navigationOptions: ({navigation}) => ({
      title: 'Notification',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="envelope" size={20} solid />;
      },
    }),
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => ({
      title: 'Setting',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="bars" size={20} solid />;
      },
    }),
  },
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
  routeConfigs,
  bottomTabNavigatorConfig,
);

// Main Stack View App
const StackNavigator = createStackNavigator(
  {
    BottomTabNavigator: {
      screen: BottomTabNavigator,
    },
    Walkthrough: {
      screen: Walkthrough,
    },
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
    },
    Schedule: {
      screen: Schedule,
    },
    Clients: {
      screen: Clients,
    },
    CreateClient: {
      screen: CreateClient,
    },
    ClientProfile: {
      screen: ClientProfile,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    ProfileEdit: {
      screen: ProfileEdit,
    },
    Currency: {
      screen: Currency,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'BottomTabNavigator',
  },
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {
    PreviewImage: {
      screen: PreviewImage,
    },
    StackNavigator: {
      screen: StackNavigator,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'StackNavigator',
    transitionConfig: screen => {
      return handleCustomTransition(screen);
    },
  },
);

export default RootStack;
