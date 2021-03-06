import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import {withNavigation} from 'react-navigation';

class Setting extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      dataLoading: true,
      logoutLoading: false,
      loading: false,
      vendor_stripe_id: '',
      unique_entity_number: '',
      contact_number: '',
      shopTitle: '',
      location: '',
      description: '',
      rating: '',
      serviceList: [],
      openingHours: '',
    };
  }

  componentDidMount() {
    console.log('setting is called!');
    const {auth, navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      if (auth.user.data !== undefined) {
        myAppointmentsSvc
          .fetchProfileData(auth.user.data)
          .then((response) => {
            const res_profile = response.data;
            console.log('res_profile.data', res_profile.data);
            if (res_profile.data !== undefined) {
              this.setState({
                vendor_stripe_id: res_profile.data.vendor_stripe_id,
                unique_entity_number: res_profile.data.unique_entity_number,
                contact_number: res_profile.data.contact_number,
                shopTitle: res_profile.data.shop_title,
                location: res_profile.data.company_locality,
                description: res_profile.data.company_description,
                rating: res_profile.data.average_rating,
                serviceList: res_profile.data.serviceList,
                vendor_primary_type: res_profile.data.vendor_primary_type,
                vendor_secondary_type: res_profile.data.vendor_secondary_type,
                openingHours: res_profile.data.openingHour,
                dataLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({dataLoading: false});
            Utils.longNotifyMessage(
              'Your session is expired. please log in again!',
            );
            console.log(error);
          });
      }
    });
  }
  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  logoutApply() {
    const {actions, navigation} = this.props;
    this.setState({logoutLoading: true});
    actions.resetStore();
    actions.logout((response) => {
      if (response.code == 0) {
        this.setState({logoutLoading: false});
        navigation.navigate('Loading');
      } else {
        console.log(response.msg);
      }
    });
  }

  onLogOut = () => {
    Alert.alert(
      'Sign Out',
      'Do you really want to Sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.logoutApply(),
        },
      ],
      {cancelable: false},
    );
  };

  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = (value) => {
    this.setState({reminders: value});
  };

  displayContentView() {
    const {navigation} = this.props;
    const {
      dataLoading,
      loading,
      vendor_stripe_id,
      unique_entity_number,
      contact_number,
      shopTitle,
      location,
      description,
      rating,
      photos,
      serviceList,
      vendor_primary_type,
      vendor_secondary_type,
      openingHours,
    } = this.state;
    if (!dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Profile"
            // renderRight={() => {
            //   return <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />;
            // }}
            // onPressRight={() => {
            //   navigation.navigate('Notification');
            // }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView>
            <View style={styles.contain}>
              <View style={styles.bizProfile}>
                <Text body1 style={styles.sectionStyle}>
                  Business Profile
                </Text>
              </View>
              <ProfileDetail
                image={''}
                textFirst={shopTitle}
                point={rating}
                textSecond={location}
                textThird={''}
                style={{
                  paddingVertical: 20,
                }}
                styleThumb={{
                  width: Utils.scaleWithPixel(135),
                  height: Utils.scaleWithPixel(65),
                }}
                onPress={() => navigation.navigate('Aboutus')}
              />
              <View style={styles.contentService}>
                <Text body2 style={styles.sectionStyle}>
                  {description}
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={[
                    styles.profileItem,
                    {
                      borderColor: BaseColor.textSecondaryColor,
                      borderTopWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('BusinessPhotos');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Business Photos
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.profileItem,
                    {
                      borderColor: BaseColor.textSecondaryColor,
                      borderTopWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('ProfileEdit');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Person Profile
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('OpeningHours', {data: openingHours});
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Opening Hours
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('MerchantClosedDates');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Closed Dates
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('Staffs');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Staffs
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('VanidayServices');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Vaniday Services
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('PhysicalProducts');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Products
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Change Password
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('Inventory');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Inventory
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity> */}
                <View
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('Services');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Country
                  </Text>
                  <Text subhead>Singapore</Text>
                </View>
                {/* <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('Reports');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Reports
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    navigation.navigate('Help');
                  }}>
                  <Text body1 style={styles.sectionStyle}>
                    Help
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                {/* <View style={[styles.profileItem, {paddingVertical: 15}]}>
                  <Text body1 style={styles.sectionStyle}>
                    Reminders
                  </Text>
                  <Switch
                    name="angle-right"
                    size={18}
                    onValueChange={this.toggleSwitch}
                    value={this.state.reminders}
                  />
                </View> */}
                <View style={styles.profileItem}>
                  <Text body1 style={styles.sectionStyle}>
                    App Version
                  </Text>
                  <Text body1 grayColor>
                    {BaseSetting.appVersion}
                  </Text>
                </View>
                {/* <View style={{width: '100%'}}>
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      navigation.navigate('Notification');
                    }}>
                    <Text body1 style={styles.sectionStyle}>
                      Notification
                    </Text>
                    <Icon
                      name="angle-right"
                      size={18}
                      color={'rgba(0,0,0,0.65)'}
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </ScrollView>
          <View style={{padding: 20}}>
            <Button
              full
              loading={this.state.logoutLoading}
              onPress={() => this.onLogOut()}>
              Sign Out
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      const {dataLoading} = this.state;
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Profile"
            // renderRight={() => {
            //   return <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />;
            // }}
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

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }
}

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
  connect(mapStateToProps, mapDispatchToProps)(Setting),
);
