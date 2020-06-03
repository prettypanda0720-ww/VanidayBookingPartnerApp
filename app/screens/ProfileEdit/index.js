import React, {Component} from 'react';
import {View, ScrollView, TextInput, Switch} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Button,
  RadioGroup,
  Text,
} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ShopsData[0].id,
      name: ShopsData[0].name,
      email: ShopsData[0].email,
      address: ShopsData[0].address,
      image: ShopsData[0].image,
      loading: false,
      retailReminders: false,
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Profile"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.contain}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="First Name"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Last Name"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Address"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Mobile Number"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            {/* <RadioGroup /> */}
            <View style={[styles.profileItem, {paddingVertical: 15}]}>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleRetailSwitch}
                value={this.state.retailReminders}
              />
              <Text body1 style={{color: BaseColor.titleColor}}>
                Salon Owner / Product Seller
              </Text>
            </View>
            <View>{this.displayRetailView()}</View>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Name"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Name"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Tel"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Email"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Address"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Neighborhood"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            loading={this.state.loading}
            full
            onPress={() => {
              this.setState(
                {
                  loading: true,
                },
                () => {
                  setTimeout(() => {
                    navigation.goBack();
                  }, 500);
                },
              );
            }}>
            Confirm
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
              placeholderTextColor={BaseColor.MainPrimaryColor}
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
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Dropdown
            label="TAX (included in prices)"
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
}
