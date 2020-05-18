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

class SelectPeriod extends Component {
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
      {value: 'Today'},
      {value: 'Yesterday'},
      {value: 'Last 7days'},
      {value: 'Last 30 days'},
      {value: 'Last 90 days'},
      {value: 'Last month'},
      {value: 'Last year'},
      {value: 'Week to date'},
      {value: 'Month to date'},
      {value: 'Quarter to date'},
      {value: 'Year to date'},
      {value: 'Tomorrow'},
      {value: 'Next 7 days'},
      {value: 'Next month'},
      {value: 'Next 30 days'},
      {value: 'All time'},
    ];

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
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
            <Text title2 bold>
              Select Period
            </Text>
            <View style={styles.inputGroup}>
              <Dropdown
                label="Date range"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={duration}
                rippleOpacity={0.7}
              />
            </View>
          </View>
          <View
            style={[
              styles.inputGroup,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
              <Text style={{color:BaseColor.sectionColor}}>START DATE</Text>
              <DatePicker time={'2020-04-01'} style={{marginTop: 10}} />
            </View>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
              <Text style={{color:BaseColor.sectionColor}}>END DATE</Text>
              <DatePicker time={'2020-05-01'} style={{marginTop: 10}} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.inputGroup}>
          <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={loading}
              onPress={() => navigation.goBack()}>
              Save
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SelectPeriod;
