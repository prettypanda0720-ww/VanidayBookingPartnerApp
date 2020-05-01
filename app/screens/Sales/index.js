import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Switch} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class Sales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {shopData, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header title="Sales" style={styles.headerStyle} />
        <View style={styles.contain}>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={{flexDirection: 'row', flex: 20}}>
                  <Icon
                    name="dollar-sign"
                    size={25}
                    color={BaseColor.blackColor}
                    style={{marginLeft: 5}}
                  />
                  <View style={styles.summary}>
                    <Text body1>Daily Sales</Text>
                    <Text caption1 style={{marginTop: 4}}>
                      See daily totals of sales made and payments collected
                    </Text>
                  </View>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Appointments');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={{flexDirection: 'row', flex: 20}}>
                  <Icon
                    name="calendar"
                    size={25}
                    color={BaseColor.blackColor}
                    style={{marginLeft: 5}}
                  />
                  <View style={styles.summary}>
                    <Text body1>Appointments</Text>
                    <Text caption1 numberOfLines={2} style={{marginTop: 4}}>
                      List of all appointments booked, with filter and export options
                    </Text>
                  </View>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>  
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Appointments');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={{flexDirection: 'row', flex: 20}}>
                  <Icon
                    name="receipt"
                    size={25}
                    color={BaseColor.blackColor}
                    style={{marginLeft: 5}}
                  />
                  <View style={styles.summary}>
                    <Text body1>Invoices</Text>
                    <Text caption1 style={{marginTop: 4}}>
                      List of all sales made, with filter and export options
                    </Text>
                  </View>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('EcardList');
              }}>
              <View style={styles.saleItemWrapper}>
                <View style={{flexDirection: 'row',flex: 20}}>
                  <Icon
                    name="credit-card"
                    size={25}
                    color={BaseColor.blackColor}
                    style={{marginLeft: 5}}
                  />
                  <View style={styles.summary}>
                    <Text body1>Ecards</Text>
                    <Text caption1 style={{marginTop: 4}}>
                      List of all ecards issued, with filter and export options
                    </Text>
                  </View>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5, flex: 1}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
