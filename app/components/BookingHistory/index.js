import moment from 'moment';
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import * as Utils from '@utils';

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
      count,
      startTime,
      endTime,
      onPress,
    } = this.props;
    console.log('status', status);
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.nameContent}>
          <Text subhead whiteColor bold>
            {clientName}
          </Text>
          <Text subhead whiteColor bold>
            {Utils.capitalize(status)}
          </Text>
        </View>
        <FlatList
          listKey={moment().valueOf().toString()}
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
                    }}
                    numberOfLines={2}>
                    Name: {item.name}
                  </Text>
                </View>
                <View style={styles.serviceItemWrapper}>
                  <Text
                    caption1
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    Price:
                  </Text>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    SGD&nbsp;{item.price}
                  </Text>
                </View>
                <View style={styles.serviceItemWrapper}>
                  <Text
                    caption1
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    Staff:{' '}
                    {item.staffName == null ? 'Not Assigned' : item.staffName}
                  </Text>
                  <Text
                    caption1
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.service_duration}&nbsp;Min
                  </Text>
                </View>
                <View style={styles.serviceItemWrapper}>
                  <Text
                    caption1
                    semibold
                    style={{
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    Status:
                  </Text>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {Utils.capitalize(status)}
                  </Text>
                </View>
                <View style={styles.validContent}>
                  <Text footnote semibold style={{color: 'rgba(0,0,0,0.65)'}}>
                    {item.bookingDate},&nbsp;
                    {Utils.formatDate(item.bookingFrom)}&nbsp;to&nbsp;
                    {Utils.formatDate(item.bookingTo)}
                  </Text>
                </View>
                <View style={styles.totalContent}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      subhead
                      bold
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        color: 'rgba(0,0,0,0.65)',
                      }}>
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
                      SGD{item.price}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
  count: '',
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
  count: '',
  startTime: '',
  endTime: '',
  onPress: () => {},
};
