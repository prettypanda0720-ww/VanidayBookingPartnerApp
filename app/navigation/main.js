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
import Schedule from '@screens/Schedule';
import CreateClient from '@screens/CreateClient';
import ClientProfile from '@screens/ClientProfile';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import Currency from '@screens/Currency';
import Staffs from '@screens/Staffs';
import StaffMembers from '@screens/StaffMembers';
import StaffProfileDetail from '@screens/StaffProfileDetail';
import OpeningHours from '@screens/OpeningHours';
import CreateStaff from '@screens/CreateStaff';
// import Services from '@screens/Services';
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
import EditEcard from '@screens/EditEcard';
import Invoices from '@screens/Invoices';
import Inventory from '@screens/Inventory';
import PhysicalProducts from '@screens/PhysicalProducts';
import EditProduct from '@screens/EditProduct';
import CreateProduct from '@screens/CreateProduct';
import PhysicalProductProfile from '@screens/PhysicalProductProfile';
import IncreaseStock from '@screens/IncreaseStock';
import DecreaseStock from '@screens/DecreaseStock';
import Suppliers from '@screens/Suppliers';
import CreateSupplier from '@screens/CreateSupplier';
import EditSupplier from '@screens/EditSupplier';
import Categories from '@screens/Categories';
import CreateCategory from '@screens/CreateCategory';
import EditCategory from '@screens/EditCategory';
import Brands from '@screens/Brands';
import CreateBrand from '@screens/CreateBrand';
import EditBrand from '@screens/EditBrand';
import Orders from '@screens/Orders';
import SelectSupplier from '@screens/SelectSupplier';
import CreateOrder from '@screens/CreateOrder';
import CategoryProductList from '@screens/CategoryProductList';
import CategoryProducts from '@screens/CategoryProducts';
import OrderDetail from '@screens/OrderDetail';
import VanidayServices from '@screens/VanidayServices';
import Financing from '@screens/Financing';
import DailySales from '@screens/DailySales';
import Marketing from '@screens/Marketing';
import Reports from '@screens/Reports';
import FinancesSummary from '@screens/FinancesSummary';
import PaymentsSummary from '@screens/PaymentsSummary';
import PaymentsLog from '@screens/PaymentsLog';
import TaxesSummary from '@screens/TaxesSummary';
import TipsCollected from '@screens/TipsCollected';
import ManageAppointment from '@screens/ManageAppointment';
import RescheduleAppointment from '@screens/RescheduleAppointment';
import ServiceList from '@screens/ServiceList';
import EditOpeningHours from '@screens/EditOpeningHours';
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
  Services: {
    screen: ServiceList,
    navigationOptions: ({navigation}) => ({
      title: 'Services',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon color={tintColor} name="plus-circle" size={20} solid />;
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
  // Services: {
  //   screen: VanidayServices,
  //   navigationOptions: ({navigation}) => ({
  //     title: 'Services',
  //     tabBarIcon: ({focused, tintColor}) => {
  //       return <Icon color={tintColor} name="plus-circle" size={20} solid />;
  //     },
  //   }),
  // },
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
    // SignUp: {
    //   screen: SignUp,
    // },
    // SignIn: {
    //   screen: SignIn,
    // },
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
    // ResetPassword: {
    //   screen: ResetPassword,
    // },
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
    // Services: {
    //   screen: VanidayServices,
    // },
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
    EditEcard: {
      screen: EditEcard,
    },
    Invoices: {
      screen: Invoices,
    },
    Inventory: {
      screen: Inventory,
    },
    PhysicalProducts: {
      screen: PhysicalProducts,
    },
    EditProduct: {
      screen: EditProduct,
    },
    CreateProduct: {
      screen: CreateProduct,
    },
    PhysicalProductProfile: {
      screen: PhysicalProductProfile,
    },
    IncreaseStock: {
      screen: IncreaseStock,
    },
    DecreaseStock: {
      screen: DecreaseStock,
    },
    Suppliers: {
      screen: Suppliers,
    },
    CreateSupplier: {
      screen: CreateSupplier,
    },
    EditSupplier: {
      screen: EditSupplier,
    },
    Categories: {
      screen: Categories,
    },
    CreateCategory: {
      screen: CreateCategory,
    },
    EditCategory: {
      screen: EditCategory,
    },
    Brands: {
      screen: Brands,
    },
    CreateBrand: {
      screen: CreateBrand,
    },
    EditBrand: {
      screen: EditBrand,
    },
    Orders: {
      screen: Orders,
    },
    SelectSupplier: {
      screen: SelectSupplier,
    },
    CreateOrder: {
      screen: CreateOrder,
    },
    OrderDetail: {
      screen: OrderDetail,
    },
    CategoryProductList: {
      screen: CategoryProductList,
    },
    CategoryProducts: {
      screen: CategoryProducts,
    },
    VanidayServices: {
      screen: VanidayServices,
    },
    ServiceList: {
      screen: ServiceList,
    },
    Financing: {
      screen: Financing,
    },
    DailySales: {
      screen: DailySales,
    },
    Marketing: {
      screen: Marketing,
    },
    Notification: {
      screen: Notification,
    },
    Reports: {
      screen: Reports,
    },
    FinancesSummary: {
      screen: FinancesSummary,
    },
    PaymentsSummary: {
      screen: PaymentsSummary,
    },
    PaymentsLog: {
      screen: PaymentsLog,
    },
    TaxesSummary: {
      screen: TaxesSummary,
    },
    TipsCollected: {
      screen: TipsCollected,
    },
    ManageAppointment: {
      screen: ManageAppointment,
    },
    RescheduleAppointment: {
      screen: RescheduleAppointment,
    },
    EditOpeningHours: {
      screen: EditOpeningHours,
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
