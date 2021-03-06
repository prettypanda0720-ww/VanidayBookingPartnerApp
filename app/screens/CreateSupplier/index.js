import React, {Component} from 'react';
import {FlatList, View, TextInput, ScrollView, Alert} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import CheckBox from 'react-native-checkbox';
import {Values} from '@data';
import PhoneInput from 'react-native-phone-input';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CreateSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      valid: '',
      type: '',
      value: '',
      Values: Values,
    };
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
    });
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
          style={BaseStyle.headerStyle}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
            marginTop: 20,
          }}>
          <Text title2 bold style={{color: BaseColor.sectionColor}}>
            Supplier Details
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Supplier Name
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. L'Oreal"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              Supplier Description
            </Text>
            <TextInput
              style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. Local provider of hair products"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
              multiline={true}
              textAlign="left"
            />
          </View>
          <Text title2 bold style={{marginTop: 30, color: BaseColor.sectionColor}}>
            Contact Information
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              First Name
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. John"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Last Name
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. Doe"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              style={styles.phoneInputStyle}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Email
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="mail@example.com"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Website
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <Text title2 bold style={{marginTop: 30}}>
            Physical Address
          </Text>
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              Street
            </Text>
            <TextInput
              style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. 12Main Street"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
              multiline={true}
              textAlign="left"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Neighbourhood
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              State
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              City
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Zip / Post Code
            </Text>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <CheckBox
              label={'Same as postal address'}
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
