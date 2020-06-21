import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  ProfileDetail,
  ProfilePerformance,
  Text,
  Button,
  InvoiceListItem,
} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

// Load sample data
import {UserData} from '@data';

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      index: 0,
      routes: [
        {key: 'appointments', title: 'Appointments'},
        // {key: 'products', title: 'Products'},
        // {key: 'invoices', title: 'Invoices'},
      ],
      userData: UserData[0],
      profileData: {},
      dataLoading: true,
    };
    this.growAnimated = new Animated.Value(0);
  }

  _handleIndexChange = (index) =>
    this.setState({
      index,
    });

  _renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({route, focused, color}) => (
        <View
          style={{
            flex: 1,
            width: Utils.getWidthDevice(),
            alignItems: 'center',
          }}>
          <Text subhead bold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  _renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'appointments':
        return (
          <AppointmentsTab
            jumpTo={jumpTo}
            navigation={this.props.navigation}
            appointmentsData={this.state.profileData.appointments}
          />
        );
      // case 'products':
      //   return (
      //     <ProductsTab jumpTo={jumpTo} navigation={this.props.navigation} />
      //   );
      // case 'invoices':
      //   return (
      //     <InvoicesTab
      //       jumpTo={jumpTo}
      //       navigation={this.props.navigation}
      //       invoicesData={this.state.profileData.invoices}
      //     />
      //   );
    }
  };

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  displayContentView() {
    const {navigation} = this.props;
    const {search, screen, userData, profileData, dataLoading} = this.state;
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 40],
    });
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
          forceInset={{top: 'always'}}>
          <Header
            title="Customer"
            renderLeft={() => {
              return (
                <Icon name="angle-left" size={20} color={'rgba(0,0,0,0.65)'} />
              );
            }}
            // renderRight={() => {
            //   return (
            //     <SafeAreaView style={{flexDirection: 'row'}}>
            //       <View style={{marginRight: 15}}>
            //         <Icon name="envelope" size={24} color={'rgba(0,0,0,0.65)'} />
            //       </View>
            //       <View>
            //         <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />
            //       </View>
            //     </SafeAreaView>
            //   );
            // }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            // onPressRight={() => {
            //   navigation.navigate('Notification');
            // }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView
            style={{paddingLeft: 20, paddingRight: 20, marginTop: 10}}>
            <View style={styles.profileItem}>
              <Text subhead semibold style={styles.sectionStyle}>
                Name:
              </Text>
              <Text subhead style={styles.sectionStyle}>
                {profileData.customerName}
              </Text>
            </View>
            {/* <ProfilePerformance data={userData.performance} style={{}} /> */}
            <View style={styles.profileItem}>
              <Text subhead semibold style={styles.sectionStyle}>
                Email:
              </Text>
              <Text subhead style={styles.sectionStyle}>
                {profileData.customerEmail}
              </Text>
            </View>
            <View style={styles.profileItem}>
              <Text subhead semibold style={styles.sectionStyle}>
                Mobile No:
              </Text>
              <Text subhead style={styles.sectionStyle}>
                {profileData.contactNo}
              </Text>
            </View>
            <View style={styles.profileItem}>
              <Text subhead semibold style={styles.sectionStyle}>
                Gender
              </Text>
              <Text subhead style={styles.sectionStyle}>
                {profileData.customerGender == null
                  ? 'Not Assigned'
                  : profileData.customerGender}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 15,
                borderBottomColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                paddingVertical: 15,
              }}>
              <Text subhead semibold style={styles.sectionStyle}>
                Address
              </Text>
              <Text subhead style={styles.sectionStyle}>
                {profileData.customerAddr}
              </Text>
            </View>
            <View style={styles.profileItem}>
              <Text subhead semibold style={styles.sectionStyle}>
                Subscribed to Marketing
              </Text>
              <Text subhead style={styles.sectionStyle}>
                YES
              </Text>
            </View>
            {/* <View style={{width: '100%', marginTop: 15}}>
              <Button
                full
                style={{}}
                onPress={() => {
                  navigation.goBack();
                }}>
                Chat with customer
              </Button>
            </View> */}
            <View
              style={{flexDirection: 'row', marginTop: 15, marginBotton: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  subhead
                  semibold
                  numberOfLines={1}
                  style={styles.sectionStyle}>
                  {profileData.count}
                </Text>
                <Text
                  subhead
                  semibold
                  numberOfLines={1}
                  style={styles.sectionStyle}>
                  Total Count
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  subhead
                  semibold
                  numberOfLines={1}
                  style={styles.sectionStyle}>
                  SGD {profileData.price}
                </Text>
                <Text
                  subhead
                  semibold
                  numberOfLines={1}
                  style={styles.sectionStyle}>
                  Total Sales
                </Text>
              </View>
            </View>
            <TabView
              lazy
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderTabBar}
              onIndexChange={this._handleIndexChange}
            />
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
          forceInset={{top: 'always'}}>
          <Header
            title="Customer"
            renderLeft={() => {
              return (
                <Icon name="angle-left" size={20} color={'rgba(0,0,0,0.65)'} />
              );
            }}
            // renderRight={() => {
            //   return (
            //     <SafeAreaView style={{flexDirection: 'row'}}>
            //       <View style={{marginRight: 15}}>
            //         <Icon name="envelope" size={24} color={'rgba(0,0,0,0.65)'} />
            //       </View>
            //       <View>
            //         <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />
            //       </View>
            //     </SafeAreaView>
            //   );
            // }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            // onPressRight={() => {
            //   navigation.navigate('Notification');
            // }}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
  componentDidMount() {
    const {auth, navigation} = this.props;
    const clientId = this.props.navigation.state.params.clientId;
    const data = {
      token: auth.user.data,
      clientId: clientId,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .fetchClientDetail(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            console.log('product detail', res_profile.data);
            this.setState({profileData: res_profile.data, dataLoading: false});
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage('Some errors occured during communication.');
          this.setState({dataLoading: false});
        });
    });
  }
}

