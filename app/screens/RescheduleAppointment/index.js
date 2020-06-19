import React, {Component} from 'react';
import moment from 'moment';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
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
import {myAppointmentsSvc} from '@services';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {StartTimes} from '@data';
import styles from './styles';

class RescheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataLoading: true,
      confirmLoading: false,
      timeInterval: StartTimes,
      appointmentDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      orderId: '',
      quoteItemId: '',
      staffId: '',
      modalCalendarVisible: false,
      status: '',
      customerName: '',
      totalPrice: '',
      contactNo: '',
      service_duration: 0,
      detail: [],
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
    const orderId = this.props.navigation.state.params.orderId;
    const quoteItemId = this.props.navigation.state.params.quoteItemId;
    // console.log('2020-06-20 12:10:10', Utils.formatDate('2020-06-20 12:10:10'));
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    const data = {
      token: token,
      orderId: orderId,
      quoteItemId: quoteItemId,
    };
    console.log('RescheduleAppointment', data);
    this.setState({orderId: orderId, quoteItemId: quoteItemId});
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .getOrderItemInfo(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            console.log('getOrderItemInfo', res_profile.data.status);
            this.setState({
              dataLoading: false,
              status: res_profile.data.status,
              customerName: res_profile.data.customerName,
              totalPrice: res_profile.data.totalPrice,
              detail: res_profile.data.orderInfo,
              staffId: res_profile.data.orderInfo[0].staffId,
              startTime: Utils.getTimeFromDate(
                res_profile.data.orderInfo[0].bookingFrom,
              ),
              endTime: Utils.getTimeFromDate(
                res_profile.data.orderInfo[0].bookingTo,
              ),
              appointmentDate: res_profile.data.orderInfo[0].bookingDate,
              service_duration: res_profile.data.orderInfo[0].service_duration,
              contactNo: res_profile.data.contactNo,
            });
          } else {
            Utils.shortNotifyMessage(res_profile.message);
            this.setState({dataLoading: false});
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('asdf error');
          console.log(error);
        });
    });
  }

  onRescheduleAppointment = () => {
    this.setState({confirmLoading: true});
    const {startTime, endTime} = this.state;
    const {navigation} = this.props;

    const {auth} = this.props;
    const data = {
      rescheduleInfo: {
        booked_date: this.state.appointmentDate,
        slot_start: Utils.formatDate(
          this.state.appointmentDate + ' ' + startTime,
        ),
        staff_id: this.state.staffId,
        order_item_id: this.state.quoteItemId,
      },
    };
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .rescheduleAppointment(auth.user.data, this.state.orderId, data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({confirmLoading: false});
            Utils.shortNotifyMessage(
              'Reschedule Appointment is successfully done!',
            );
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  };

  displayContentView() {
    const {navigation} = this.props;
    const {
      loading,
      timeInterval,
      modalCalendarVisible,
      appointmentDate,
      markedDates,
      orderId,
      quoteItemId,
      customerName,
      status,
      service_duration,
      totalPrice,
      contactNo,
      startTime,
      endTime,
      detail,
    } = this.state;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Reschedule Appointment"
            renderRight={() => {
              return (
                <Icon name="times" size={15} color={BaseColor.sectionColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView
            style={{
              flexDirection: 'column',
              paddingHorizontal: 20,
            }}>
            <View
              style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
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
                  {/* <Text headline light style={{color: BaseColor.sectionColor}}>
                    Joined Date
                  </Text> */}
                  <Text headline semibold>
                    {Utils.getFormattedLongDate(appointmentDate)}
                    {/* {detail.bookingDate} */}
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
                        parseInt(this.state.service_duration),
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
              refId={orderId}
              clientName={customerName}
              appointmentDate={detail.bookingDate}
              // total={detail.price}
              status={status}
              detail={detail}
              // startTime={detail.bookingFrom}
              // endTime={detail.bookingTo}
              style={{paddingVertical: 20}}
              onPress={() => {
                this.props.navigation.navigate('');
              }}
            />
            <View
              style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
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
              loading={this.state.confirmLoading}
              onPress={() => this.onRescheduleAppointment()}>
              Confirm
            </Button>
            {/* <Button
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
            </Button> */}
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Reschedule Appointment"
            renderRight={() => {
              return (
                <Icon name="times" size={15} color={BaseColor.sectionColor} />
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
  connect(mapStateToProps, mapDispatchToProps)(RescheduleAppointment),
);
