import React, {Component} from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {Values} from '@data';
import * as Utils from '@utils';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CreateOrder extends Component {
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
            title="Create Order"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: BaseColor.blackColor,
            }}
          />
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {y: this._deltaY},
                },
              },
            ])}
            onContentSizeChange={() =>
              this.setState({
                heightHeader: Utils.heightHeader(),
              })
            }
            scrollEventThrottle={8}
            style={{
              flexDirection: 'column',
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 80,
              marginBottom: 30,
            }}>
            <View style={styles.inputGroup}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                Judy T
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor, marginTop: 10}}>
                MosCow
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                12 Street
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                Maskva
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                MosCow, 108811
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                Delivery To
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor, marginTop: 10}}>
                Makeup Artist
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                Default Address
              </Text>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                Default City
              </Text>
            </View>
            {this.state.products.map((item, index) => {
              return this.renderItem(item);
            })}
            <Button
              style={{flex: 1, marginTop: 20}}
              loading={loading}
              onPress={() => navigation.navigate('CategoryProductList')}>
              + Add Product
            </Button>
          </ScrollView>
          <TouchableOpacity
            style={styles.contentButtonBottom}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.9}>
            <View style={[styles.contentCenter, {flex: 1}]}>
              <Text headline whiteColor>
                Create Order
              </Text>
            </View>
            <View
              style={[
                styles.contentCenter,
                {flexDirection: 'column', flex: 1},
              ]}>
              <Text headline whiteColor>
                Order Total
              </Text>
              <Text caption3 whiteColor>
                SGD 6,888
              </Text>
            </View>
          </TouchableOpacity>
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
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Product
            </Text>
          </View>
          <View style={[styles.leftCenter, {flex: 2}]}>
            <Text body2 style={{color: BaseColor.titleColor}}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Order Qty
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.setState({id: text})}
            autoCorrect={false}
            placeholder="Service Name"
            placeholderTextColor={BaseColor.titleColor}
            selectionColor={BaseColor.titleColor}>
            {item.orderQty}
          </TextInput>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Supply Price
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => this.setState({id: text})}
            autoCorrect={false}
            placeholder="Service Name"
            placeholderTextColor={BaseColor.titleColor}
            selectionColor={BaseColor.titleColor}>
            {item.supplyPrice}
          </TextInput>
        </View>
        <View style={styles.orderItemWrapper}>
          <View style={[styles.leftCenter, {flex: 1}]}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Total Cost
            </Text>
          </View>
          <View style={[styles.leftCenter, {flex: 2}]}>
            <Text body2 style={{color: BaseColor.titleColor}}>
              SGD {item.totalCost}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default CreateOrder;
