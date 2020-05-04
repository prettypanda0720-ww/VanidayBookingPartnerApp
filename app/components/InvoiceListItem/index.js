/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Button} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class InvoiceListItem extends Component {
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
      refId,
      clientName,
      serviceName,
      staffName,
      status,
      price,
      appointmentDate,
      startTime,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}}
        style={styles.serviceItemWrapper}>
        <Text style={styles.serviceIdStyle}>{refId}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.serviceItemNameStyle}>
              Client Name: {clientName}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
              }}>
              {price}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.serviceItemNameStyle}>
            Service Name: {serviceName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.serviceItemNameStyle}>
              Staff Name: {staffName}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
              }}>
              {status}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.serviceItemDateStyle}>
            {appointmentDate}
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
              }}>
              {startTime}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.serviceItemDateStyle}>Payment Mode :</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                fontWeight: 'bold',
              }}>
              Online
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Text body1 bold>
              Salon:
            </Text>
            <Text body1 semibold>
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
            <Text body1 bold>
              Vaniday:
            </Text>
            <Text body1 semibold>
              &nbsp;&nbsp;SGD50
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let {block, grid} = this.props;
    return this.renderBlock();
  }
}

InvoiceListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  refId: PropTypes.string,
  clientName: PropTypes.string,
  serviceName: PropTypes.string,
  staffName: PropTypes.string,
  status: PropTypes.string,
  appointmentDate: PropTypes.string,
  startTime: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

InvoiceListItem.defaultProps = {
  style: {},
  refId: '',
  clientName: '',
  serviceName: '',
  staffName: '',
  status: '',
  appointmentDate: '',
  startTime: '',
  price: '',
  onPress: () => {},
  onPressTag: () => {},
};
