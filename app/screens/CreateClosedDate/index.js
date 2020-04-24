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
  Switch,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  SignupTextInput,
  Button,
  ProfileDescription,
  PhoneInput,
  DatePicker,
  VanidayTimePicker,
  ServiceInput,
  DurationPicker,
} from '@components';

import {Dropdown} from 'react-native-material-dropdown';

import {TabView, TabBar} from 'react-native-tab-view';
import CheckBox from 'react-native-checkbox';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import PropTypes from 'prop-types';
import * as Utils from '@utils';
import styles from './styles';

class CreateClosedDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      index: 0,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    let duration = [
      {value: '1h'},
      {value: '2h'},
      {value: '3h'},
      {value: '4h'},
      {value: '5h'},
      {value: '6h'},
      {value: '7h'},
      {value: '8h'},
      {value: '9h'},
    ];

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="New Closed Date"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={{flexDirection: 'column', padding: 20, paddingBottom: 40}}>
          <View style={{marginTop: 0}}>
            <Text
              caption3
              style={{
                color: '#4079a0',
                backgroundColor: '#daeffd',
                padding: 10,
              }}>
              Online bookings can not be placed during closed dates.
            </Text>
            <View
              style={[
                styles.inputGroup,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                <Text>START DATE</Text>
                <DatePicker time="2020-04-10" style={{marginTop: 10}} />
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text>END DATE</Text>
                <DatePicker time="2020-04-20" style={{marginTop: 10}} />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: '#b0b0b0'}}>
                Description
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g. public holiday"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Save
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateClosedDate;
