import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
  ActivityIndicator,
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
  ProfilePerformance,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import {withNavigation} from 'react-navigation';
import {Api} from '@config';
// Load sample data
import {ShopsData} from '@data';

class Setting extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      dataLoading: true,
      loading: false,
      shopData: ShopsData[0],
      vendor_stripe_id: '',
      unique_entity_number: '',
      contact_number: '',
      shopTitle: '',
      location: '',
      description: '',
      rating: '',
      photos: [],
    };
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      if (auth.user.token !== undefined) {
        myAppointmentsSvc
          .fetchProfileData(auth.user.token)
          .then((response) => {
            const res_profile = response.data.data;
            if (response.data.data != undefined) {
              this.setState({
                dataLoading: false,
                vendor_stripe_id: res_profile.vendor_stripe_id,
                unique_entity_number: res_profile.unique_entity_number,
                contact_number: res_profile.contact_number,
                shopTitle: res_profile.shop_title,
                location: res_profile.company_locality,
                description: res_profile.company_description,
                rating: res_profile.average_rating,
                photos: JSON.parse(res_profile.vendor_carousel).map(
                  (photo, index) => {
                    return res_profile.venCarPrefix + photo;
                  },
                ),
              });
            }
          })
          .catch((error) => {
            console.log('appointment error');
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
  onLogOut() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.actions.authentication(false, (response) => {
          if (response.success) {
            this.props.navigation.navigate('Loading');
          } else {
            this.setState({loading: false});
          }
        });
      },
    );
  }

  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = (value) => {
    this.setState({reminders: value});
  };

  render() {
    const {navigation} = this.props;
    const {
      shopData,
      loading,
      vendor_stripe_id,
      unique_entity_number,
      contact_number,
      shopTitle,
      location,
      description,
      rating,
      photos,
    } = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Profile"
          renderRight={() => {
            return <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />;
          }}
          onPressRight={() => {
            navigation.navigate('Notification');
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={''}
              textFirst={shopTitle}
              point={rating}
              textSecond={location}
              textThird={''}
              styleThumb={{
                width: Utils.scaleWithPixel(135),
                height: Utils.scaleWithPixel(65),
              }}
              onPress={() =>
                navigation.navigate('Aboutus', {
                  vendor_stripe_id: vendor_stripe_id,
                  unique_entity_number: unique_entity_number,
                  contact_number: contact_number,
                  title: shopTitle,
                  location: location,
                  description: description,
                  photos: photos,
                })
              }
            />
            <View style={styles.contentService}>
              <Text body2 style={styles.sectionStyle}>
                {description}
              </Text>
            </View>
            <ProfilePerformance
              data={shopData.performance}
              style={{marginTop: 20, marginBottom: 20}}
            />
            <View style={{width: '100%'}}>
              {/* <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('ProfileEdit');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  Edit Profile
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
                  navigation.navigate('OpeningHours');
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
              <TouchableOpacity
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
              </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('ServiceList');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  Services
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
              </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Currency');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  Currency
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text body1 grayColor>
                    USD
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Cancellation');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  Cancellation and Policy
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
                  navigation.navigate('TermsAndConditions');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  Terms And Conditions
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
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('FAQ');
                }}>
                <Text body1 style={styles.sectionStyle}>
                  FAQ
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <View style={[styles.profileItem, {paddingVertical: 15}]}>
                <Text body1 style={styles.sectionStyle}>
                  Reminders
                </Text>
                <Switch
                  name="angle-right"
                  size={18}
                  onValueChange={this.toggleSwitch}
                  value={this.state.reminders}
                />
              </View>
              <View style={styles.profileItem}>
                <Text body1 style={styles.sectionStyle}>
                  App Version
                </Text>
                <Text body1 grayColor>
                  {BaseSetting.appVersion}
                </Text>
              </View>
              <View style={{width: '100%'}}>
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
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={BaseColor.sectionColor}
            style={styles.loading}
            animating={this.state.loading}
          />
        </View>
        <View style={{padding: 20}}>
          <Button full loading={loading} onPress={() => this.onLogOut()}>
            Sign Out
          </Button>
        </View>
      </SafeAreaView>
    );
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
