import React, {Component} from 'react';
import {View, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';

import {BaseStyle, BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      index: 0,
      reminders: false,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
    };
  }

  toggleSwitch = (value) => {
    this.setState({reminders: value});
  };

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    let available = [
      {value: 'Everyone'},
      {value: 'Male'},
      {value: 'Female'},
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
              Online booking
            </Text>
            <Text caption1 numberOfLines={2} style={{marginTop: 10}}>
              Allow clients to book this service online, switch off to hide this
              service from your online bookings menu
            </Text>
            <View style={[styles.profileItem, {paddingTop: 50}]}>
              <Text body1>Enable online bookings</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleSwitch}
                value={this.state.reminders}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text body1 style={{color: BaseColor.sectionColor}}>
                Service description
              </Text>
              <Dropdown label="Service available for" data={available} rippleOpacity={0.7} />
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
        </View>
      </SafeAreaView>
    );
  }
}

export default EditService;
