/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import XDate from 'xdate';
export default class AppointmentListItem extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Display hotel item as block
   */
  renderBlock() {
    const {
      style,
      acceptedState,
      customerName,
      name,
      staffName,
      appointmentDate,
      startTime,
      endTime,
      duration,
      onPress,
    } = this.props;
    const date = new Date(appointmentDate);
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        onPress={onPress}
        style={styles.serviceItemWrapper}>
        <View style={styles.day}>
          <Text allowFontScaling={false} style={styles.dayNum}>
            {date.getDate() - 1}
          </Text>
          <Text allowFontScaling={false} style={styles.dayText}>
            {
              XDate.locales[XDate.defaultLocale].dayNamesShort[
                date.getDay() - 1
              ]
            }
          </Text>
        </View>
        <View style={{flexDirection: 'column', padding: 10, flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 17,
                color: BaseColor.MainPrimaryColor,
                fontWeight: 'bold',
              }}>
              {acceptedState}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: BaseColor.MainPrimaryColor,
                fontWeight: 'bold',
              }}>
              {startTime}
            </Text>
          </View>
          <Text style={styles.serviceItemNameStyle}>{customerName}</Text>
          <Text style={styles.serviceItemNameStyle}>{name}</Text>
          <Text style={[styles.serviceItemDateStyle, {marginTop: 10}]}>
            {staffName}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.serviceItemDateStyle}>
              {appointmentDate}&nbsp;&nbsp;&nbsp;{duration}
            </Text>
            <Text style={[styles.serviceItemDateStyle, {fontWeight: 'bold'}]}>
              {endTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let {block, grid, appointmentDate} = this.props;
    console.log('------appointment date-----');
    console.log(appointmentDate);
    return this.renderBlock();
  }

  getCurrentDateItem(date) {
    var today = new Date(date);
    today.getDate();
  }
}

AppointmentListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  acceptedState: PropTypes.string,
  appointmentDate: PropTypes.string,
  customerName: PropTypes.string,
  refId: PropTypes.string,
  total: PropTypes.string,
  name: PropTypes.string,
  staffName: PropTypes.string,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  duration: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

AppointmentListItem.defaultProps = {
  style: {},
  acceptedState: '',
  appointmentDate: '',
  customerName: '',
  refId: '',
  total: '',
  name: '',
  staffName: '',
  startTime: '',
  endTime: '',
  duration: '',
  onPress: () => {},
  onPressTag: () => {},
};
