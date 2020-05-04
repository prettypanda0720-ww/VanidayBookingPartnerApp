import React, {Component} from 'react';
import {View, TextInput, ScrollView} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  DatePicker,
} from '@components';

import {Dropdown} from 'react-native-material-dropdown';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {StartTimes, DateTimes} from '@data';
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
      timeInterval: StartTimes,
      dateInterval: DateTimes,
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading, timeInterval, dateInterval} = this.state;
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
        <ScrollView style={styles.container}>
          <View style={{marginTop: 0}}>
            <Text caption3 style={styles.summary}>
              Online bookings can not be placed during closed dates.
            </Text>
            <View style={[styles.inputGroup, styles.rowBetweenAlign]}>
              <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                <Text>START DATE</Text>
                <DatePicker time="2020-04-10" style={{marginTop: 10}} />
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text>END DATE</Text>
                <DatePicker time="2020-04-20" style={{marginTop: 10}} />
              </View>
            </View>
            <View style={[styles.inputGroup, styles.rowBetweenAlign]}>
              <View style={{flex: 1, marginRight: 10}}>
                <Dropdown
                  label="Start Time"
                  data={timeInterval}
                  rippleOpacity={0.7}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Dropdown
                  label="End Time"
                  data={timeInterval}
                  rippleOpacity={0.7}
                />
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
            <View style={[styles.inputGroup, {marginTop: 50}]}>
              <Text title2 bold>
                Repeating Options
              </Text>
              <Dropdown
                label="Frequency"
                data={dateInterval}
                rippleOpacity={0.7}
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
