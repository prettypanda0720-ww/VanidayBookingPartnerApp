import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  DatePicker,  
} from '@components';
import {BaseStyle, BaseColor} from '@config';
import styles from './styles';

class AppointmentDate extends Component {
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
      {value: "Doesn't repeat"},
      {value: 'Daily'},
      {value: 'Every 2 days'},
      {value: 'Every 3 days'},
      {value: 'Every 4 days'},
      {value: 'Every 5 days'},
      {value: 'Every 6 days'},
      {value: 'Every 7 days'},
      {value: 'Weekly'},
      {value: 'Every 2 weeks'},
      {value: 'Every 3 weeks'},
      {value: 'Every 4 weeks'},
      {value: 'Every 5 weeks'},
      {value: 'Every 6 weeks'},
      {value: 'Every 7 weeks'},
      {value: 'Every 8 weeks'},
      {value: 'Every 9 weeks'},
      {value: 'Every 10 weeks'},
      {value: 'Monthly'},
      {value: 'Every 2 Months'},
      {value: 'Every 3 Months'},
      {value: 'Every 4 Months'},
      {value: 'Every 5 Months'},
      {value: 'Every 6 Months'},
      {value: 'Every 7 Months'},
      {value: 'Every 8 Months'},
      {value: 'Every 9 Months'},
      {value: 'Every 10 Months'},
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
              Appointment Date
            </Text>
            <View style={styles.inputGroup}>
              <DatePicker />
            </View>
            <View style={[styles.inputGroup, {marginTop: 60}]}>
              <Text title2 bold>
                Repeating Options
              </Text>
              <Dropdown label="Frequency" data={duration} rippleOpacity={0.7} />
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            APPLY CHANGES
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default AppointmentDate;
