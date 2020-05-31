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
import styles from './styles';

class EditClosedDate extends Component {
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
    const item = this.props.navigation.state.params.data;
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
          title="Edit Closed Date"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
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
                <DatePicker time={item.startDate} style={{marginTop: 10}} />
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text>END DATE</Text>
                <DatePicker time={item.endDate} style={{marginTop: 10}} />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.sectionColor}}>
                Description
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g. public holiday"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {item.reason}
              </TextInput>
            </View>
            <View style={[styles.inputGroup, {marginTop: 50}]}>
              <Text title2 bold style={{color: BaseColor.sectionColor}}>
                Repeating Options
              </Text>
              <Dropdown
                label="Frequency"
                data={duration}
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
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

export default EditClosedDate;
