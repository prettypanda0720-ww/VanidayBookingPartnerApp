import React, {Component} from 'react';
import {FlatList, View, TextInput, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import CheckBox from 'react-native-checkbox';
import PropTypes from 'prop-types';
import * as Utils from '@utils';
import styles from './styles';

class IncreaseStock extends Component {
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
    let reasons = [
      {value: 'New Stock'},
      {value: 'Return'},
      {value: 'Transfer'},
      {value: 'Adjustment'},
      {value: 'Other'},
    ];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Increase Stock"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView style={styles.mainWrapper}>
          <Text body2 bold style={{color: BaseColor.sectionColor}}>
            1 units currently in stock at Makeup Artist
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              INCREASE QTY.
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
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              SUPPLY PRICE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="123.00"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <CheckBox
              label={'SAVE PRICE FOR NEXT TIME'}
              checked={this.state.checked}
              onChange={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
              style={{height: 10}}
            />
          </View>
          <Dropdown
            label="INCREASE REASON"
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            data={reasons}
            rippleOpacity={0.7}
          />
        </ScrollView>
        <View style={styles.btnWrapper}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default IncreaseStock;
