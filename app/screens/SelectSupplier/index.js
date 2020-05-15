import React, {Component} from 'react';
import {
  FlatList,
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
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  CustomPhoneInput,
  ProfileDescription,
} from '@components';
import CheckBox from 'react-native-checkbox';
import {Values} from '@data';
import CountryPicker, {
  DARK_THEME,
  FlagButton,
  withFlagButton,
  withCallingCode,
  isPickerVisible,
} from 'react-native-country-picker-modal';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class SelectSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      countryCode: 65,
      cca2: 'SG',
      country: 'SG',
      phoneNumber: '',
      Values: Values,
      suppliers: [
        {
          image: Images.profile1,
          subName: '',
          name: 'Judy T',
          screen: 'CreateOrder',
          description: '',
          rightContent: '',
        },
        {
          image: Images.profile2,
          subName: '',
          name: 'Wang Wei',
          screen: 'CreateOrder',
          description: '',
          rightContent: '',
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Select Supplier"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
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
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          <View style={[styles.inputGroup, styles.contentCenter]}>
            <Text body2 style={{color: BaseColor.titleColor}}>
              Select a supplier to order product stock from
            </Text>
          </View>
          {this.state.suppliers.map((item, index) => {
            return (
              <ProfileDescription
                style={{marginTop: 10}}
                key={'service' + index}
                image={item.image}
                description={item.description}
                name={item.name}
                subName={item.subName}
                rightContent={item.rightContent}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SelectSupplier;
