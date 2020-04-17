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

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {drawerOpen: null, weekView: true};
  };

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
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

  renderSideMenuContent = () => {
    return (
      <View style={{height: '100%', zIndex: 10000}}>
        <Text
          style={styles.sideMenuContentItem}
          onPress={() => {
            this.setState({drawerOpen: false});
          }}>
          Staff1
        </Text>
        <Text
          style={styles.sideMenuContentItem}
          onPress={() => {
            this.setState({drawerOpen: false});
          }}>
          Staff2
        </Text>
        <Text
          style={styles.sideMenuContentItem}
          onPress={() => {
            this.setState({drawerOpen: false});
          }}>
          Staff3
        </Text>
      </View>
    );
  };

  renderMainContent = () => {
    if (!this.state.drawerOpen) {
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
              <Image source={Images.menu} style={{width: 32, height: 20}} />
            </TouchableOpacity>
          </View>
          <CalendarProvider
            date={ITEMS[0].title}
            onDateChanged={this.onDateChanged}
            onMonthChange={this.onMonthChange}
            theme={{todayButtonTextColor: '#0059ff'}}
            showTodayButton
            disabledOpacity={0.6}
            // todayBottomMargin={16}
          >
            {this.state.weekView ? (
              <WeekCalendar
                testID={'weekCalendar'}
                firstDay={1}
                markedDates={this.getMarkedDates()}
              />
            ) : (
              <ExpandableCalendar
                horizontal={true}
                // hideArrows
                // disablePan
                hideKnob
                // initialPosition={ExpandableCalendar.positions.OPEN}
                firstDay={1}
                markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                theme={this.getTheme()}
                //   leftArrowImageSource={require('../img/previous.png')}
                //   rightArrowImageSource={require('../img/next.png')}
                calendarStyle={styles.calendar}
                headerStyle={styles.calendar} // for horizontal only
                // disableWeekScroll
              />
            )}
            <Timeline
              format24h={true}
              renderEvent={false}
              eventTapped={() => {}}
              events={EVENTS}
              scrollToFirst={true}
              // start={0}
              // end={24}
            />
          </CalendarProvider>
        </SafeAreaView>
      );
    } else {
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
              <Image source={Images.menu} style={{width: 32, height: 20}} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  };

  render() {
    return (
      <Drawer
        open={this.state.drawerOpen}
        content={this.renderSideMenuContent()}
        type="overlay"
        tapToClose={true}
        styles={drawerStyles}
        openDrawerOffset={0.1}
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
