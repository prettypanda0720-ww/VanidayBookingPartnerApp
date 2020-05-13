import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@components';
import styles from './styles';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {BaseColor, FontFamily} from '@config';
import {Icon} from '@components';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      modalVisible: false
    };
  }

  openModal(open) {
    this.setState({
      modalVisible: open
    });
  }

  render() {
    const {style, time, label, onCancel, onChange} = this.props;
    const {modalVisible} = this.state;
    return (
      <View style={[styles.contentPickDate, style]}>
        <Modal
          isVisible={modalVisible}
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
                  borderRadius: 8
                }}
                markedDates={this.state.markedDates}
                current={'2019-05-05'}
                minDate={'2019-05-10'}
                maxDate={'2019-05-30'}
                onDayPress={(day) => {
                  console.log('selected day', day);
                }}
                onDayLongPress={(day) => {
                  console.log('selected day', day);
                }}
                monthFormat={'dd-MM-yyyy'}
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
                  textDayHeaderFontSize: 14
                }}
              />
              <View style={styles.contentActionCalendar}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisible: false});
                    onCancel();
                  }}>
                  <Text body1>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisible: false});
                    onChange();
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
          style={styles.itemPick}
          onPress={() => this.openModal(true)}>
          <Text body1 semibold style={{color: BaseColor.titleColor}}>
            {time}
          </Text>
          <Icon
            name="angle-down"
            size={18}
            color={BaseColor.sectionColor}
            style={{marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

DatePicker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  time: PropTypes.string,
  label: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func
};

DatePicker.defaultProps = {
  style: {},
  time: '2020-04-25',
  label: 'Label',
  onCancel: () => {},
  onChange: () => {}
};
