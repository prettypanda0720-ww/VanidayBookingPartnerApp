import React, {Component} from 'react';
import {View, TextInput, ScrollView, Switch, Image} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import CheckBox from 'react-native-checkbox';
import PropTypes from 'prop-types';
import * as Utils from '@utils';
import styles from './styles';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      retailReminders: false,
      stockReminders: false,
      checked: false,
    };
  }

  /**
   * @description Call when reminder option switch on/off
   */
  toggleRetailSwitch = (value) => {
    this.setState({retailReminders: value});
  };

  toggleStockSwitch = (value) => {
    this.setState({stockReminders: value});
  };
  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    let brands = [{value: 'FINDBYCOVO'}, {value: 'VANIDAY'}];
    let category = [{value: 'Category1'}, {value: 'Category2'}];
    const data = this.props.navigation.state.params.data;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Edit Product"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView style={styles.mainWrapper}>
          <Text title2 bold style={{color: BaseColor.sectionColor}}>
            Product Details
          </Text>
          <Text
            headline
            style={{
              color: BaseColor.sectionColor,
              paddingVertical: 10,
            }}>
            Product Logo
          </Text>
          <Image source={data.image} style={styles.blockImage} />
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Button
              style={{flex: 1}}
              loading={loading}
              onPress={() => navigation.goBack()}>
              Change image of Product Logo
            </Button>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              PRODUCT NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. Large Shampoo"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              BARCODE (ISBN, UPC, etc.)
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="123 ABC"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              SKU Stock Keeping Unit
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. 123ABC"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Dropdown
            label="BRAND"
            data={brands}
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            rippleOpacity={0.7}
          />
          <Dropdown
            label="Category"
            data={category}
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            rippleOpacity={0.7}
          />
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.sectionColor}}>
              DESCRIPTION
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.multilineTextInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
              multiline={true}>
              In Italian, "Covo" means a hiding place. When you come to our
              salon, you will experience a private and relaxing space and time.
              All the stylists are experienced Japanese stylists with Japanese
              quality service. Our location is on the happening Keong Saik road,
              on the ground floor in a shop house. We try out best to cater
              damage-free hair using in-house developed chemicals(developed in
              Tokyo by our owner stylist) for colouring, pem, rebonding and
              treatment. We also have Keratin treatment for damaged hair as
              well. For the best result for both hair and scalp, we use
              carbonated water in the salon. Please come to experience quality
              technique and service to Covo.
            </TextInput>
          </View>
          <View style={[styles.profileItem, {paddingVertical: 15}]}>
            <Text body1 style={{color: BaseColor.sectionColor}}>
              Enable Retail Sales
            </Text>
            <Switch
              name="angle-right"
              size={18}
              onValueChange={this.toggleRetailSwitch}
              value={this.state.retailReminders}
            />
          </View>
          <View>{this.displayRetailView()}</View>
          <View style={[styles.profileItem, {paddingVertical: 25}]}>
            <Text body1 style={{color: BaseColor.sectionColor}}>
              Enable Stock Control
            </Text>
            <Switch
              name="angle-right"
              size={18}
              onValueChange={this.toggleStockSwitch}
              value={this.state.stockReminders}
            />
          </View>
          <View>{this.displayStockView()}</View>
        </ScrollView>
        <View style={styles.btnWrapper}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            DELETE
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            SAVE
          </Button>
        </View>
      </SafeAreaView>
    );
  }
  displayRetailView() {
    let tax = [{value: 'No tax'}, {value: 'tax'}];
    if (this.state.retailReminders) {
      return (
        <View style={{flexDirection: 'column'}}>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              RETAIL PRICE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="0.00"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              SPECIAL PRICE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="0.00"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Dropdown
            label="TAX (included in prices)"
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            data={tax}
            rippleOpacity={0.7}
          />
          <View style={styles.inputGroup}>
            <CheckBox
              label={'Enable commision'}
              checked={this.state.checked}
              onChange={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
              style={{height: 10}}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.contentCenter, styles.retailWrapper]}>
          <Text caption1 semibold>
            Switch on 'Enable Retail Sales' to sell this product at checkout.
          </Text>
        </View>
      );
    }
  }

  displayStockView() {
    let supplier = [{value: 'Select supplier'}];
    if (this.state.stockReminders) {
      return (
        <View style={{flexDirection: 'column'}}>
          <View
            style={[
              styles.inputGroup,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
              <Text>SUPPLY PRICE</Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
              <Text>INITIAL STOCK</Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="0"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
          </View>
          <Dropdown
            label="SUPPLIER"
            data={supplier}
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            rippleOpacity={0.7}
          />
          <View
            style={[
              styles.inputGroup,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View style={[styles.inputGroup, {flex: 1, marginRight: 10}]}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                REORDER POINT
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="0"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={[styles.inputGroup, {flex: 1, marginLeft: 10}]}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                REORDER QTY
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="0"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.contentCenter, styles.retailWrapper]}>
          <Text caption1 semibold>
            Switch on 'Enable Stock Control' inventory levels for this product.
          </Text>
        </View>
      );
    }
  }
}

export default EditProduct;
