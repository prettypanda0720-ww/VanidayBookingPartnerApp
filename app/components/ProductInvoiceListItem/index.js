import moment from 'moment';
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import * as Utils from '@utils';

export default class ProductInvoiceListItem extends Component {
  render() {
    const {
      style,
      // refId,
      clientName,
      count,
      // appointmentDate,
      total,
      vendor,
      vaniday,
      // status,
      detail,
      // startTime,
      // endTime,
      onPress,
    } = this.props;
    console.log('count', count);
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
                    {item.productName}
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
                    InvoiceID:
                  </Text>
                  <Text
                    caption1
                    semibold
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: 'rgba(0,0,0,0.65)',
                    }}>
                    #{item.invoiceId}
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
                    SGD&nbsp;{Utils.to2DigitDeciaml(item.price)}
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
                    {Utils.capitalize(item.amastyStatus)}
                  </Text>
                </View>
                {/* <View style={styles.validContent}>
                  <Text footnote semibold style={{color: 'rgba(0,0,0,0.65)'}}>
                    {Utils.getFormattedLongDate(item.slotDate)},&nbsp;
                    {Utils.formatDate(item.bookingFrom)}&nbsp;to&nbsp;
                    {Utils.formatDate(item.bookingTo)}
                  </Text>
                </View> */}
              </View>
            );
          }}
        />
        <View style={[styles.totalCountContent, {paddingHorizontal: 10}]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text subhead bold style={{color: 'rgba(0,0,0,0.65)'}}>
              Sub Total Count :
            </Text>
            <Text subhead semibold style={{color: 'rgba(0,0,0,0.65)'}}>
              &nbsp;{count}
            </Text>
          </View>
        </View>
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
              &nbsp;&nbsp;SGD&nbsp;{Utils.to2DigitDeciaml(vendor)}
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
              &nbsp;&nbsp;SGD&nbsp;{Utils.to2DigitDeciaml(vaniday)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductInvoiceListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // refId: PropTypes.string,
  clientName: PropTypes.string,
  // serviceName: PropTypes.string,
  // staffName: PropTypes.string,
  // appointmentDate: PropTypes.string,
  total: PropTypes.string,
  vendor: PropTypes.string,
  vaniday: PropTypes.string,
  count: PropTypes.string,
  // price: PropTypes.string,
  // startTime: PropTypes.string,
  // endTime: PropTypes.string,
  onPress: PropTypes.func,
};

ProductInvoiceListItem.defaultProps = {
  style: {},
  // refId: '',
  clientName: '',
  // serviceName: '',
  // staffName: '',
  // appointmentDate: '',
  total: '',
  vendor: '',
  vaniday: '',
  count: PropTypes.string,
  // price: '',
  // startTime: '',
  // endTime: '',
  onPress: () => {},
};
