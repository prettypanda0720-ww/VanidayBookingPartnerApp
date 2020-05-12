import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Button,
  RadioGroup,
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
            <View>
              <Image source={this.state.image} style={[styles.thumb]} />
            </View>
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
            <RadioGroup />
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
}
