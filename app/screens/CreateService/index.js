import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {
  View,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {BaseStyle, BaseColor} from '@config';
import styles from './styles';

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      dataLoading: true,
      saveLoading: false,
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

  checkInput() {
    const {
      service_name,
      sku,
      selectedItems,
      price,
      service_duration,
    } = this.state;

    if (service_name.length === 0) {
      Utils.shortNotifyMessage('Service Name is required!');
      return false;
    }
    if (sku.length === 0) {
      Utils.shortNotifyMessage('SKU is required!');
      return false;
    }
    if (selectedItems.length === 0) {
      Utils.shortNotifyMessage('Categories is required!');
      return false;
    }
    if (price.length === 0) {
      Utils.shortNotifyMessage('Price is required!');
      return false;
    }
    if (service_duration.length === 0) {
      Utils.shortNotifyMessage('Duration is required!');
      return false;
    }
    return true;
  }

  onSave = () => {
    if (!this.checkInput()) {
      return;
    }
    this.setState({saveLoading: true});
    const {
      saveLoading,
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
    let selItemsStr = '';
    const count = selectedItems.length;
    if (count > 0) {
      selItemsStr = selectedItems[0];
      for (let index = 1; index < count; index++) {
        selItemsStr += ',' + selectedItems[index];
      }
    }
    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      productInfo: {
        service_name: service_name,
        sku: sku,
        price: price,
        category_ids: selItemsStr,
        service_duration: service_duration,
        vendor_sections: isEnalbeProduct ? 1 : 0,
        is_featured: isFeatured ? 1 : 0,
        // status: isEnalbeProduct ? 1 : 0,
        description: description,
        short_description: short_description,
      },
    };
    console.log('create service list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .createServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage('Creating Service is successfully done!');
            this.setState({saveLoading: false});
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
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
        Utils.shortNotifyMessage(error);
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

  displayContentView() {
    const {navigation} = this.props;
    const {loading, dataLoading, saveLoading, subMenuList} = this.state;
    let duration = [
      {value: '30'},
      {value: '60'},
      {value: '90'},
      {value: '120'},
      {value: '150'},
      {value: '180'},
      {value: '210'},
      {value: '240'},
      {value: '270'},
    ];
    if (!dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Create Service"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <ScrollView
            style={{
              flexDirection: 'column',
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 60,
            }}>
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
                selectionColor={BaseColor.primaryColor}
              />
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
                onChangeText={(text) =>
                  this.setState({short_description: text})
                }
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
                  label="Duration(min)"
                  data={duration}
                  baseColor={BaseColor.sectionColor}
                  textColor={BaseColor.titleColor}
                  rippleOpacity={0.7}
                  onChangeText={(value) => {
                    this.setState({
                      service_duration: value,
                    });
                  }}
                  value={this.state.service_duration}
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
                  selectionColor={BaseColor.primaryColor}
                  keyboardType={'numeric'}
                />
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
                  value={this.state.isFeatured}
                />
              </View>
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
              style={{flex: 1, marginLeft: 10}}
              loading={this.state.deleteLoading}
              onPress={() => this.goBack()}>
              Cancel
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={saveLoading}
              onPress={() => this.onSave()}>
              Save
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      const {dataLoading} = this.state;
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Create Service"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
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
  connect(mapStateToProps, mapDispatchToProps)(CreateService),
);
