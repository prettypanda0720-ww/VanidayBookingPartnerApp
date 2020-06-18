/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import dateutils from '../dateutils';
import styles from './styles';
import XDate from 'xdate';
import * as Utils from '@utils';

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
      day,
      price,
      total,
      onPress,
    } = this.props;
    const date = new Date(appointmentDate);
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        onPress={onPress}
        style={[styles.serviceItemWrapper, style]}>
        <View style={{flexDirection: 'column', padding: 10, flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 17,
                color: BaseColor.SecondColor,
                fontWeight: 'bold',
              }}>
              {acceptedState !== undefined
                ? Utils.capitalize(acceptedState)
                : ''}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: BaseColor.SecondColor,
                fontWeight: 'bold',
              }}>
              {startTime}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.serviceItemNameStyle, {fontSize: 17}]}>
              {customerName}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text headline bold style={{color: BaseColor.SecondColor}}>
                ${total}
              </Text>
            </View>
          </View>
          <Text style={styles.serviceItemNameStyle}>{name}</Text>
          <Text style={[styles.serviceItemDateStyle, {marginTop: 10}]}>
            {staffName == null ? 'Not Assigned' : staffName}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.serviceItemDateStyle}>
              {dateutils.getFormattedLongDate(date)}&nbsp;&nbsp;&nbsp;{duration}
              &nbsp;Min
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
  day: PropTypes.string,
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
  day: '',
  onPress: () => {},
  onPressTag: () => {},
};
