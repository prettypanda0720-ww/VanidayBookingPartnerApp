import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Switch} from 'react-native';
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
  ProfilePerformance
} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

class Setting extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      loading: false,
      shopData: ShopsData[0]
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
        loading: true
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
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="bell" size={24} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('Notification');
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={shopData.image}
              textFirst={shopData.name}
              point={shopData.point}
              textSecond={shopData.address}
              textThird={shopData.id}
              styleThumb = {{width: 120, height: 60, resizeMode: 'contain'}}
              onPress={() => navigation.navigate('ProfileExanple')}
            />
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
                <Text body1>Edit Profile</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('OpeningHours');
                }}>
                <Text body1>Opening Hours</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Staffs');
                }}>
                <Text body1>Staffs</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Services');
                }}>
                <Text body1>Services</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <View
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Services');
                }}>
                <Text body1>Country</Text>
                <Text subhead>Singapore</Text>
              </View>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Currency');
                }}>
                <Text body1>Currency</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Text body1 grayColor>
                    USD
                  </Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={BaseColor.primaryColor}
                    style={{marginLeft: 5}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Policy');
                }}>
                <Text body1>Policy</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Invoices');
                }}>
                <Text body1>Invoices</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('Report');
                }}>
                <Text body1>Report</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('FAQ');
                }}>
                <Text body1>FAQ</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <View style={[styles.profileItem, {paddingVertical: 15}]}>
                <Text body1>Reminders</Text>
                <Switch
                  name="angle-right"
                  size={18}
                  onValueChange={this.toggleSwitch}
                  value={this.state.reminders}
                />
              </View>
              <View style={styles.profileItem}>
                <Text body1>App Version</Text>
                <Text body1 grayColor>
                  {BaseSetting.appVersion}
                </Text>
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
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
