import _ from 'lodash';
import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  View,
  Alert,
  FlatList,
} from 'react-native';
import styles from './styles';
import Drawer from 'react-native-drawer';
import {Icon, AppointmentListItem, Text, Agenda} from '@components';
// import {Agenda} from 'react-native-calendars';
import Moment from 'moment';
import {BaseColor, Images} from '@config';
import {HomeActions} from '@actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CalendarActions} from '@actions';
import store from 'app/store';
import XDate from 'xdate';

class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: null,
      myVanidayHomeData: {},
      numStaffs: 5,
      showMode: -1 /* if showMode = -1, show all staffs's appointment list, if showMode = nth, show nth-staffs's appointment list, */,
      currentDay: this.getCurrentDate(),
      modalVisible: false,
    };

    let unsubscribe = store.subscribe(() => {});
  }

  setCalendarViewMode(mode) {
    this.props.actions.setCalendarViewMode(mode);
  }

  async componentDidMount() {
    const {home} = this.props;
    if (home.myVanidayHomeData != undefined) {
      this.setState({myVanidayHomeData: home.myVanidayHomeData});
    }
  }

  renderSideMenuContent = () => {
    return (
      <View style={styles.sideMenuStyle}>
        <Text style={styles.staffsTitle}>Staff Members</Text>
        <TouchableOpacity
          style={styles.sideMenuContentItem}
          onPress={() => {
            this.setState({showMode: -1});
            setTimeout(() => {
              this.loadItems(this.state.currentDay);
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
                this.loadItems(this.state.currentDay);
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
                this.loadItems(this.state.currentDay);
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
    var date = new Date(this.state.currentDay);
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
                <TouchableOpacity
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
                </TouchableOpacity>
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
          <View style={{flex: 1}} />
          <View
            style={[styles.contentCenter, {flex: 10, flexDirection: 'column'}]}>
            <Text headline bold>
              Appointments
            </Text>
            <Text subhead semibold>
              May
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
          // selected={this.state.currentDay}
          selected={'2020-05-28'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={this.loadItems.bind(this)}
          // renderKnob={() => {return (<View style={{marginTop: 15, width: 60, height: 10, backgroundColor: BaseColor.fieldColor}}></View>);}}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          theme={{calendarBackground: 'white', agendaKnobColor: '#BDBDBD'}}
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
    navigation.navigate(route, {data});
  }

  loadItems(day) {
    const {home} = this.props;
    this.state.myVanidayHomeData[day.dateString] = [];
    if (home.myVanidayHomeData != undefined) {
      // this.state.myVanidayHomeData[day.dateString].cle
      this.state.myVanidayHomeData[day.dateString].push(home.myVanidayHomeData);
    }
  }

  renderItem(item) {
    return (
      <FlatList
        data={this.state.myVanidayHomeData}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <AppointmentListItem
            refId={'#125463215'}
            acceptedState={item.status}
            customerName={item.customerName}
            name={item.serviceName}
            staffName={item.staffName}
            appointmentDate={item.appointmentDate}
            startTime={item.bookingFrom}
            endTime={item.bookingTo}
            duration={item.service_duration}
            total={'SGD20'}
            onPress={() => this.goToScreen('ManageAppointment', item)}
          />
        )}
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
    console.log('state orders');
    console.log(this.state.items);
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
        <Text>This is empty date!</Text>
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

  getCurrentMonth(time) {
    var today = new Date(time);
    return today.toISOString().split('T')[1];
  }

  getCurrentDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      parseInt(today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log('date format');
    console.log(date);
    return date;
  }
}

Home.defaultProps = {};

Home.propTypes = {};

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
    home: state.home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CalendarActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
