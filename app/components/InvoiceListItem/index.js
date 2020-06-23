import moment from 'moment';
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import * as Utils from '@utils';

export default class InvoiceListItem extends Component {
  render() {
    const {
      style,
      // refId,
      clientName,
      count,
      // appointmentDate,
      total,
      // status,
      detail,
      // startTime,
      // endTime,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.nameContent}>
          <Text subhead whiteColor bold>
            {clientName}
          </Text>
          {/* <Text subhead whiteColor bold>
            {status}
          </Text> */}
        </View>
        <FlatList
          listKey={moment().valueOf().toString()}
          data={detail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.mainContent}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}
                    numberOfLines={2}>
                    {item.serviceName}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    caption1
                    semibold
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
                <View style={{flexDirection: 'row'}}>
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
                    {item.service_duration} Min
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    caption1
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    Status:
                  </Text>
                  <Text
                    caption1
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {Utils.capitalize(item.status)}
                  </Text>
                </View>
                <View style={styles.validContent}>
                  <Text footnote semibold style={{color: 'rgba(0,0,0,0.65)'}}>
                    {Utils.getFormattedLongDate(item.slotDate)},&nbsp;
                    {Utils.getTimeFromDate(item.bookingFrom)}&nbsp;to&nbsp;
                    {Utils.getTimeFromDate(item.bookingTo)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View
          style={[
            styles.totalContent,
            {flexDirection: 'row', paddingHorizontal: 10},
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Text subhead bold style={{color: 'rgba(0,0,0,0.65)'}}>
              Business:
            </Text>
            <Text subhead semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              &nbsp;&nbsp;SGD{parseFloat(total) / 10}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text subhead bold style={{color: 'rgba(0,0,0,0.65)'}}>
              Vaniday:
            </Text>
            <Text subhead semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              &nbsp;&nbsp;SGD{(parseFloat(total) * 9) / 10}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

InvoiceListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // refId: PropTypes.string,
  clientName: PropTypes.string,
  // serviceName: PropTypes.string,
  // staffName: PropTypes.string,
  // appointmentDate: PropTypes.string,
  total: PropTypes.string,
  count: PropTypes.string,
  // price: PropTypes.string,
  // startTime: PropTypes.string,
  // endTime: PropTypes.string,
  onPress: PropTypes.func,
};

InvoiceListItem.defaultProps = {
  style: {},
  // refId: '',
  clientName: '',
  // serviceName: '',
  // staffName: '',
  // appointmentDate: '',
  total: '',
  count: PropTypes.string,
  // price: '',
  // startTime: '',
  // endTime: '',
  onPress: () => {},
};