class AppointmentsTab extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const {appointmentsData, navigation} = this.props;
    console.log('appointmentsTab', appointmentsData);
    return (
      <View style={{padding: 20}}>
        {appointmentsData.map((item, index) => {
          const startTime = item.bookingFrom;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ManageAppointment', {bookingData: item})
              }
              style={{
                flexDirection: 'column',
                borderColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text footnote semibold style={{flex: 1}}>
                  {item.serviceName}
                </Text>
                <Text
                  footnote
                  bold
                  style={{
                    color: BaseColor.sectionColor,
                    marginLeft: 10,
                    flex: 1,
                    textAlign: 'right',
                  }}>
                  {Utils.capitalize(item.status)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text footnote semibold style={{flex: 1}}>
                  {Utils.timeToAsianString(startTime)}, {item.service_duration}
                  Min
                </Text>
                <Text footnote semibold style={{flex: 1, textAlign: 'right'}}>
                  SGD {item.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text footnote semibold>
                  StaffName:{' '}
                  {item.staffName == null ? 'Not Assigned' : item.staffName}
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{position: 'absolute', right: 0}}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

AppointmentsTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  jumpTo: PropTypes.object,
  navigation: PropTypes.object,
  appointmentsData: PropTypes.array,
};

AppointmentsTab.defaultProps = {
  style: {},
  jumpTo: {},
  navigation: {},
  appointmentsData: [],
};

class ProductsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
    };
  }

  toggleSwitch = (value) => {
    this.setState({reminders: value});
  };

  render() {
    const {navigation} = this.props;
    return <View style={{padding: 20}} />;
  }
}

ProductsTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  products: PropTypes.array,
};

ProductsTab.defaultProps = {
  style: {},
  products: [],
};

class InvoicesTab extends Component {
  render() {
    const {invoicesData} = this.props;
    return (
      <FlatList
        data={invoicesData}
        keyExtractor={(item, index) => item.id}
        style={{marginTop: 10}}
        renderItem={({item, index}) => (
          <InvoiceListItem
            // refId={item.invoiceId}
            clientName={item.customerName}
            // appointmentDate={item.slotDate}
            total={item.price}
            count={item.count}
            // status={item.status}
            detail={[item]}
            // startTime={item.bookingFrom}
            // endTime={item.bookingTo}
            style={{paddingVertical: 10, marginHorizontal: 20}}
            onPress={() => {}}
          />
        )}
      />
    );
  }
}

InvoicesTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  invoicesData: PropTypes.array,
};

InvoicesTab.defaultProps = {
  style: {},
  invoicesData: [],
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ClientProfile),
);
