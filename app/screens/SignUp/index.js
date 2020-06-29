import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, FontFamily, Strings, Images} from '@config';
import * as Utils from '@utils';
import ImagePicker from 'react-native-image-picker';
import {Dropdown} from 'react-native-material-dropdown';
import {CheckBox} from 'react-native-elements';
// import {Checkbox} from 'react-native-material-ui';

import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  Text,
  Image,
  BirthdayPicker,
  DatePicker,
} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import styles from './styles';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      gender: 0,
      address: '',
      phone_number: '',
      birthday: '',
      owner_type: 1,
      vendor_type: 1,
      // Below fields are added in case of salow owner
      profile_url: '',
      vendor_title: '',
      vendor_tel: '',
      unique_entity_number: '',
      vendor_address: '',
      loading: false,
      dataLoading: true,
      neighbourhoodLst: [],
      neighbourhoodDropdownLst: [],
      vendor_area: 1,
      appointmentDate: this.getCurrentDate(),
      is_subscribed: 0,
    };
  }

  getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    return year + '-' + month + '-' + date;
  }

  componentDidMount() {
    myAppointmentsSvc
      .getNeighbourhoodList()
      .then((response) => {
        const res_profile = response.data;
        console.log('neighbourhoodlist', res_profile.data);
        if (res_profile.code == 0) {
          this.setState({
            neighbourhoodLst: res_profile.data,
            neighbourhoodDropdownLst: res_profile.data.map((item, index) => {
              return {
                value: item.area,
              };
            }),
            dataLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log('appointment error');
        console.log(error);
      });
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  displayContentView() {
    const {navigation} = this.props;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Sign Up"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.blackColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.navigate('SignIn');
            }}
            onPressRight={() => {}}
            style={BaseStyle.headerStyle}
          />
          <ScrollView>
            <View style={styles.contain}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({first_name: text})}
                  autoCorrect={false}
                  placeholder="First Name"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({last_name: text})}
                  autoCorrect={false}
                  placeholder="Last Name"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({email: text})}
                  autoCorrect={false}
                  placeholder="Email"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({password: text})}
                  autoCorrect={false}
                  placeholder="Password"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                  autoCapitalize={'none'}
                  autoCompleteType={'password'}
                  keyboardType={'password-address'}
                  textContentType={'passwordAddress'}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({confirm_password: text})
                  }
                  autoCorrect={false}
                  placeholder="Confirm Password"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                  autoCapitalize={'none'}
                  autoCompleteType={'password'}
                  keyboardType={'password-address'}
                  textContentType={'passwordAddress'}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({phone_number: text})}
                  autoCorrect={false}
                  placeholder="Phone Number"
                  placeholderTextColor={BaseColor.grayColor}
                  keyboardType={'numeric'}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>
              <DatePicker
                style={{width: '100%', marginTop: 10, marginBottom: 10}}
                date={this.state.birthday}
                mode="date"
                placeholder="Select Birthday"
                androidMode="spinner"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2099-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={
                  {
                    // ... You can check the source to find the other keys.
                  }
                }
                onDateChange={(date) => {
                  this.setState({birthday: date});
                }}
              />
              <View style={styles.inputGroup}>
                <Dropdown
                  label="Select a Gender"
                  labelFontSize={15}
                  fontSize={13}
                  labelTextStyle={{marginBottom: 10}}
                  style={{fontFamily: FontFamily.default}}
                  data={[
                    {value: 'Not Specified'},
                    {value: 'Male'},
                    {value: 'Female'},
                  ]}
                  rippleOpacity={0.7}
                  baseColor={BaseColor.secondBlackColor}
                  tintColor={BaseColor.blackColor}
                  value={this.getGenderName(this.state.gender)}
                  onChangeText={(value) => {
                    this.setState({
                      gender: this.getGenderKey(value),
                    });
                  }}
                />
              </View>
              <View style={[styles.profileItem, {paddingVertical: 0}]}>
                <CheckBox
                  center
                  title="Salon Owner"
                  iconLeft
                  containerStyle={{
                    backgroundColor: BaseColor.whiteColor,
                    borderColor: BaseColor.whiteColor,
                  }}
                  checkedColor={BaseColor.SecondColor}
                  uncheckedColor={BaseColor.grayColor}
                  checked={this.state.owner_type == 1 ? true : false}
                  fontFamily={FontFamily.default}
                  textStyle={{fontWeight: 'normal', fontSize: 15}}
                  onPress={() => {
                    this.state.owner_type == 1
                      ? this.setState({owner_type: 0})
                      : this.setState({owner_type: 1});
                  }}
                />
                <CheckBox
                  center
                  title="Product Seller"
                  iconLeft
                  containerStyle={{
                    backgroundColor: BaseColor.whiteColor,
                    borderColor: BaseColor.whiteColor,
                  }}
                  checkedColor={BaseColor.SecondColor}
                  uncheckedColor={BaseColor.grayColor}
                  checked={this.state.owner_type == 1 ? false : true}
                  fontFamily={FontFamily.default}
                  textStyle={{fontWeight: 'normal', fontSize: 15}}
                  onPress={() => {
                    this.state.owner_type == 0
                      ? this.setState({owner_type: 1})
                      : this.setState({owner_type: 0});
                  }}
                />
              </View>
              <View style={{flexDirection: 'column', width: '100%'}}>
                {this.displayOwnerView()}
              </View>
              <View style={styles.inputGroup}>
                <CheckBox
                  center
                  title="I would like to receive promotions, tips and announcements via email and sms."
                  iconLeft
                  containerStyle={{
                    backgroundColor: BaseColor.whiteColor,
                    borderColor: BaseColor.whiteColor,
                  }}
                  checkedColor={BaseColor.SecondColor}
                  uncheckedColor={BaseColor.grayColor}
                  checked={this.state.is_subscribed == 1 ? true : false}
                  fontFamily={FontFamily.default}
                  textStyle={{fontWeight: 'normal', fontSize: 13}}
                  onPress={() => {
                    this.setState({
                      is_subscribed: this.state.is_subscribed == 1 ? 0 : 1,
                    });
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{padding: 20}}>
            <Button
              loading={this.state.loading}
              full
              onPress={() => this.onSave()}
              style={{backgroundColor: BaseColor.darkcoralColor}}>
              Sign Up
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Sign Up"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.blackColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.navigate('SignIn');
            }}
            onPressRight={() => {}}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  displayOwnerView() {
    // if (this.state.owner_type === 1) {
    return (
      <View>
        <View style={styles.inputGroup}>
          <Dropdown
            label="Business Type"
            labelFontSize={15}
            fontSize={13}
            labelTextStyle={{marginBottom: 10}}
            style={{fontFamily: FontFamily.default}}
            data={[{value: 'Company'}, {value: 'Freelancer'}]}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            value={this.state.vendor_type === 1 ? 'Company' : 'Freelancer'}
            onChangeText={(value) => {
              this.setState({
                vendor_type: value === 'Company' ? 1 : 0,
              });
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.setState({profile_url: text})}
            autoCorrect={false}
            placeholder="Business Url"
            placeholderTextColor={BaseColor.grayColor}
            selectionColor={BaseColor.primaryColor}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.setState({vendor_title: text})}
            autoCorrect={false}
            placeholder="Business Name"
            placeholderTextColor={BaseColor.grayColor}
            selectionColor={BaseColor.primaryColor}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.onChangedTel(text)}
            autoCorrect={false}
            placeholder="Business Tel"
            placeholderTextColor={BaseColor.grayColor}
            selectionColor={BaseColor.primaryColor}
            keyboardType={'numeric'}
            value={this.state.vendor_tel}
          />
        </View>

        {this.state.vendor_type == 1 ? (
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              // onChangeText={(text) => this.onChangedEntityNumber(text)}
              onChangeText={(text) =>
                this.setState({unique_entity_number: text})
              }
              autoCorrect={false}
              placeholder="Unique Entity Number"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
              keyboardType={'numeric'}
              value={this.state.unique_entity_number}
            />
          </View>
        ) : (
          <View />
        )}

        <View style={styles.inputGroup}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.setState({vendor_address: text})}
            autoCorrect={false}
            placeholder="Business Address"
            placeholderTextColor={BaseColor.grayColor}
            selectionColor={BaseColor.primaryColor}
          />
        </View>
        <Dropdown
          label="Select your neighbourhood"
          labelFontSize={15}
          fontSize={13}
          labelTextStyle={{marginBottom: 10}}
          style={{fontFamily: FontFamily.default}}
          data={this.state.neighbourhoodDropdownLst}
          rippleOpacity={0.7}
          baseColor={BaseColor.secondBlackColor}
          tintColor={BaseColor.blackColor}
          value={this.getNeighbourhoodName(this.state.vendor_area)}
          onChangeText={(value) => {
            this.setState({
              vendor_area: this.getNeighbourhoodKey(value),
            });
          }}
        />
      </View>
    );
    // }
  }

  checkInput() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      gender,
      vendor_type,
      profile_url,
      vendor_title,
      vendor_tel,
      unique_entity_number,
      vendor_address,
    } = this.state;

    if (first_name.length === 0) {
      Utils.shortNotifyMessage('First Name is required!');
      return false;
    }
    if (last_name.length === 0) {
      Utils.shortNotifyMessage('Last Name is required!');
      return false;
    }
    if (email.length === 0) {
      Utils.shortNotifyMessage('Email is required!');
      return false;
    } else {
      if (!this.validateEmail(this.state.email)) {
        Utils.shortNotifyMessage('Please Correct your email address!');
        return false;
      }
    }
    if (password.length === 0) {
      Utils.shortNotifyMessage('Password is required!');
      return false;
    } else {
      if (!this.validatePassword(this.state.password)) {
        Utils.longNotifyMessage(
          'The password needs at least 8 characters. Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.!',
        );
        return false;
      }
    }
    if (confirm_password.length === 0) {
      Utils.shortNotifyMessage('Confirm Password is required!');
      return false;
    } else {
      if (this.state.password !== this.state.confirm_password) {
        Utils.longNotifyMessage('Confirm password is incorrect!');
        return false;
      }
    }
    if (vendor_type == 1) {
      if (profile_url.length === 0) {
        Utils.shortNotifyMessage('Business Url is required!');
        return false;
      }
      if (vendor_title.length === 0) {
        Utils.shortNotifyMessage('Business Title is required!');
        return false;
      }
      if (vendor_tel.length === 0) {
        Utils.shortNotifyMessage('Business Tel is required!');
        return false;
      }
      if (unique_entity_number.length === 0) {
        Utils.shortNotifyMessage('Business Entity Number is required!');
        return false;
      }
      if (vendor_address.length === 0) {
        Utils.shortNotifyMessage('Business Address is required!');
        return false;
      }
    }
    return true;
  }

  onChangedTel(text) {
    this.setState({
      vendor_tel: text.replace(/[^0-9]/g, ''),
    });
  }

  onChangedEntityNumber(text) {
    this.setState({
      unique_entity_number: text.replace(/[^0-9]/g, ''),
    });
  }

  onSave = () => {
    if (!this.checkInput()) {
      return;
    }
    this.setState({loading: true});
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      vendor_type,
      phone_number,
      birthday,
      profile_url,
      vendor_title,
      vendor_tel,
      vendor_area,
      unique_entity_number,
      vendor_address,
      is_subscribed,
    } = this.state;
    const {navigation} = this.props;
    const {auth, actions} = this.props;
    let data = {};
    // if (vendor_type == 1) {
    data = {
      vendorInfo: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        phone_number: phone_number,
        birthday: birthday,
        gender: gender,
        vendor_type: vendor_type,
        profile_url: profile_url,
        vendor_title: vendor_title,
        vendor_tel: vendor_tel,
        unique_entity_number: unique_entity_number,
        vendor_address: vendor_address,
        vendor_area: vendor_area,
        is_subscribed: is_subscribed,
        customer_become_seller: false,
      },
    };
    console.log('vendor signup info', data);
    actions.register(data, (response) => {
      if (response.code == 0) {
        const credential = {
          email: email,
          password: password,
        };
        actions.login(credential, (response) => {
          if (response.data.code == 0) {
            this.setState({loading: false});
            navigation.navigate('Home');
          } else {
            Alert.alert(response.data.message);
          }
        });
      } else {
        Alert.alert(response.message);
        this.setState({loading: false});
      }
    });
    // }
    // else {
    //   data = {
    //     customer: {
    //       first_name: first_name,
    //       last_name: last_name,
    //       email: email,
    //       phone_number: phone_number,
    //       birthday: birthday,
    //       gender: gender,
    //       is_subscribed: is_subscribed,
    //       // vendor_type: vendor_type,
    //     },
    //     password: password,
    //   };
    //   console.log('customer signup info', data);
    //   actions.registerCustomer(data, (response) => {
    //     console.log('------- signup response', response);
    //     if (response.code == 0) {
    //       Utils.longNotifyMessage(Strings.customer_register_success);
    //       // const credential = {
    //       //   email: email,
    //       //   password: password,
    //       // };
    //       // actions.login(credential, (response) => {
    //       //   console.log('------- login response', response);
    //       //   if (response.code == 0) {
    //       //     this.setState({loading: false});
    //       //     navigation.navigate('Home');
    //       //   } else {
    //       //     Utils.longNotifyMessage(response.message);
    //       //   }
    //       // });
    //     } else if (response.code == -1) {
    //       Utils.longNotifyMessage(response.message);
    //       this.setState({loading: false});
    //     }
    //   });
    // }
  };

  getGenderName(key) {
    let name = '';
    switch (parseInt(key)) {
      case 0:
        name = 'Not Specified';
        break;
      case 1:
        name = 'Male';
        break;
      case 2:
        name = 'Female';
        break;
    }
    return name;
  }

  getGenderKey(value) {
    let key = '';
    switch (value) {
      case 'Male':
        key = 1;
        break;
      case 'Female':
        key = 2;
        break;
      case 'Not Specified':
        key = 0;
        break;
    }
    return key;
  }

  toggleSwitch = (value) => {
    let val = value ? 1 : 0;
    this.setState({vendor_type: val});
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = (password) => {
    //strongRegex
    // var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return mediumRegex.test(password);
  };

  getNeighbourhoodName(key) {
    let name = '';
    console.log('key', key);
    this.state.neighbourhoodLst.forEach((element) => {
      if (element.directory_id == key) {
        name = element.area;
        console.log('name', name);
      }
    });
    return name;
  }

  getNeighbourhoodKey(value) {
    let key = 1;
    this.state.neighbourhoodLst.forEach((element) => {
      if (element.area == value) {
        key = element.directory_id;
        console.log('key', key);
      }
    });
    return key;
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
  connect(mapStateToProps, mapDispatchToProps)(SignUp),
);
