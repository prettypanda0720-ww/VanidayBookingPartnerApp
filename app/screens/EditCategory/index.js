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

class EditCategory extends Component {
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
          title="Edit Category"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              CATEGORY NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. L'Oreal"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
        </ScrollView>
        <View
          style={{
            marginBottom: 0,
            padding: 20,
            flexDirection: 'row',
          }}>
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
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditCategory;
