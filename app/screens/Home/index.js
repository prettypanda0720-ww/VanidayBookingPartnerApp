import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import drawerStyles from './drawerStyles';
import Drawer from 'react-native-drawer';
import {
  Icon,
  DatePicker,
  ExpandableCalendar,
  Timeline,
  CalendarProvider,
} from '@components';
import {WeekCalendar} from 'react-native-calendars';
import moment from 'moment';
import {BaseColor, Images} from '@config';

import {Header} from 'react-native/Libraries/NewAppScreen';

import WeekView from './WeekView/WeekView.js';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CalendarActions} from '@actions';
import PropTypes from 'prop-types';
import store from 'app/store';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const ITEMS = [
  {
    title: dates[0],
    data: [{hour: '12am', duration: '1h', title: 'HairCut'}],
  },
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'HairCut'},
      {hour: '5pm', duration: '1h', title: 'HairCut'},
    ],
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Hair Removal'},
      {hour: '2pm', duration: '1h', title: 'Brazil Massage'},
      {hour: '3pm', duration: '1h', title: 'Massage'},
    ],
  },
  {
    title: dates[3],
    data: [{hour: '12am', duration: '1h', title: 'Hair Removal'}],
  },
  {title: dates[4], data: [{}]},
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'},
    ],
  },
  {
    title: dates[6],
    data: [{hour: '12am', duration: '1h', title: 'Hair Removal'}],
  },
  {title: dates[7], data: [{}]},
  {
    title: dates[8],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'},
    ],
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Hair Removal'},
      {hour: '2pm', duration: '1h', title: 'Brazil Massage'},
      {hour: '3pm', duration: '1h', title: 'Massage'},
    ],
  },
  {
    title: dates[10],
    data: [{hour: '12am', duration: '1h', title: 'Hair Removal'}],
  },
];

const EVENTS = [
  {
    start: '2017-09-06 22:30:00',
    end: '2017-09-06 23:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: 'green',
  },
  {
    start: '2017-09-07 00:30:00',
    end: '2017-09-07 01:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-07 01:30:00',
    end: '2017-09-07 02:20:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-07 04:10:00',
    end: '2017-09-07 04:40:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-07 01:05:00',
    end: '2017-09-07 01:45:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-07 14:30:00',
    end: '2017-09-07 16:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-08 01:20:00',
    end: '2017-09-08 02:20:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-08 04:10:00',
    end: '2017-09-08 04:40:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-08 00:45:00',
    end: '2017-09-08 01:45:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-08 11:30:00',
    end: '2017-09-08 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-09 01:30:00',
    end: '2017-09-09 02:00:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-09 03:10:00',
    end: '2017-09-09 03:40:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-09 00:10:00',
    end: '2017-09-09 01:45:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: '2017-09-10 12:10:00',
    end: '2017-09-10 13:45:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
];

const selectedDate = new Date();
const generateDates = (hours, minutes) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};
const events = [
  {
    id: 1,
    description: 'Event 1',
    startDate: generateDates(0),
    endDate: generateDates(2),
    color: '#f0f3ff',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: generateDates(1),
    endDate: generateDates(4),
    color: '#f0f3ff',
  },
  {
    id: 3,
    description: 'Event 3',
    startDate: generateDates(-5),
    endDate: generateDates(-3),
    color: '#f0f3ff',
  },
];

class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {drawerOpen: null, weekView: true};

    let unsubscribe = store.subscribe(() => {
      console.log('=========first state of viewmode============');
      // console.log(this.state.viewmode);
      console.log('=========second state of viewmode============');
      console.log(store.getState().calendar);
      // this.setState({viewmode: store.getState().calendar});
      // console.log('========state==========');
      // console.log(this.state.viewmode);
    });
  }

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    // Alert.alert('show more');
  }

  itemPressed(id) {
    // Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach((item) => {
      // only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      }
    });
    return marked;
  };

  getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  setCalendarViewMode(mode) {
    this.props.actions.setCalendarViewMode(mode);
  }

  renderSideMenuContent = () => {
    return (
      <View style={styles.sideMenuStyle}>
        <Text style={styles.calendarTitle}>CalendarView</Text>
        <View style={styles.calendarWrapper}>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center'}}
            onPress={() => {
              this.setCalendarViewMode(1);
              this.setState({drawerOpen: false});
            }}>
            <Icon name="list" size={20} color={BaseColor.whiteColor} />
            <Text style={{fontSize: 15, color: 'white'}}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center'}}
            onPress={() => {
              this.setCalendarViewMode(3);
              this.setState({drawerOpen: false});
            }}>
            <Icon name="list" size={20} color={BaseColor.whiteColor} />
            <Text style={{fontSize: 15, color: 'white'}}>3Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center'}}
            onPress={() => {
              this.setCalendarViewMode(7);
              this.setState({drawerOpen: false});
            }}>
            <Icon name="list" size={20} color={BaseColor.whiteColor} />
            <Text style={{fontSize: 15, color: 'white'}}>Week</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.staffsTitle}>Staffs</Text>
        <View style={styles.staffWrapper}>
          <Image style={styles.thumb} source={Images.profile1} />
          <TouchableOpacity
            style={styles.sideMenuContentItem}
            onPress={() => {
              this.setState({drawerOpen: false});
            }}>
            <Text style={styles.staffName}>Wendy Smith</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.staffWrapper}>
          <Image style={styles.thumb} source={Images.profile2} />
          <TouchableOpacity
            style={styles.sideMenuContentItem}
            onPress={() => {
              this.setState({drawerOpen: false});
            }}>
            <Text style={styles.staffName}>Max Lee</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.staffWrapper}>
          <Image style={styles.thumb} source={Images.profile3} />
          <TouchableOpacity
            style={styles.sideMenuContentItem}
            onPress={() => {
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
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 5,
            borderTopColor: 'BaseColor.blackColor',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity
            onPress={this.toggle}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
          <View style={{flex: 10, backgroundColor: 'white'}}>
            <DatePicker
              time="16 Apr 2020"
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({drawerOpen: true});
            }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <WeekView
          events={events}
          selectedDate={this.selectedDate}
          numberOfDays={store.getState().calendar.calendarViewMode == undefined ? 7 : store.getState().calendar.calendarViewMode}
          // onEventPress={(event) => Alert.alert('eventId:' + event.id)}
          headerStyle={styles.headerStyle}
          headerTextColor="#000"
          formatDateHeader="MMM D"
        />
      </SafeAreaView>
    );
  };

  render() {

    return (
      <Drawer
        open={this.state.drawerOpen}
        content={this.renderSideMenuContent()}
        type="overlay"
        tapToClose={true}
        styles={drawerStyles}
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
