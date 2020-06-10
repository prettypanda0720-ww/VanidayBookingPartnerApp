import React, {Component} from 'react';
import {View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import * as Utils from '@utils';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  BookingHistory,
  Button,
} from '@components';

import {BaseStyle, BaseColor, FontFamily} from '@config';
import {StartTimes} from '@data';
import styles from './styles';

class RescheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      timeInterval: StartTimes,
      appointmentDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      modalCalendarVisible: false,
      markedDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
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
      this.setState({appointmentDate: shortDate});
    } else {
      this.setState({appointmentDate: this.getCurrentDate()});
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  componentDidMount() {
    const item = this.props.navigation.state.params.bookingData;
    this.setState({
      appointmentDate: item.slotDate,
      startTime: Utils.getTimeFromDate(item.bookingFrom),
      endTime: Utils.autoTrackEndTime(
        item.slotDate + ' ' + Utils.getTimeFromDate(item.bookingFrom),
        30,
      ),
    });
  }

  render() {
    const item = this.props.navigation.state.params.bookingData;
    const {navigation} = this.props;
    const {
      loading,
      timeInterval,
      modalCalendarVisible,
      appointmentDate,
      markedDates,
    } = this.state;

    let status = [
      {value: 'Confirmed'},
      {value: 'Pending'},
      {value: 'Cancel'},
      {value: 'No Show'},
    ];
    const detail = [
      {
        serviceName: item.serviceName,
        staffName: item.staffName,
        price: item.price,
        duration: item.service_duration,
      },
    ];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Reschedule Appointment"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={15}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
          }}>
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Appointment Date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {/* <View style={{flex: 1}}>
                <Text headline style={{color: BaseColor.secondBlackColor}}>
                  Joined Date
                </Text>
              </View> */}
              <Modal
                isVisible={modalCalendarVisible}
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
                      markedDates={markedDates}
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
                {/* <Text headline light style={{color: BaseColor.sectionColor}}>
                  Joined Date
                </Text> */}
                <Text headline semibold>
                  {Utils.getFormattedLongDate(
                    Utils.getDateFromDate(appointmentDate),
                  )}
                  {/* {Utils.getDateFromDate(staff_joined_date)} */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.inputGroup, styles.rowBetweenAlign]}>
            <View style={{flex: 1, marginRight: 10}}>
              <Dropdown
                label="Start Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
                value={this.state.startTime}
                onChangeText={(value) => {
                  this.setState({startTime: value});
                  this.setState({
                    endTime: Utils.autoTrackEndTime(
                      this.state.appointmentDate + ' ' + this.state.startTime,
                      30,
                    ),
                  });
                }}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Dropdown
                label="End Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
                // value={Utils.getTimeFromDate(item.bookingTo)}
                value={this.state.endTime}
              />
            </View>
          </View>
          <BookingHistory
            refId={item.id}
            clientName={'Judy T'}
            appointmentDate={item.slotDate}
            total={item.price}
            status={Utils.capitalize(item.status)}
            detail={detail}
            startTime={item.slotTime}
            endTime={item.bookingTo}
            style={{paddingVertical: 20, marginHorizontal: 0}}
            onPress={() => {
              this.props.navigation.navigate('');
            }}
          />
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Payment method
            </Text>
            <Text
              headline
              semibold
              style={{color: BaseColor.sectionColor, marginLeft: 10}}>
              Credit Card (Online Payment)
            </Text>
          </View>
        </ScrollView>
        <View
          style={[
            styles.inputGroup,
            {
              justifyContent: 'flex-end',
              flexDirection: 'column',
              paddingHorizontal: 20,
              paddingVertical: 10,
            },
          ]}>
          <Button
            style={[
              styles.customBtn,
              {
                paddingVertical: 10,
                marginTop: 15,
              },
            ]}
            styleText={{fontSize: 15}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Confirm
          </Button>
          <Button
            style={[
              styles.customBtn,
              {
                backgroundColor: '#bfbfbf',
                marginTop: 15,
              },
            ]}
            styleText={{fontSize: 15}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Exit
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default RescheduleAppointment;
