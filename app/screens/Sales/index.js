import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

export default class Sales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    console.log('sales is called!');
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header title="Sales" style={BaseStyle.headerStyle} />
        <View style={styles.contain}>
          <View style={{width: '100%'}}>
            {/* <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('DailySales');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={{flexDirection: 'row', flex: 20}}>
                  <Icon
                    name="dollar-sign"
                    size={25}
                    color={'rgba(0,0,0,0.65)'}
                    style={{marginLeft: 5}}
                  />
                  <View style={styles.summary}>
                    <Text body1 style={styles.sectionStyle}>Daily Sales</Text>
                    <Text caption1 style={[styles.sectionStyle, {marginTop: 4}]}>
                      See daily totals of sales made and payments collected
                    </Text>
                  </View>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Appointments');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={styles.summary}>
                  <Text body1 style={styles.sectionStyle}>
                    Appointments
                  </Text>
                  <Text
                    caption1
                    numberOfLines={2}
                    style={[styles.sectionStyle, {marginTop: 4}]}>
                    List of all appointments booked
                  </Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Invoices');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={styles.summary}>
                  <Text body1>Service Invoice</Text>
                  <Text
                    caption1
                    numberOfLines={2}
                    style={[styles.sectionStyle, {marginTop: 4}]}>
                    Invoice for appointments completed
                  </Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('ProductAppointment');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={styles.summary}>
                  <Text body1 style={styles.sectionStyle}>
                    Products Orders
                  </Text>
                  <Text
                    caption1
                    numberOfLines={2}
                    style={[styles.sectionStyle, {marginTop: 4}]}>
                    List of all products ordered
                  </Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('ProductInvoice');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={styles.summary}>
                  <Text body1 style={styles.sectionStyle}>
                    Product Invoice
                  </Text>
                  <Text
                    caption1
                    numberOfLines={2}
                    style={[styles.sectionStyle, {marginTop: 4}]}>
                    Invoice for products sold
                  </Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('EcardList');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={styles.summary}>
                  <Text body1 style={styles.sectionStyle}>
                    Ecards
                  </Text>
                  <Text caption1 style={[styles.sectionStyle, {marginTop: 4}]}>
                    List of all ecards issued, with filter and export options
                  </Text>
                </View>
              </View>
              <Icon
                name="angle-right"
                size={18}
                color={'rgba(0,0,0,0.65)'}
                style={{marginLeft: 5, flex: 1}}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
