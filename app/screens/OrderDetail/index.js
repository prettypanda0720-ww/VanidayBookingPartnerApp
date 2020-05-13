import React, {Component} from 'react';
import {
  View,
  TextInput,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {Values} from '@data';
import * as Utils from '@utils';
import {BaseStyle, BaseColor} from '@config';
import styles from './styles';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightHeader: Utils.heightHeader(),
      search: '',
      refreshing: false,
      loading: false,
      countryCode: 65,
      cca2: 'SG',
      country: 'SG',
      phoneNumber: '',
      Values: Values,
      products: [
        {
          name: 'Large Shampoo',
          orderQty: 56,
          supplyPrice: 123,
          totalCost: 6888,
        },
      ],
    };
    this._deltaY = new Animated.Value(0);
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values} = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView
          style={[BaseStyle.safeAreaView, {flex: 1}]}
          forceInset={{top: 'always'}}>
          <Header
            title="Order P2"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.sectionColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: BaseColor.sectionColor,
            }}
          />
          <ScrollView style={styles.container}>
            <View style={{flexDirection: 'column', paddingVertical: 10}}>
              <View style={{flexDirection:'row'}}>
                <Icon
                  name="creative-commons-nc"
                  size={30}
                  color={BaseColor.sectionColor}
                />
                <Text title2 sectionColor style={{marginLeft: 10}}>
                  Order Canceled
                </Text>
              </View>
              <Text caption3 grayColor style={{marginTop: 10}}>
                No stock received, order canceled on 8 May 2020, 00:32 at Makeup Artist by Judy T
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <Text title3 sectionColor>
                Judy T
              </Text>
              <Text footnote style={{color: '#b0b0b0', marginTop: 10}}>
                MosCow
              </Text>
              <Text footnote style={{color: '#b0b0b0'}}>
                12 Street
              </Text>
              <Text footnote style={{color: '#b0b0b0'}}>
                Maskva
              </Text>
              <Text footnote style={{color: '#b0b0b0'}}>
                MosCow, 108811
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <Text title3 sectionColor>
                DELIVERY TO
              </Text>
              <Text footnote style={{color: '#b0b0b0', marginTop: 10}}>
                Makeup Artist
              </Text>
              <Text footnote style={{color: '#b0b0b0'}}>
                Default Address
              </Text>
              <Text footnote style={{color: '#b0b0b0'}}>
                Default City
              </Text>
            </View>
            {this.state.products.map((item, index) => {
              return this.renderItem(item);
            })}
            <View style={styles.orderItemWrapper}>
              <View style={[styles.leftCenter, {flex: 1}]}>
                <Text body2 sectionColor>
                  ORDER TOTAL
                </Text>
              </View>
              <View style={[styles.rightCenter, {flex: 2}]}>
                <Text title3 bold sectionColor>
                  SGD 6888
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View
        style={styles.orderWrapper}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.8}>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 sectionColor>
              PRODUCT
            </Text>
          </View>
          <View style={[styles.leftCenter, {flex: 2}]}>
            <Text body2 grayColor>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 sectionColor>
              ORDER QTY
            </Text>
          </View>
          <TextInput
            style={[BaseStyle.textInput, styles.textInput]}
            onChangeText={(text) => this.setState({id: text})}
            autoCorrect={false}
            placeholder="Service Name"
            placeholderTextColor={BaseColor.MainPrimaryColor}
            selectionColor={BaseColor.primaryColor}>
            {item.orderQty}
          </TextInput>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 sectionColor>
              SUPPLY PRICE
            </Text>
          </View>
          <TextInput
            style={[BaseStyle.textInput, styles.textInput]}
            onChangeText={(text) => this.setState({id: text})}
            autoCorrect={false}
            placeholder="Service Name"
            placeholderTextColor={BaseColor.MainPrimaryColor}
            selectionColor={BaseColor.primaryColor}>
            {item.supplyPrice}
          </TextInput>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 sectionColor>
              TOTAL COST
            </Text>
          </View>
          <View style={[styles.leftCenter, {flex: 2}]}>
            <Text body2 grayColor>
              SGD {item.totalCost}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderDetail;
