/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class AppointmentListItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  /**
   * Display hotel item as block
   */
  renderBlock() {
    const {
      style,
      acceptedState,
      name,
      staffName,
      appointmentDate,
      startTime,
      endTime,
      onPress,
    } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity
          // testID={testIDs.agenda.ITEM}
          onPress={onPress}
          style={styles.serviceItemWrapper}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
              {acceptedState}
            </Text>
            <Text style={styles.serviceItemNameStyle}>
              Service Name: {name}
            </Text>
            <Text style={styles.serviceItemNameStyle}>
              Staff Name: {staffName}
            </Text>
            <Text style={styles.serviceItemDateStyle}>{appointmentDate}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, color: 'green', fontWeight: 'bold'}}>
              {startTime}
            </Text>
            <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
              {endTime}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let {block, grid} = this.props;
    return this.renderBlock();
  }
}

AppointmentListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  acceptedState: PropTypes.string,
  name: PropTypes.string,
  staffName: PropTypes.string,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

AppointmentListItem.defaultProps = {
  style: {},
  acceptedState: '',
  name: '',
  staffName: '',
  startTime: '',
  endTime: '',
  onPress: () => {},
  onPressTag: () => {},
};
