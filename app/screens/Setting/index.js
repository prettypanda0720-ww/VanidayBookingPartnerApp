import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
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
// Load sample data
import {ShopsData} from '@data';

class Setting extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      loading: false,
      shopData: ShopsData[0],
    };
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
    const {shopData, loading} = this.state;

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
              textFirst={shopData.name}
              point={shopData.point}
              textSecond={shopData.address}
              textThird={shopData.id}
              styleThumb={{
                width: Utils.scaleWithPixel(135),
                height: Utils.scaleWithPixel(65),
              }}
              onPress={() => navigation.navigate('Aboutus', {data: shopData})}
            />
            <View style={styles.contentService}>
              <Text body2 style={styles.sectionStyle}>
                In Italian, "Covo" means a hiding place. When you come to our
                salon, you will experience a private and relaxing space and
                time. All the stylists are experienced Japanese stylists with
                Japanese quality service. Our location is on the happening Keong
                Saik road, on the ground floor in a shop house. We try out best
                to cater damage-free hair using in-house developed
                chemicals(developed in Tokyo by our owner stylist) for
                colouring, pem, rebonding and treatment. We also have Keratin
                treatment for damaged hair as well. For the best result for both
                hair and scalp, we use carbonated water in the salon. Please
                come to experience quality technique and service to Covo.
              </Text>
            </View>
            <ProfilePerformance
              data={shopData.performance}
              style={{marginTop: 20, marginBottom: 20}}
            />
            <View style={{width: '100%'}}>
              <TouchableOpacity
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
              </TouchableOpacity>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
