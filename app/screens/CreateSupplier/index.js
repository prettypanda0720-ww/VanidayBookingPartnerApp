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

class CreateSupplier extends Component {
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

  phoneNumberValidation = (number) => {
    let value = number.replace(/[^\d]/g, '');
    if (value.length < 16) {
      this.setState({phoneNumber: value});
    }
  };

  render() {
    const {navigation} = this.props;
    const {loading, Values} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Add Supplier"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          <Text title2 bold>
            Supplier Details
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              SUPPLIER NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. L'Oreal"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              SUPPLIER DESCRIPTION
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.multilineTextInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. Local provider of hair products"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
              multiline={true}
              textAlign="left"
            />
          </View>
          <Text title2 bold style={{marginTop: 30}}>
            Contact Information
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              FIRST NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. John"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              LAST NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. Doe"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <FlagButton
                withEmoji={true}
                countryCode={this.state.cca2}
                onPress={() => Alert.alert('asdf')}
              />
              <View style={{marginRight: 20}}>
                <CountryPicker
                  ref={(countryPicker) => (this.countryPicker = countryPicker)}
                  cca2={this.state.cca2}
                  withFlag={true}
                  withFilter={true}
                  withCallingCode={true}
                  withAlphaFilter={true}
                  withModal={true}
                  withFlagButton={true}
                  placeholder='Select'
                  onSelect={(value) =>
                    this.setState({
                      country: value,
                      cca2: value.cca2,
                      countryCode: value.callingCode,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.phoneNumberContainer}>
              <Text style={styles.countryCodeText}>
                (+{this.state.countryCode}){' '}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.phoneInput}
                returnKeyType="done"
                onChangeText={(value) => this.phoneNumberValidation(value)}
                value={this.state.phoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              EMAIL
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="mail@example.com"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              WEBSITE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Text title2 bold style={{marginTop: 30}}>
            Physical Address
          </Text>
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              STREET
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.multilineTextInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. 12Main Street"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
              multiline={true}
              textAlign="left"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              SUBURB
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              CITY
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              STATE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              ZIP / POST CODE
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <CheckBox
              label={'SAME AS POSTAL ADDRESS'}
              checked={this.state.checked}
              onChange={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
              style={{height: 10}}
            />
          </View>
        </ScrollView>
        <View
          style={{
            marginBottom: 40,
            padding: 20,
            flex: 1,
            flexDirection: 'row',
          }}>
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

export default CreateSupplier;
