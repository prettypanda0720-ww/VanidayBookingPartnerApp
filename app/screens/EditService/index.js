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

class EditService extends Component {
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
    const data = this.props.navigation.state.params.data;
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
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
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
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          <Text title2 bold>
            Edit Service
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              Service name
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Service Name"
              placeholderTextColor={BaseColor.MainPrimaryColor}
              selectionColor={BaseColor.primaryColor}>
              {data.serviceTitle}
            </TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: '#b0b0b0'}}>
              Treatment type
            </Text>
            <ServiceInput data={data} />
          </View>
          <View style={{marginTop: 30}}>
            <Text title2 bold>
              Prices
            </Text>
            <View style={{}}>
              <Dropdown label="Duration" data={duration} rippleOpacity={0.7} />
              <Text body2 style={{color: '#b0b0b0'}}>
                Retail price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {data.price}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: '#b0b0b0'}}>
                Special price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {data.price}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: '#b0b0b0'}}>
                Pricing name(optional)
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g Long hair"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {data.price}
              </TextInput>
            </View>
            <TouchableOpacity
              style={[
                styles.inputGroup,
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={() => navigation.navigate('NewPricingOption')}>
              <Text body2>Add another pricing option</Text>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="plus" size={15} color={BaseColor.blackColor} />
              </View>
            </TouchableOpacity>
          </View>
          <Text title2 bold style={{marginTop: 30}}>
            Other Options
          </Text>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={[
                styles.inputGroup,
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  borderBottomColor: BaseColor.grayColor,
                  borderBottomWidth: 1,
                },
              ]}
              onPress={() => navigation.navigate('PickStaff')}>
              <View>
                <Text body2 semibold>
                  Staff
                </Text>
                <Text caption2 style={{color: '#b0b0b0'}}>
                  2staff assigned
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="angle-right"
                  size={15}
                  color={BaseColor.blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={[
                styles.inputGroup,
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  borderBottomColor: BaseColor.grayColor,
                  borderBottomWidth: 1,
                },
              ]}
              onPress={() => navigation.navigate('OnlineBooking')}>
              <View>
                <Text body2 semibold>
                  Online Booking
                </Text>
                <Text caption2 style={{color: '#b0b0b0'}}>
                  Enabled
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="angle-right"
                  size={15}
                  color={BaseColor.blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={[
                styles.inputGroup,
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  borderBottomColor: BaseColor.grayColor,
                  borderBottomWidth: 1,
                },
              ]}
              onPress={() => navigation.navigate('NewPricingOption')}>
              <View>
                <Text body2 semibold>
                  Setting
                </Text>
                <Text caption2 style={{color: '#b0b0b0'}}>
                  Custom
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="angle-right"
                  size={15}
                  color={BaseColor.blackColor}
                />
              </View>
            </TouchableOpacity>
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
            style={{flex: 1, marginRight: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Delete
          </Button>
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
