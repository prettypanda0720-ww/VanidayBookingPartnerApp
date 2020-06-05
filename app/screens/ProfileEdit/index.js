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
import {Checkbox} from 'react-native-material-ui';
import {Dropdown} from 'react-native-material-dropdown';
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
      isOwner: false,
      checked: false,
    };
  }

  getGenderName(key) {
    let name = '';
    switch (parseInt(key)) {
      case 0:
        name = 'Not Specified';
        break;
      case 1:
        name = 'Male';
        break;
      case 2:
        name = 'Female';
        break;
    }
    return name;
  }

  getGenderKey(value) {
    let key = '';
    switch (value) {
      case 'Male':
        key = 1;
        break;
      case 'Female':
        key = 2;
        break;
      case 'Not Specified':
        key = 0;
        break;
    }
    return key;
  }

  toggleSwitch = (value) => {
    this.setState({isOwner: value});
  };

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
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="First Name"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="Last Name"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="Email"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({password: text})}
                autoCorrect={false}
                placeholder="Password"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                autoCapitalize={'none'}
                autoCompleteType={'password'}
                keyboardType={'password-address'}
                textContentType={'passwordAddress'}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({password: text})}
                autoCorrect={false}
                placeholder="Confirm Password"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                autoCapitalize={'none'}
                autoCompleteType={'password'}
                keyboardType={'password-address'}
                textContentType={'passwordAddress'}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputGroup}>
              <Dropdown
                label="Select a Gender"
                data={[
                  {value: 'Not Specified'},
                  {value: 'Male'},
                  {value: 'Female'},
                ]}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                style={{color: BaseColor.blackColor}}
                // value={this.getGenderName(staff_gender)}
                onChangeText={(value) => {
                  this.setState({
                    staff_gender: this.getGenderKey(value),
                  });
                }}
              />
            </View>
            {/* <RadioGroup /> */}
            <View style={[styles.profileItem, {paddingVertical: 15}]}>
              <Text subhead style={{color: BaseColor.titleColor}}>
                Product Seller
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleSwitch}
                value={this.state.isOwner}
              />
              <Text subhead style={{color: BaseColor.titleColor}}>
                Salon Owner
              </Text>
            </View>
            <View style={{flexDirection: 'column', width: '100%'}}>
              {this.displayOwnerView()}
            </View>
            <View style={styles.inputGroup}>
              <Checkbox
                label="I would like to receive promotions, tips and announcements via email"
                value="agree"
                checked={this.state.checked}
                onCheck={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
              />
            </View>
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

  displayOwnerView() {
    if (this.state.isOwner) {
      return (
        <View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Url"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Name"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Tel"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Unique Entity Number"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Business Address"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <Dropdown
            label="Select your neighbourhood"
            data={[
              {value: 'Aljunied'},
              {value: 'Ang Mo Kio'},
              {value: 'Balestier'},
            ]}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
            // value={this.getGenderName(staff_gender)}
            onChangeText={(value) => {
              // this.setState({
              //   staff_gender: this.getGenderKey(value),
              // });
            }}
          />
        </View>
      );
    }
  }
}
