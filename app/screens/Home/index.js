import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  View,
  Alert,
  FlatList,
} from 'react-native';
import styles from './styles';
import Drawer from 'react-native-drawer';
import {Icon, Header, Text} from '@components';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import {BaseColor, Images} from '@config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CalendarActions} from '@actions';
import PropTypes from 'prop-types';
import store from 'app/store';

class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: null,
      items: {},
      numStaffs: 2,
      showMode: -1 /* if showMode = -1, show all staffs's appointment list, if showMode = nth, show nth-staffs's appointment list, */,
      currentDay: '',
      modalVisible: false,
    };

    let unsubscribe = store.subscribe(() => {});
  }

  setCalendarViewMode(mode) {
    this.props.actions.setCalendarViewMode(mode);
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
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <Modal
          animationType="slide" // fade
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
                  style={[styles.actionBtnWrapper,{marginBottom: 10}]}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Sale
                  </Text>
                  <View style={[styles.button,{backgroundColor: BaseColor.secondBlackColor}]}>
                    <Icon name="bookmark" size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.goBybtn('CreateClosedDate')}
                  style={[styles.actionBtnWrapper,{marginBottom: 10}]}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Blocked Time
                  </Text>
                  <View style={[styles.button,{backgroundColor: BaseColor.secondBlackColor}]}>
                    <Icon name="clock" size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.goBybtn('CreateAppointment')}
                  style={styles.actionBtnWrapper}>
                  <Text headline bold style={{color: '#fff'}}>
                    New Appointment
                  </Text>
                  <View style={[styles.button,{backgroundColor: BaseColor.secondBlackColor}]}>
                    <Icon name="calendar" size={30} color={'#fff'}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={this.toggle}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="chevron-left" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 10}}>
            <Text headline bold>
              Appointments
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({drawerOpen: true});
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <Agenda
          // testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
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
          theme={{calendarBackground: 'white', agendaKnobColor: '#00bbf2'}}
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

  loadItems(day) {
    console.log(this.state.showMode);
    console.log('agenda loaditemsformonth is called!');
    this.state.items = {};
    this.state.currentDay = day;
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];

          for (let j = 0; j < this.state.numStaffs; j++) {
            let appointmentbystaff = {};
            appointmentbystaff[j] = [];

            let tpStaffName = j % 2 == 0 ? 'Judy T' : 'William Lay';
            for (let k = 0; k < 2; k++) {
              let tpState =
                k % 2 == 0 ? 'Accepted Appointment' : 'Upcoming Appointment';

              appointmentbystaff[j].push({
                acceptedState: tpState,
                name: 'HairCut' + k,
                staffName: tpStaffName,
                appointmentDate: strTime,
                startTime: '2:30 PM',
                endTime: '3:30 PM',
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
            this.state.items[strTime].push(appointmentbystaff);
          }
        }
      }

      const newItems = {};
      Object.keys(this.state.items).forEach((key1) => {
        Object.keys(this.state.items[key1]).forEach((key2) => {
          if (this.state.showMode == -1) {
            newItems[key1] = this.state.items[key1];
          } else if (this.state.showMode == key2) {
            newItems[key1] = [];
            newItems[key1].push(this.state.items[key1][key2]);
          }
        });
      });
      // console.log(newItems);
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    const newItems = [];
    Object.keys(item).forEach((key) => {
      // newItems.push(item[key]);
      // console.log('--------------------' + key);
      // console.log(item[key]);
      if (this.state.showMode == -1) {
        Object(item[key]).forEach((element) => {
          newItems.push(element);
        });
      } else if (this.state.showMode == key) {
        Object(item[key]).forEach((element) => {
          newItems.push(element);
        });
      }
    });

    return (
      <FlatList
        data={newItems}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            // testID={testIDs.agenda.ITEM}
            onPress={() => Alert.alert(item.name)}
            style={styles.serviceItemWrapper}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                {item.acceptedState}
              </Text>
              <Text style={styles.serviceItemNameStyle}>
                Service Name: {item.name}
              </Text>
              <Text style={styles.serviceItemNameStyle}>
                Staff Name: {item.staffName}
              </Text>
              <Text style={styles.serviceItemDateStyle}>
                {item.appointmentDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, color: 'green', fontWeight: 'bold'}}>
                {item.startTime}
              </Text>
              <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
                {item.endTime}
              </Text>
            </View>
          </TouchableOpacity>

          // <TouchableOpacity
          //   testID={testIDs.agenda.ITEM}
          //   style={[styles.item, {height: item.height}]}
          //   onPress={() => Alert.alert(item.name)}
          // >
          //   <Text>{item.name}</Text>
          // </TouchableOpacity>
        )}
      />
    );
  }

  showModal() {
    console.log('modal is clicked');
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  render() {
    // console.log(this.state.showMode);
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
}

App.defaultProps = {};

App.propTypes = {};

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CalendarActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
