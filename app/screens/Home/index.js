import _ from 'lodash';
import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  View,
  Alert,
} from 'react-native';
import styles from './styles';
import Drawer from 'react-native-drawer';
import {Icon, AppointmentListItem, Text, Agenda, dateutils} from '@components';
// import {Agenda} from 'react-native-calendars';
import Moment from 'moment';
import {BaseColor, Images} from '@config';
import {myAppointmentsSvc} from '@services';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
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

  renderSideMenuContent = () => {
    return (
      <View style={styles.sideMenuStyle}>
        <Text style={styles.staffsTitle}>Staff Members</Text>
        <TouchableOpacity
          style={styles.sideMenuContentItem}
          onPress={() => {
            this.setState({showMode: -1});
            setTimeout(() => {
              this.loadItems(this.state.currentDate);
            }, 1000);
            this.setState({drawerOpen: false});
          }}>
          <Text style={styles.staffName}>All staffs</Text>
        </TouchableOpacity>
        <View style={styles.staffWrapper}>
          <Image style={styles.thumb} source={Images.profile1} />
          <TouchableOpacity
            style={styles.sideMenuContentItem}
            onPress={() => {
              this.setState({showMode: 0});
              setTimeout(() => {
                this.loadItems(this.state.currentDate);
              }, 1000);
              this.setState({drawerOpen: false});
            }}>
            <Text style={styles.staffName}>Judy T</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.staffWrapper}>
          <Image style={styles.thumb} source={Images.profile3} />
          <TouchableOpacity
            style={styles.sideMenuContentItem}
            onPress={() => {
              this.setState({showMode: 1});
              setTimeout(() => {
                this.loadItems(this.state.currentDate);
              }, 1000);
              this.setState({drawerOpen: false});
            }}>
            <Text style={styles.staffName}>William Lay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderMainContent = () => {
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
                <TouchableOpacity
                  onPress={() => this.goBybtn('CreateClosedDate')}
                  style={[styles.actionBtnWrapper, {marginBottom: 10}]}>
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
                </TouchableOpacity>
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
        <View style={[styles.mainContainer, styles.headerStyle]}>
          <View style={{flex: 1}}/>
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
            <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <Agenda
          // testID={testIDs.agenda.CONTAINER}
          items={this.state.myVanidayHomeData}
          loadItemsForMonth={this.loadItems.bind(this)}
          // loadItemsForMonth={(day) => this.loadMonthData(day)}
          selected={this.state.currentDate}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // onDayPress={this.loadItems.bind(this)}
          renderKnob={() => {
            return (
              <View style={styles.knobStyle}>
                <Text footnote style={{color: BaseColor.whiteColor}}>
                  Select Date
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
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
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
    console.log('loaditems day', day);
    const {auth} = this.props;
    if (day !== undefined && auth.user.token !== undefined) {
      this.setState({month: this.getMonthName(day.month)});
      this.setState({day: day.day});
      myAppointmentsSvc
        .fetchOrderByDate(auth.user.token, -1, day.dateString)
        .then((response) => {
          console.log('appointmentsdata');
          console.log(response.data.data);
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
    }
  }

  renderItem(item) {
    return (
      <AppointmentListItem
        refId={item.id}
        acceptedState={item.status}
        customerName={'Judy T'}
        name={item.serviceName}
        staffName={item.staffName}
        appointmentDate={item.slotDate}
        startTime={item.slotTime}
        endTime={item.bookingTo}
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
      <Drawer
        open={this.state.drawerOpen}
        content={this.renderSideMenuContent()}
        type="overlay"
        tapToClose={true}
        styles={styles.drawer}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        onClose={() => {
          this.setState({drawerOpen: false});
        }}
        panOpenMask={0.8}
        captureGestures="open"
        acceptPan={false}>
        {this.renderMainContent()}
      </Drawer>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text title3 style={{color: BaseColor.sectionColor}}>
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
    return this.getMonthName(parseInt(today.getMonth()) - 1);
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

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
