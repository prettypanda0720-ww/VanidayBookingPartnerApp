import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, FontFamily, Strings} from '@config';
import {Calendar} from 'react-native-calendars';
import * as Utils from '@utils';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {Header, SafeAreaView, Icon, Button, Text} from '@components';
import {Checkbox} from 'react-native-material-ui';
import {Dropdown} from 'react-native-material-dropdown';
import styles from './styles';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: true,
      saveLoading: false,
      firstname: '',
      lastname: '',
      email: '',
      phone_number: '',
      postal_code: '',
      birthday: '',
      vendor_type: 0,
      gender: 0,
      is_subscribed: 0,
      loading: false,
      isOwner: false,
      checked: false,
      modalCalendarVisible: false,
      markedDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
    };
  }

  onChangedMobileNo(text) {
    this.setState({
      phone_number: text.replace(/[^0-9]/g, ''),
    });
  }

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
    this.setState({isOwner: value});
  };

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
      birthday: day.dateString,
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

  componentDidMount() {
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    const data = {
      token: token,
    };
    myAppointmentsSvc
      .fetchPersonalProfile(data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          console.log('fetchPersonalProfile', res_profile.data);
          this.setState({
            firstname: res_profile.data.firstname,
            lastname: res_profile.data.lastname,
            email: res_profile.data.email,
            phone_number: res_profile.data.phone_number,
            gender: res_profile.data.gender,
            birthday: res_profile.data.birthday,
            is_subscribed: res_profile.data.is_subscribed ? 1 : 0,
            dataLoading: false,
          });
        } else {
          this.setState({dataLoading: false});
        }
      })
      .catch((error) => {
        Utils.shortNotifyMessage(error);
        this.setState({dataLoading: false});
      });
  }

  displayContentView() {
    const {navigation} = this.props;
    if (this.state.dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Profile"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
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
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Profile"
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
              navigation.goBack();
            }}
            onPressRight={() => {}}
            style={BaseStyle.headerStyle}
          />
          <ScrollView>
            <View style={styles.contain}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({firstname: text})}
                  autoCorrect={false}
                  placeholder="First Name"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                  value={this.state.firstname}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({lastname: text})}
                  autoCorrect={false}
                  placeholder="Last Name"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                  value={this.state.lastname}
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
                  value={this.state.email}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.onChangedMobileNo(text)}
                  autoCorrect={false}
                  placeholder="Phone Number"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                  keyboardType={'numeric'}
                  value={this.state.phone_number}
                />
              </View>
              {/* <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({person_address: text})}
                  autoCorrect={false}
                  placeholder="Address"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({postal_code: text})}
                  autoCorrect={false}
                  placeholder="Postal code"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View> */}
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
                        current={this.state.birthday}
                        minDate={'1900-12-31'}
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
                  <Text style={BaseStyle.label}>Birthday</Text>
                  <Text style={BaseStyle.label}>
                    {this.state.birthday == ''
                      ? this.state.birthday
                      : Utils.getFormattedLongDate(
                          Utils.getDateFromDate(this.state.birthday),
                        )}
                  </Text>
                </TouchableOpacity>
              </View>
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
              <View
                style={[
                  styles.inputGroup,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Checkbox
                  label="Product Seller"
                  value="agree"
                  checked={!this.state.isOwner}
                  onCheck={() =>
                    this.setState({
                      isOwner: !this.state.isOwner,
                    })
                  }
                />
                <Checkbox
                  label="Salon Owner"
                  value="agree"
                  checked={this.state.isOwner}
                  onCheck={() =>
                    this.setState({
                      isOwner: !this.state.isOwner,
                    })
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Checkbox
                  label="Subscribed to promotions, tips and announcement on email and sms."
                  value="agree"
                  checked={this.state.is_subscribed == 1 ? true : false}
                  onCheck={() =>
                    this.setState({
                      is_subscribed: this.state.is_subscribed == 1 ? 0 : 1,
                    })
                  }
                />
              </View>
            </View>
          </ScrollView>
          <View style={{padding: 20}}>
            <Button
              loading={this.state.saveLoading}
              full
              onPress={() => {
                this.onSave();
              }}>
              Save
            </Button>
          </View>
        </SafeAreaView>
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  checkInput() {
    const {firstname, lastname, email} = this.state;

    if (firstname.length === 0) {
      Utils.shortNotifyMessage('First Name is required!');
      return false;
    }
    if (lastname.length === 0) {
      Utils.shortNotifyMessage('Last Name is required!');
      return false;
    }
    if (email.length === 0) {
      Utils.shortNotifyMessage('Email is required!');
      return false;
    }
    return true;
  }

  onSave = () => {
    const {navigation} = this.props;
    if (!this.checkInput()) {
      return;
    }
    this.setState({saveLoading: true});
    const {
      firstname,
      lastname,
      email,
      phone_number,
      birthday,
      gender,
      is_subscribed,
    } = this.state;
    const {auth} = this.props;
    const data = {
      token: auth.user.data,
      customerDetail: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        gender: gender,
        phone_number: phone_number,
        birthday: birthday,
        is_subscribed: is_subscribed,
      },
    };
    console.log('updatePersonalProfile', data);

    myAppointmentsSvc
      .updatePersonalProfile(data)
      .then((response) => {
        const res_profile = response.data;
        console.log('updatepersonalprofile', res_profile);
        if (res_profile.code == 0) {
          Utils.shortNotifyMessage(Strings.update_personprofile_success);
          this.setState({saveLoading: false});
          navigation.goBack();
        } else {
          this.setState({saveLoading: false});
        }
      })
      .catch((error) => {
        Utils.shortNotifyMessage(Strings.update_personprofile_fail);
        this.setState({saveLoading: false});
      });
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
