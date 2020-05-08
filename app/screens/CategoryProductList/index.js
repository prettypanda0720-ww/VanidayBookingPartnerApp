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

class CategoryProductList extends Component {
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
          image: '',
          subName: '',
          name: 'HairCut Products',
          screen: 'CategoryProducts',
          description: '',
          rightContent: '',
        },
        {
          image: '',
          subName: '',
          name: 'Nail Products',
          screen: 'CategoryProducts',
          description: '',
          rightContent: '',
        },
        {
          image: '',
          subName: '',
          name: 'No Category',
          screen: 'CategoryProducts',
          description: '',
          rightContent: '',
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values, search} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Select Product"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <View style={{padding: 20}}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnSearch}>
              <Icon name="search" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>

            <TextInput
              style={[BaseStyle.textInput, {paddingLeft: 30}]}
              onChangeText={(text) => this.setState({search: text})}
              autoCorrect={false}
              placeholder="Scan barcode or search any Item"
              placeholderTextColor={BaseColor.grayColor}
              value={search}
              selectionColor={BaseColor.primaryColor}
              onSubmitEditing={() => {
                this.onSearch(search);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnClearSearch}>
              <Icon name="times" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          {this.state.suppliers.map((item, index) => {
            return (
              <ProfileDescription
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: BaseColor.fieldColor,
                }}
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

export default CategoryProductList;
