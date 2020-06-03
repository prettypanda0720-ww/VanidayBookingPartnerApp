import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';

export default class BookingHistory extends Component {
  render() {
    const {
      style,
      refId,
      clientName,
      appointmentDate,
      total,
      status,
      detail,
      startTime,
      endTime,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.nameContent}>
          <Text subhead whiteColor bold>
            {clientName}&nbsp;:&nbsp;#{refId}
          </Text>
          <Text subhead whiteColor bold>
            {status}
          </Text>
        </View>
        <FlatList
          data={detail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.mainContent}>
                <View style={styles.serviceItemWrapper}>
                  <Text
                    caption1
                    semibold
                    style={{
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.serviceName}
                  </Text>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    ${item.price}
                  </Text>
                </View>
                <View style={styles.serviceItemWrapper}>
                  <Text
                    caption3
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.staffName == null? 'Not Assigned': item.staffName}
                  </Text>
                  <Text
                    caption3
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.duration}&nbsp;Min
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.totalContent}>
          <View style={{flexDirection: 'row'}}>
            <Text
              subhead
              bold
              style={{flex: 1, textAlign: 'left', color: 'rgba(0,0,0,0.65)'}}>
              Total
            </Text>
            <Text
              subhead
              bold
              style={{
                flex: 1,
                textAlign: 'right',
                color: 'rgba(0,0,0,0.65)',
              }}>
              ${total}
            </Text>
          </View>
        </View>
        <View style={styles.validContent}>
          <Text footnote semibold style={{color: 'rgba(0,0,0,0.65)'}}>
            {appointmentDate},&nbsp;{startTime}&nbsp;to&nbsp;{endTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

BookingHistory.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  refId: PropTypes.string,
  clientName: PropTypes.string,
  staffName: PropTypes.string,
  detail: PropTypes.array,
  appointmentDate: PropTypes.string,
  total: PropTypes.string,
  price: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  onPress: PropTypes.func,
};

BookingHistory.defaultProps = {
  style: {},
  refId: '',
  clientName: '',
  staffName: '',
  detail: [],
  appointmentDate: '',
  total: '',
  price: '',
  startTime: '',
  endTime: '',
  onPress: () => {},
};
