import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Switch} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class Inventory extends Component {
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
        <Header
          title="Vani Mall"
          style={BaseStyle.headerStyle}
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contain}>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('PhysicalProducts');
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Icon
                  name="box-open"
                  size={25}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
                <View style={styles.summary}>
                  <Text body1>Products</Text>
                  <Text
                    caption1
                    style={{marginTop: 4, color: BaseColor.titleColor}}>
                    Manage the stock levels, pricing and details of your product
                    inventory
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Orders');
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Icon
                  name="dolly-flatbed"
                  size={25}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
                <View style={styles.summary}>
                  <Text body1>Orders</Text>
                  <Text
                    caption1
                    numberOfLines={2}
                    style={{marginTop: 4, color: BaseColor.titleColor}}>
                    Order stock from suppliers and transfer stock between your
                    locations
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Brands');
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="suitcase"
                  size={25}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
                <View style={styles.summary}>
                  <Text body1>Brands</Text>
                  <Text
                    caption1
                    style={{marginTop: 4, color: BaseColor.titleColor}}>
                    Manage the brand names associated to your product types
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Categories');
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="th-large"
                  size={25}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
                <View style={styles.summary}>
                  <Text body1>Categories</Text>
                  <Text
                    caption1
                    style={{marginTop: 4, color: BaseColor.titleColor}}>
                    Manage the categories associated to your product types
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Suppliers');
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Icon
                  name="shipping-fast"
                  size={25}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
                <View style={styles.summary}>
                  <Text body1>Suppliers</Text>
                  <Text
                    caption1
                    style={{marginTop: 4, color: BaseColor.titleColor}}>
                    Manage supplier information for use with your product stock
                    order
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
