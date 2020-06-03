import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ServiceInput,
} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      isEnalbeProduct: false,
      isFeatured: false,
      index: 0,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
    };
  }

  toggleProductSwitch = (value) => {
    this.setState({isEnalbeProduct: value});
  };

  toggleFeaturedSwitch = (value) => {
    this.setState({isFeatured: value});
  };

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
          <Text title2 bold style={{color: BaseColor.sectionColor}}>
            Create Service
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Service name
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Service Name"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Category
            </Text>
            <ServiceInput />
          </View>
          <View style={{marginTop: 30}}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Prices
            </Text>
            <View style={{}}>
              <Dropdown
                label="Duration"
                data={duration}
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                rippleOpacity={0.7}
              />
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Normal price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Discount price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={[styles.profileItem, {marginTop: 20}]}>
              <Text body1 style={styles.sectionStyle}>
                Enable Product
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleProductSwitch}
                value={this.state.isEnalbeProduct}
              />
            </View>
            <View style={[styles.profileItem, {marginTop: 20}]}>
              <Text body1 style={styles.sectionStyle}>
                Featured
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleFeaturedSwitch}
                value={this.state.isFeatured}
              />
            </View>
            {/* <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Pricing name(optional)
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g Long hair"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
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
              <Text body2 style={{color: BaseColor.sectionColor}}>Add another pricing option</Text>
              <Icon name="plus" size={15} color={BaseColor.sectionColor} />
            </TouchableOpacity> */}
          </View>
          {/* <Text title2 bold style={{marginTop: 30, color: BaseColor.sectionColor}}>
            Staff Assigned
          </Text> */}
          {/* <View style={styles.inputGroup}>
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
                <Text subhead semibold style={{color: BaseColor.sectionColor}}>
                  Staff
                </Text>
                <Text caption2 style={{color: BaseColor.titleColor}}>
                  2staff assigned
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="angle-right"
                  size={15}
                  color={BaseColor.titleColor}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.inputGroup}>
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
                <Text body2 semibold style={{color: BaseColor.sectionColor}}>
                  Online Booking
                </Text>
                <Text caption2 style={{color: BaseColor.titleColor}}>
                  Enabled
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="angle-right"
                  size={15}
                  color={BaseColor.titleColor}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.inputGroup}>
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
                <Text body2 semibold style={{color: BaseColor.sectionColor}}>
                  Setting
                </Text>
                <Text caption2 style={{color: BaseColor.titleColor}}>
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
          </View> */}
        </ScrollView>
        <View
          style={{
            marginBottom: 40,
            padding: 20,
            flex: 1,
            flexDirection: 'row',
          }}>
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

export default CreateService;
