import React, {Component} from 'react';
import {View, TextInput, ScrollView, Switch, Image} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';

class PhysicalProductProfile extends Component {
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
  showActionSheet = () => {
    this.ActionSheet.show();
  };
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
    let routes = [
      {route: 'DecreaseStock'},
      {route: 'IncreaseStock'},
      {route: 'EditProduct'},
    ];
    const data = this.props.navigation.state.params.data;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Large Shampoo"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="ellipsis-h" size={15} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            this.showActionSheet();
          }}
          style={styles.headerStyle}
        />
        <ScrollView style={styles.mainWrapper}>
          <Text title3 bold style={{color: BaseColor.sectionColor}}>
            Large Shampoo
          </Text>
          <Text caption3 semibold style={{color: BaseColor.titleColor}}>
            Total On Hand: 1
          </Text>
          <Image source={data.image} style={styles.blockImage} />
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Barcode
            </Text>
            <Text body1 style={{color: BaseColor.titleColor}}>
              123ABC
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Retail Price
            </Text>
            <Text
              body1
              style={{
                color: BaseColor.titleColor,
                textDecorationLine: 'line-through',
              }}>
              SGD120
            </Text>
            <Text body1 style={{color: '#F00'}}>
              SGD100
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Supply Prices
            </Text>
            <Text
              body1
              style={{
                color: BaseColor.titleColor,
              }}>
              SGD120
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              AVG. Stock Cost
            </Text>
            <Text
              body1
              style={{
                color: BaseColor.titleColor,
              }}>
              SGD120
            </Text>
          </View>
          <View style={styles.stockHisWrapper}>
            <Text title3 bold style={{color: BaseColor.sectionColor}}>
              Stock History
            </Text>
          </View>
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={''}
            options={['Stock-', 'Stock+', 'Edit Product', 'Close']}
            cancelButtonIndex={3}
            destructiveButtonIndex={1}
            onPress={(index) => {
              switch (index) {
                case 0:
                  navigation.navigate('DecreaseStock');
                  break;
                case 1:
                  navigation.navigate('IncreaseStock');
                  break;
                case 2:
                  navigation.navigate('EditProduct', {data: data});
                  break;
                default:
                  break;
              }
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PhysicalProductProfile;
