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
import Staffs from '@screens/Staffs';
import StaffMembers from '@screens/StaffMembers';
import StaffProfileDetail from '@screens/StaffProfileDetail';
import OpeningHours from '@screens/OpeningHours';
import CreateStaff from '@screens/CreateStaff';
import Services from '@screens/Services';
import EditService from '@screens/EditService';
import NewPricingOption from '@screens/NewPricingOption';
import PickStaff from '@screens/PickStaff';
import CreateService from '@screens/CreateService';
import OnlineBooking from '@screens/OnlineBooking';
import ClosedDates from '@screens/ClosedDates';
import CreateClosedDate from '@screens/CreateClosedDate';
import EditClosedDate from '@screens/EditClosedDate';
import NewTreatmentType from '@screens/NewTreatmentType';
import MerchantClosedDates from '@screens/MerchantClosedDates';
import Aboutus from '@screens/Aboutus';
import CreateAppointment from '@screens/CreateAppointment';
import AppointmentDate from '@screens/AppointmentDate';
import Cancellation from '@screens/Cancellation';
import TermsAndConditions from '@screens/TermsAndConditions';
import Appointments from '@screens/Appointments';
import SelectPeriod from '@screens/SelectPeriod';
import EcardList from '@screens/EcardList';

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
    activeTintColor: BaseColor.MainPrimaryColor,
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
    screen: Home,
    navigationOptions: ({navigation}) => ({
      // title: 'Home',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Icon
            color={tintColor}
            name="calendar"
            size={20}
            solid
          />
        );
      },
    }),
  },
  Sales: {
    screen: Sales,
    navigationOptions: ({navigation}) => ({
      title: 'Sales',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Icon
            color={tintColor}
            name="bookmark"
            size={20}
            solid
          />
        );
      },
    }),
  },
  Clients: {
    screen: Clients,
    navigationOptions: ({navigation}) => ({
      title: 'Clients',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Icon
            color={tintColor}
            name="user-circle"
            size={20}
            solid
          />
        );
      },
    }),
  },
  Notification: {
    screen: Notification,
    navigationOptions: ({navigation}) => ({
      title: 'Notification',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Icon
            color={tintColor}
            name="envelope"
            size={20}
            solid
          />
        );
      },
    }),
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => ({
      title: 'Setting',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Icon
            color={tintColor}
            name="bars"
            size={20}
            solid
          />
        );
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
    Home: {
      screen: Home,
    },
    Staffs: {
      screen: Staffs,
    },
    StaffMembers: {
      screen: StaffMembers,
    },
    StaffProfileDetail: {
      screen: StaffProfileDetail,
    },
    OpeningHours: {
      screen: OpeningHours,
    },
    CreateStaff: {
      screen: CreateStaff,
    },
    Services: {
      screen: Services,
    },
    EditService: {
      screen: EditService,
    },
    NewPricingOption: {
      screen: NewPricingOption,
    },
    PickStaff: {
      screen: PickStaff,
    },
    CreateService: {
      screen: CreateService,
    },
    OnlineBooking: {
      screen: OnlineBooking,
    },
    ClosedDates: {
      screen: ClosedDates,
    },
    CreateClosedDate: {
      screen: CreateClosedDate,
    },
    EditClosedDate: {
      screen: EditClosedDate,
    },
    NewTreatmentType: {
      screen: NewTreatmentType,
    },
    MerchantClosedDates: {
      screen: MerchantClosedDates,
    },
    Aboutus: {
      screen: Aboutus,
    },
    CreateAppointment: {
      screen: CreateAppointment,
    },
    AppointmentDate: {
      screen: AppointmentDate,
    },
    Cancellation: {
      screen: Cancellation,
    },
    TermsAndConditions: {
      screen: TermsAndConditions,
    },
    Appointments: {
      screen: Appointments,
    },
    SelectPeriod: {
      screen: SelectPeriod,
    },
    EcardList: {
      screen: EcardList,
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
    transitionConfig: (screen) => {
      return handleCustomTransition(screen);
    },
  },
);

export default RootStack;
