import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {Image, SafeAreaView, TouchableOpacity, Modal, View} from 'react-native';
import styles from './styles';
import Drawer from 'react-native-drawer';
import {Icon, AppointmentListItem, Text, Agenda} from '@components';
// import {Agenda} from 'react-native-calendars';
import Moment from 'moment';
import {BaseColor, Images, BaseStyle} from '@config';
import {myAppointmentsSvc} from '@services';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigationFocus} from 'react-navigation';
import * as Utils from '@utils';
import store from 'app/store';

class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: null,
      myVanidayHomeData: {},
      numStaffs: 5,
      showMode: -1 /* if showMode = -1, show all staffs's appointment list, if showMode = nth, show nth-staffs's appointment list, */,
      currentDate: this.getCurrentDate(),
      month: this.getCurrentMonth(),
      day: '',
      modalVisible: false,
    };
  }

  componentDidMount() {}

  _dayChange = (day) => {
    const {year, month, dateString} = day;
    if (
      parseInt(
        moment(this.state.currentMonth, 'MMMM YYYY').format('MM'),
        10,
      ) !== parseInt(month, 10)
    ) {
      this.setState({currentMonth: moment(dateString).format('MMMM YYYY')});
      //FETCH MORE DATA
    }
  };

  goBybtn(route) {
    const {navigation} = this.props;
    navigation.navigate(route);
    this.hideModal();
  }

  goToScreen(route, data) {
    const {navigation} = this.props;
    navigation.navigate(route, {bookingData: data});
  }

  loadItems(day) {
    const {month} = this.state;
    if (day !== undefined) {
      console.log('initialmonth', month);
      if (month == this.getMonthName(day.month - 1)) {
        console.log('loading month', this.getMonthName(day.month - 1));
        console.log('loaditems day', day);
        const {auth} = this.props;
        myAppointmentsSvc
          .fetchOrderByDate(auth.user.data, -1, day.dateString)
          .then((response) => {
            // console.log('appointmentsdata');
            // console.log(response.data.data);
            this.state.myVanidayHomeData[day.dateString] = [];
            if (response.data.data != undefined) {
              this.setState({myVanidayHomeData: response.data.data});
            }
          })
          .catch((error) => {
            // this.state.myVanidayHomeData[day.dateString] = [];
            console.log('appointment error');
            console.log(error);
          });
        if (!this.state.myVanidayHomeData.hasOwnProperty(day.dateString)) {
          this.state.myVanidayHomeData[day.dateString] = [];
          // The purpose of this is to remove empty array without affecting the ui
          new Promise((resolve, reject) => {
            setTimeout(() => {
              delete this.state.myVanidayHomeData[day.dateString];
              resolve();
            }, 1000);
          }).catch((error) => {
            // log if needed.
            console.log(error);
          });
        }
      } else {
        // this.setState({month: this.getMonthName(day.month - 1)});
        // this.setState({day: day.day});
        if (this.props.isFocused) {
          Utils.longNotifyMessage(
            'To view appointments for another month, please click “Select Month” at the top and choose a date in that month.',
          );
        }
      }
    }
  }

  renderItem(item) {
    // console.log('startTime', item.bookingFrom);
    // console.log('startTime', Utils.formatDate(item.bookingFrom));
    // console.log('endTime', item.bookingTo);
    // console.log('endTime', Utils.formatDate(item.bookingTo));
    // console.log('endTime', Utils.formatDate('2020-06-28 19:30:00'));
    return (
      <AppointmentListItem
        refId={item.id}
        acceptedState={item.status}
        customerName={item.customerName}
        name={item.serviceName}
        staffName={item.staffName}
        appointmentDate={item.slotDate}
        startTime={Utils.formatDate(item.bookingFrom)}
        endTime={Utils.formatDate(item.bookingTo)}
        duration={item.service_duration}
        total={item.price}
        day={this.state.day}
        onPress={() => this.goToScreen('ManageAppointment', item)}
      />
    );
  }

  showModal() {
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <Modal
          // animationType="slide" // fade
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationTiming={1000}
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableOpacity
            onPress={() => this.hideModal()}
            activeOpacity={0.8}
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
            <View style={styles.saleWrapper}>
              <View style={{flexDirection: 'column'}}>
                {/* <TouchableOpacity
                  onPress={() => Alert.alert('asdf')}
                  style={[styles.actionBtnWrapper, {marginBottom: 10}]}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Sale
                  </Text>
                  <View
                    style={[
                      styles.button,
                      {backgroundColor: BaseColor.secondBlackColor},
                    ]}>
                    <Icon name="bookmark" size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                  onPress={() => this.goBybtn('CreateClosedDate')}
                  style={[styles.actionBtnWrapper, {marginBottom: 0}]}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Blocked Time
                  </Text>
                  <View
                    style={[
                      styles.button,
                      {backgroundColor: BaseColor.secondBlackColor},
                    ]}>
                    <Icon name="clock" size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => this.goBybtn('CreateAppointment')}
                  style={styles.actionBtnWrapper}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Appointment
                  </Text>
                  <View
                    style={[
                      styles.button,
                      {backgroundColor: BaseColor.secondBlackColor},
                    ]}>
                    <Icon name="calendar" size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={[styles.mainContainer, BaseStyle.headerStyle]}>
          <View style={{flex: 1}} />
          <View
            style={[styles.contentCenter, {flex: 10, flexDirection: 'column'}]}>
            <Text headline bold>
              Appointments
            </Text>
            <Text subhead semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              {this.state.month}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({drawerOpen: true});
            }}
            style={[styles.contentCenter, {flex: 1}]}>
            {/* <Icon name="bell" size={20} color={BaseColor.blackColor} /> */}
          </TouchableOpacity>
        </View>
        <Agenda
          // testID={testIDs.agenda.CONTAINER}
          items={this.state.myVanidayHomeData}
          // items={items}
          loadItemsForMonth={this.loadItems.bind(this)}
          // loadItemsForMonth={(day) => this.loadMonthData(day)}
          selected={this.state.currentDate}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={this.loadItems.bind(this)}
          renderKnob={() => {
            return (
              <View style={styles.knobStyle}>
                <Text caption1 style={{color: BaseColor.whiteColor}}>
                  Select Month
                </Text>
                <Icon
                  name="angle-down"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              </View>
            );
          }}
          // markingType={'period'}
          // markedDates={{
          //   '2020-05-08': {textColor: '#43515c'},
          //   '2020-05-09': {textColor: '#43515c'},
          //   '2020-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //   '2020-05-21': {startingDay: true, color: 'blue'},
          //   '2020-05-22': {endingDay: true, color: 'gray'},
          //   '2020-05-24': {marked: true, startingDay: true, color: 'gray'},
          //   '2020-05-25': {marked: true, color: 'gray'},
          //   '2020-05-29': {marked: true, endingDay: true, color: 'gray'},
          //   '2020-05-30': {marked: true, endingDay: true, color: 'gray'},
          // }}
          // monthFormat={'yyyy'}
          theme={{
            calendarBackground: 'white',
            agendaKnobColor: 'red',
            textColor: BaseColor.sectionColor,
          }}
          onVisibleMonthsChange={false}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onDayPress={this._dayChange}
          onDayChange={this._dayChange}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => this.showModal()}
            style={[styles.button, {backgroundColor: BaseColor.whiteColor}]}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text headline style={{color: BaseColor.sectionColor}}>
          No Upcoming Appointments!
        </Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    // return r1.name !== r2.name;
    return true;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  timeToAsianString(time) {
    const date = new Date(time);
    Moment.locale('en');
    return Moment(date).format('d MMM Y');
  }

  getCurrentMonth() {
    var today = new Date();
    console.log('today.getmonth', today.getMonth());
    return this.getMonthName(parseInt(today.getMonth()));
  }

  getCurrentDate() {
    // var today = new Date();
    // var date =
    //   today.getFullYear() +
    //   '-' +
    //   parseInt(today.getMonth() + 1) +
    //   '-' +
    //   today.getDate();
    // return "'" + date.toString() + "'";
    // return date.toString();
    return new Date();
  }

  getMonthName(number) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[number];
  }

  loadMonthData(day) {
    console.log('Month date :- ', day);
  }

  onDatePress(day) {
    console.log('On date press :- ', day);
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

export default withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
