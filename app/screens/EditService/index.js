import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {View, TextInput, ScrollView, Switch} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {BaseStyle, BaseColor} from '@config';
import styles from './styles';

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      id: '',
      service_name: '',
      sku: '',
      price: '',
      service_duration: '',
      vendor_sections: '',
      isEnalbeProduct: false,
      isFeatured: false,
      index: 0,
      description: '',
      short_description: '',
      subMenuList: [],
      selectedItems: [],
    };
  }

  onDelete = () => {
    const {id} = this.state;
    const {navigation} = this.props;

    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      product_id: id,
    };
    console.log('delte service list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .deleteServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.notifyMessage('Deleting Service is successfully done!');
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.notifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  };

  onSave = () => {
    const {
      service_name,
      sku,
      price,
      selectedItems,
      service_duration,
      vendor_sections,
      description,
      short_description,
      isEnalbeProduct,
      isFeatured,
    } = this.state;
    const {navigation} = this.props;

    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      productInfo: {
        service_name: service_name,
        sku: sku,
        price: price,
        category_ids: selectedItems,
        service_duration: service_duration,
        vendor_sections: isEnalbeProduct ? 1 : 0,
        is_featured: isFeatured ? 1 : 0,
        status: isEnalbeProduct ? 1 : 0,
        description: description,
        short_description: short_description,
        entity_id: '',
      },
    };
    console.log('update service list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .updateServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.notifyMessage('Updating Service is successfully done!');
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.notifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };

  componentDidMount() {
    const {auth} = this.props;
    const postData = {
      token: auth.user.token,
    };
    const data = this.props.navigation.state.params.data;
    console.log('edit service item', data);
    const items = [];
    items.push(data.id);
    this.setState({
      id: data.id,
      service_name: data.product_name,
      price: data.product_price,
      service_duration: data.service_duration,
      isFeatured: data.status == 1 ? true : false,
      // selectedItems: items,
    });
    myAppointmentsSvc
      .getSubMenuByMerchant(postData)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          console.log('sub menu datalist', res_profile.data);
          this.setState({
            subMenuList: res_profile.data,
            dataLoading: false,
          });
        }
      })
      .catch((error) => {
        Utils.notifyMessage(error);
        console.log('appointment error');
        console.log(error);
      });
  }

  toggleProductSwitch = (value) => {
    this.setState({isEnalbeProduct: value});
  };

  toggleFeaturedSwitch = (value) => {
    this.setState({isFeatured: value});
  };

  render() {
    const {navigation} = this.props;
    const {
      loading,
      subMenuList,
      service_name,
      price,
      service_duration,
      isFeatured,
    } = this.state;
    let duration = [
      {value: '30min'},
      {value: '60min'},
      {value: '90min'},
      {value: '120min'},
      {value: '150min'},
      {value: '180min'},
      {value: '210min'},
      {value: '240min'},
      {value: '270min'},
    ];
    console.log('subMenuList', subMenuList);
    console.log('selectedItems', this.state.selectedItems);
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
            Edit Service
          </Text>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              Service name
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({service_name: text})}
              autoCorrect={false}
              placeholder="Service Name"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}>
              {service_name}
            </TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              SKU
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({sku: text})}
              autoCorrect={false}
              placeholder="SKU"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <SectionedMultiSelect
            items={subMenuList}
            uniqueKey="id"
            subKey="subcategory"
            selectText="Select Categories..."
            showDropDowns={true}
            readOnlyHeadings={false}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
          />
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              Short Description
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({short_description: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text caption3 style={{color: BaseColor.secondBlackColor}}>
              Description
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.multilineTextInput]}
              onChangeText={(text) => this.setState({description: text})}
              autoCorrect={false}
              placeholder=""
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
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
                onChangeText={(value) => {
                  this.setState({
                    service_duration: value,
                  });
                }}
                value={service_duration + 'min'}
              />
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Normal price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({price: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}>
                {price}
              </TextInput>
            </View>
            {/* <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Discount price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({service_duration: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View> */}
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
                value={isFeatured == 1 ? true : false}
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
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => this.onDelete()}>
            DELETE
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => this.onSave()}>
            SAVE
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(EditService),
);
