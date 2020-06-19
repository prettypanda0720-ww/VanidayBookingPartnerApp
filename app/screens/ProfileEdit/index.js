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
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Button,
  RadioGroup,
  Text,
} from '@components';
import {Checkbox} from 'react-native-material-ui';
import {Dropdown} from 'react-native-material-dropdown';
import PhoneInput from 'react-native-phone-input';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ShopsData[0].id,
      name: ShopsData[0].name,
      email: ShopsData[0].email,
      address: ShopsData[0].address,
      image: ShopsData[0].image,
      loading: false,
      isOwner: false,
      checked: false,
      birthday: '',
      modalCalendarVisible: false,
      markedDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
      mobile_no: '+65',
    };
  }

  onChangedMobileNo(text) {
    this.setState({
      mobile_no: text.replace(/[^0-9]/g, ''),
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

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Profile"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
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
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="First Name"
                placeholderTextColor={BaseColor.SecondColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="Last Name"
                placeholderTextColor={BaseColor.SecondColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({id: text})}
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
                onChangeText={(text) => this.setState({password: text})}
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
                onChangeText={(text) => this.onChangedMobileNo(text)}
                autoCorrect={false}
                placeholder="Mobile No"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                keyboardType={'numeric'}
                value={this.state.mobile_no}
              />
            </View>
            <View style={styles.inputGroup}>
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
                // value={this.getGenderName(staff_gender)}
                onChangeText={(value) => {
                  this.setState({
                    staff_gender: this.getGenderKey(value),
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
                checked={this.state.checked}
                onCheck={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
              />
              <Checkbox
                label="Salon Owner"
                value="agree"
                checked={this.state.checked}
                onCheck={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
              />
            </View>
            <View style={styles.inputGroup}>
              <Checkbox
                label="Subscribed to promotions, tips and announcement on email and sms."
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
            onPress={() => {
              this.setState(
                {
                  loading: true,
                },
                () => {
                  setTimeout(() => {
                    navigation.goBack();
                  }, 500);
                },
              );
            }}>
            Confirm
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  displayOwnerView() {
    if (this.state.isOwner) {
      return (
        <View>
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Url"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Name"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Tel"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Unique Entity Number"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
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
