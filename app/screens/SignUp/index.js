import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {Calendar} from 'react-native-calendars';
import * as Utils from '@utils';
import ImagePicker from 'react-native-image-picker';
import {Dropdown} from 'react-native-material-dropdown';
import {Checkbox} from 'react-native-material-ui';
import PhoneInput from 'react-native-phone-input';

import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  Text,
  Image,
  RadioGroup,
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
      vendor_type: 0,
      // Below fields are added in case of salow owner
      profile_url: '',
      vendor_title: '',
      vendor_tel: '',
      unique_entity_number: '',
      vendor_address: '',
      image_name: '',
      image_base64_content: null,
      avatarSource: null,
      loading: false,
      birthday: '',
      modalCalendarVisible: false,
      markedDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    return year + '-' + month + '-' + date;
  }

  openCalendarModal() {
    this.setState({
      modalCalendarVisible: true,
    });
  }

  setBookingDate(day) {
    this.setState({
      markedDates: {
        [day.dateString]: {selected: true, marked: false},
      },
    });
    this.markedDates = day.dateString;
    console.log('marketDates', this.markedDates);
  }

  onDateApply() {
    console.log('marketDates-onDateApply()', this.markedDates);
    if (this.markedDates !== undefined) {
      let shortDate = Utils.getFormattedShortDate(new Date(this.markedDates));
      this.setState({birthday: shortDate});
    } else {
      this.setState({birthday: this.getCurrentDate()});
    }
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

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let filepath = {uri: response.uri};
        // You can also display the image using data:
        let source = {uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          image_name: response.fileName,
          avatarSource: source,
          image_base64_content: response.data,
        });
      }
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
      confirm_password,
      gender,
      vendor_type,
      profile_url,
      vendor_title,
      vendor_tel,
      unique_entity_number,
      vendor_address,
      image_name,
      image_base64_content,
    } = this.state;
    const {navigation} = this.props;
    const {auth, actions} = this.props;
    let data = {};
    if (vendor_type == 1) {
      data = {
        vendorInfo: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          gender: gender,
          vendor_type: vendor_type,
          profile_url: profile_url,
          vendor_title: vendor_title,
          vendor_tel: vendor_tel,
          unique_entity_number: unique_entity_number,
          vendor_address: vendor_address,
          image_name: image_name,
          image_base64_content: image_base64_content,
        },
      };
    } else {
      data = {
        vendorInfo: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          gender: gender,
          vendor_type: vendor_type,
        },
      };
    }

    console.log('signup info', data);
    actions.register(data, (response) => {
      console.log('------- signup response', response);
      if (response.customer_id !== undefined) {
        const credential = {
          email: email,
          password: password,
        };
        actions.login(credential, (response) => {
          console.log('------- login response', response);
          if (response.code == 0) {
            console.log('success');
            this.setState({loading: false});
            navigation.navigate('Home');
          } else {
            Utils.longNotifyMessage('Register failed!');
          }
        });
      } else {
        Utils.longNotifyMessage('Register failed!');
        this.setState({loading: false});
      }
    });
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
    var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return strongRegex.test(password);
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Sign Up"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.navigate('SignIn');
          }}
          onPressRight={() => {}}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.contain}>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({first_name: text})}
                autoCorrect={false}
                placeholder="First Name"
                placeholderTextColor={BaseColor.SecondColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({last_name: text})}
                autoCorrect={false}
                placeholder="Last Name"
                placeholderTextColor={BaseColor.SecondColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
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
                onChangeText={(text) => this.setState({confirm_password: text})}
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
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({person_address: text})}
                autoCorrect={false}
                placeholder="Address"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({phone_no: text})}
                autoCorrect={false}
                placeholder="Phone No"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Modal
                isVisible={this.state.modalCalendarVisible}
                backdropColor="rgba(0, 0, 0, 0.5)"
                backdropOpacity={1}
                animationIn="fadeIn"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
                <View style={styles.contentModal}>
                  <View style={styles.contentCalendar}>
                    <Calendar
                      style={{
                        borderRadius: 8,
                      }}
                      markedDates={this.state.markedDates}
                      current={this.getCurrentDate()}
                      minDate={this.getCurrentDate()}
                      maxDate={'2099-12-31'}
                      onDayPress={(day) => this.setBookingDate(day)}
                      monthFormat={'MMMM yyyy '}
                      onMonthChange={(month) => {
                        console.log('month changed', month);
                      }}
                      theme={{
                        textSectionTitleColor: BaseColor.textPrimaryColor,
                        selectedDayBackgroundColor: BaseColor.primaryColor,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: BaseColor.primaryColor,
                        dayTextColor: BaseColor.textPrimaryColor,
                        textDisabledColor: BaseColor.grayColor,
                        dotColor: BaseColor.primaryColor,
                        selectedDotColor: '#ffffff',
                        arrowColor: BaseColor.primaryColor,
                        monthTextColor: BaseColor.textPrimaryColor,
                        textDayFontFamily: FontFamily.default,
                        textMonthFontFamily: FontFamily.default,
                        textDayHeaderFontFamily: FontFamily.default,
                        textMonthFontWeight: 'bold',
                        textDayFontSize: 14,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 14,
                      }}
                    />
                    <View style={styles.contentActionCalendar}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({modalCalendarVisible: false});
                        }}>
                        <Text body1>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({modalCalendarVisible: false});
                          this.onDateApply();
                        }}>
                        <Text body1 primaryColor>
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.dateInfo}
                onPress={() => this.openCalendarModal()}>
                <Text headline light style={{color: BaseColor.sectionColor}}>
                  Birthday
                </Text>
                <Text headline semibold>
                  {Utils.getFormattedLongDate(
                    Utils.getDateFromDate(
                      this.state.birthday == ''
                        ? this.getCurrentDate()
                        : this.state.birthday,
                    ),
                  )}
                  {/* {Utils.getDateFromDate(staff_joined_date)} */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Dropdown
                label="Select a Gender"
                data={[
                  {value: 'Not Specified'},
                  {value: 'Male'},
                  {value: 'Female'},
                ]}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                style={{color: BaseColor.blackColor}}
                value={this.getGenderName(this.state.gender)}
                onChangeText={(value) => {
                  this.setState({
                    gender: this.getGenderKey(value),
                  });
                }}
              />
            </View>
            {/* <RadioGroup /> */}
            <View style={[styles.profileItem, {paddingVertical: 15}]}>
              <Text subhead style={{color: BaseColor.titleColor}}>
                Product Seller
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleSwitch}
                value={this.state.vendor_type == 1 ? true : false}
              />
              <Text subhead style={{color: BaseColor.titleColor}}>
                Salon Owner
              </Text>
            </View>
            <View style={{flexDirection: 'column', width: '100%'}}>
              {this.displayOwnerView()}
            </View>
            <View style={styles.inputGroup}>
              <Checkbox
                label="I would like to receive promotions, tips and announcements via email and sms."
                value="agree"
                checked={this.state.checked}
                onCheck={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            loading={this.state.loading}
            full
            onPress={() => this.onSave()}>
            Sign Up
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  displayOwnerView() {
    if (this.state.vendor_type == 1) {
      return (
        <View>
          <Text headline style={styles.headerTitle}>
            Featured Image
          </Text>
          {/* <View style={styles.wrapper}> */}
          {/* <Image source={this.state.avatarSource} style={styles.blockImage} />cool */}
          {/* </View> */}
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View
              style={[
                styles.avatar,
                styles.avatarContainer,
                {marginBottom: 20},
              ]}>
              {this.state.avatarSource === null ? (
                <Text
                  style={{
                    flex: 1,
                    marginTop: 10,
                    backgroundColor: BaseColor.SecondColor,
                    borderRadius: 8,
                    paddingVertical: 15,
                    color: BaseColor.whiteColor,
                    textAlign: 'center',
                  }}>
                  Upload Business Photo
                </Text>
              ) : (
                <Image
                  source={this.state.avatarSource}
                  style={styles.blockImage}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({profile_url: text})}
              autoCorrect={false}
              placeholder="Business Url"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({vendor_title: text})}
              autoCorrect={false}
              placeholder="Business Name"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.onChangedTel(text)}
              autoCorrect={false}
              placeholder="Business Tel"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
              value={this.state.vendor_tel}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.onChangedEntityNumber(text)}
              autoCorrect={false}
              placeholder="Unique Entity Number"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
              value={this.state.unique_entity_number}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({vendor_address: text})}
              autoCorrect={false}
              placeholder="Business Address"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Dropdown
            label="Select your neighbourhood"
            data={[
              {value: 'Aljunied'},
              {value: 'Ang Mo Kio'},
              {value: 'Balestier'},
            ]}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
            // value={this.getGenderName(staff_gender)}
            onChangeText={(value) => {
              // this.setState({
              //   staff_gender: this.getGenderKey(value),
              // });
            }}
          />
        </View>
      );
    }
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
