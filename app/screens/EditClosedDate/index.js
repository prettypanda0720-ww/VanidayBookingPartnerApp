import React, {Component} from 'react';
import {View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  DatePicker,
} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import * as Utils from '@utils';
import styles from './styles';

class EditClosedDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      index: 0,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
      modalStartDateVisible: false,
      modalEndDateVisible: false,
      markedStartDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
      markedEndDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
      startDate: '2020-06-08',
      endDate: '2020-06-08',
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

  setBookingStartDate(day) {
    this.setState({
      markedStartDates: {
        [day.dateString]: {selected: true, marked: false},
      },
    });
    this.markedStartDates = day.dateString;
  }

  setBookingEndDate(day) {
    this.setState({
      markedEndDates: {
        [day.dateString]: {selected: true, marked: false},
      },
    });
    this.markedEndDates = day.dateString;
  }

  openStartDateCalendarModal() {
    this.setState({
      modalStartDateVisible: true,
    });
  }

  openEndDateCalendarModal() {
    this.setState({
      modalEndDateVisible: true,
    });
  }

  onStartDateApply() {
    if (this.markedStartDates !== undefined) {
      let shortDate = Utils.getFormattedShortDate(
        new Date(this.markedStartDates),
      );
      this.setState({startDate: shortDate});
    } else {
      this.setState({startDate: this.getCurrentDate()});
    }
  }

  onEndDateApply() {
    if (this.markedEndDates !== undefined) {
      let shortDate = Utils.getFormattedShortDate(
        new Date(this.markedEndDates),
      );
      this.setState({endDate: shortDate});
    } else {
      this.setState({endDate: this.getCurrentDate()});
    }
  }

  render() {
    const {navigation} = this.props;
    const {
      loading,
      modalStartDateVisible,
      modalEndDateVisible,
      startDate,
      endDate,
      markedStartDates,
      markedEndDates,
    } = this.state;
    const item = this.props.navigation.state.params.data;
    let duration = [
      {value: "Doesn't repeat"},
      {value: 'Daily'},
      {value: 'Every 2 days'},
      {value: 'Every 3 days'},
      {value: 'Every 4 days'},
      {value: 'Every 5 days'},
      {value: 'Every 6 days'},
      {value: 'Every 7 days'},
      {value: 'Weekly'},
      {value: 'Every 2 weeks'},
      {value: 'Every 3 weeks'},
      {value: 'Every 4 weeks'},
      {value: 'Every 5 weeks'},
      {value: 'Every 6 weeks'},
      {value: 'Every 7 weeks'},
      {value: 'Every 8 weeks'},
      {value: 'Every 9 weeks'},
      {value: 'Every 10 weeks'},
      {value: 'Monthly'},
      {value: 'Every 2 Months'},
      {value: 'Every 3 Months'},
      {value: 'Every 4 Months'},
      {value: 'Every 5 Months'},
      {value: 'Every 6 Months'},
      {value: 'Every 7 Months'},
      {value: 'Every 8 Months'},
      {value: 'Every 9 Months'},
      {value: 'Every 10 Months'},
    ];

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Closed Date"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView
          style={{flexDirection: 'column', padding: 20, paddingBottom: 40}}>
          <View style={{marginTop: 0}}>
            <Text
              caption3
              style={{
                color: '#4079a0',
                backgroundColor: '#daeffd',
                padding: 10,
              }}>
              Online bookings can not be placed during closed dates.
            </Text>
            <View
              style={[
                styles.inputGroup,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                <Text>START DATE</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Modal
                    isVisible={modalStartDateVisible}
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
                          markedDates={markedStartDates}
                          current={this.getCurrentDate()}
                          minDate={this.getCurrentDate()}
                          maxDate={'2099-12-31'}
                          onDayPress={(day) => this.setBookingStartDate(day)}
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
                              this.setState({modalStartDateVisible: false});
                            }}>
                            <Text body1>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({modalStartDateVisible: false});
                              this.onStartDateApply();
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
                    onPress={() => this.openStartDateCalendarModal()}>
                    {/* <Text headline light style={{color: BaseColor.sectionColor}}>
                  Joined Date
                </Text> */}
                    <Text headline semibold>
                      {Utils.getFormattedLongDate(startDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text>END DATE</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Modal
                    isVisible={modalEndDateVisible}
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
                          markedDates={markedEndDates}
                          current={this.getCurrentDate()}
                          minDate={this.getCurrentDate()}
                          maxDate={'2099-12-31'}
                          onDayPress={(day) => this.setBookingEndDate(day)}
                          monthFormat={'MMMM yyyy'}
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
                              this.setState({modalEndDateVisible: false});
                            }}>
                            <Text body1>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({modalEndDateVisible: false});
                              this.onEndDateApply();
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
                    onPress={() => this.openEndDateCalendarModal()}>
                    {/* <Text headline light style={{color: BaseColor.sectionColor}}>
                  Joined Date
                </Text> */}
                    <Text headline semibold>
                      {Utils.getFormattedLongDate(endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.sectionColor}}>
                Description
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g. public holiday"
                placeholderTextColor={BaseColor.SecondColor}
                selectionColor={BaseColor.primaryColor}>
                {item.reason}
              </TextInput>
            </View>
            <View style={[styles.inputGroup, {marginTop: 50}]}>
              <Text title2 bold style={{color: BaseColor.sectionColor}}>
                Repeating Options
              </Text>
              <Dropdown
                label="Frequency"
                data={duration}
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                rippleOpacity={0.7}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Save
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditClosedDate;
