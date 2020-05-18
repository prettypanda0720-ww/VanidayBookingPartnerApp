import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';

export default class InvoiceListItem extends Component {
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
            {clientName}&nbsp;:&nbsp;{refId}
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
                <View style={{flexDirection: 'row'}}>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
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
                    {item.price}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    caption3
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.staffName}
                  </Text>
                  <Text
                    caption3
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    {item.duration}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View style={[styles.totalContent, {flexDirection: 'row', paddingHorizontal: 10}]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Text headline bold style={{color: 'rgba(0,0,0,0.65)'}}>
              Business:
            </Text>
            <Text headline semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              &nbsp;&nbsp;SGD50
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text headline bold style={{color: 'rgba(0,0,0,0.65)'}}>
              Vaniday:
            </Text>
            <Text headline semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              &nbsp;&nbsp;SGD50
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

InvoiceListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  refId: PropTypes.string,
  clientName: PropTypes.string,
  serviceName: PropTypes.string,
  staffName: PropTypes.string,
  appointmentDate: PropTypes.string,
  total: PropTypes.string,
  price: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  onPress: PropTypes.func,
};

InvoiceListItem.defaultProps = {
  style: {},
  refId: '',
  clientName: '',
  serviceName: '',
  staffName: '',
  appointmentDate: '',
  total: '',
  price: '',
  startTime: '',
  endTime: '',
  onPress: () => {},
};
