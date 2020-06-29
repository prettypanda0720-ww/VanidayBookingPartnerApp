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
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  SectionedMultiSelect,
} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {BaseStyle, BaseColor, GreenColor, FontFamily} from '@config';
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
      special_price: '',
      service_duration: '',
      vendor_sections: 0,
      isEnalbeProduct: false,
      isFeatured: false,
      index: 0,
      description: '',
      short_description: '',
      subMenuList: [],
      selectedItems: [],
      vendorSectionsLst: [],
      vendorSectionsDropdownLst: [],
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
      special_price,
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
      token: auth.user.data,
      productInfo: {
        service_name: service_name,
        sku: sku,
        price: price,
        special_price: special_price,
        category_ids: selItemsStr,
        service_duration: service_duration,
        vendor_sections: vendor_sections,
        is_featured: isFeatured ? 1 : 0,
        status: isEnalbeProduct ? 1 : 2,
        description: description,
        short_description: short_description,
      },
    };
    console.log('create service list', data);
    if (auth.user.data !== undefined) {
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
      token: auth.user.data,
    };
    const token = auth.user.data;
    myAppointmentsSvc
      .getSubMenuByMerchant(postData)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          console.log('sub menu datalist', res_profile.data);
          this.setState({
            subMenuList: res_profile.data,
          });
        }
      })
      .catch((error) => {
        Utils.shortNotifyMessage(error);
        console.log('appointment error');
        console.log(error);
      });
    const sectionsData = {
      token: token,
    };
    myAppointmentsSvc
      .getVendorSections(sectionsData)
      .then((response) => {
        const res_profile = response.data;
        // console.log('serviceDetail', res_profile);
        if (res_profile.code == 0) {
          this.setState({
            dataLoading: false,
            vendorSectionsLst: res_profile.data,
            vendorSectionsDropdownLst: res_profile.data.map((item, index) => {
              return {
                value: item.sectionName,
              };
            }),
          });
        }
      })
      .catch((error) => {
        console.log('service Detail error');
        console.log(error);
      });
  }

  toggleProductSwitch = (value) => {
    this.setState({isEnalbeProduct: value});
  };

  toggleFeaturedSwitch = (value) => {
    this.setState({isFeatured: value});
  };

  icon = ({name, size = 18, style}) => {
    let iconComponent;
    const Search = (
      <Icon
        name="search"
        size={15}
        color={BaseColor.titleColor}
        style={{paddingLeft: 10}}
      />
    );
    const Down = (
      <Icon name="angle-down" size={15} color={BaseColor.titleColor} />
    );
    const Up = <Icon name="angle-up" size={15} color={BaseColor.titleColor} />;
    const Close = <Icon name="times" size={10} color={BaseColor.titleColor} />;
    const Check = (
      <Icon name="check" size={10} color={GreenColor.darkPrimaryColor} />
    );
    const Cancel = <Icon name="times" size={20} color={BaseColor.whiteColor} />;

    switch (name) {
      case 'search':
        iconComponent = Search;
        break;
      case 'keyboard-arrow-up':
        iconComponent = Up;
        break;
      case 'keyboard-arrow-down':
        iconComponent = Down;
        break;
      case 'close':
        iconComponent = Close;
        break;
      case 'check':
        iconComponent = Check;
        break;
      case 'cancel':
        iconComponent = Cancel;
        break;
      default:
        iconComponent = null;
        break;
    }
    return <View style={styles}>{iconComponent}</View>;
  };

  displayContentView() {
    const {navigation} = this.props;
    const {
      loading,
      dataLoading,
      saveLoading,
      subMenuList,
      vendor_sections,
      vendorSectionsDropdownLst,
    } = this.state;
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
            style={BaseStyle.headerStyle}
          />
          <ScrollView
            style={{
              flexDirection: 'column',
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 60,
            }}>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Service name</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
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
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({sku: text})}
                autoCorrect={false}
                placeholder="SKU"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Short Description</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
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
              <Text style={BaseStyle.label}>Description</Text>
              <TextInput
                style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
                onChangeText={(text) => this.setState({description: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}
                multiline={true}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Normal price</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
                // onChangeText={(text) => this.onChangedPrice(text)}
                onChangeText={(text) => this.setState({price: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
                keyboardType={'numeric'}
                value={this.state.price}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Special price</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
                // onChangeText={(text) => this.onChangedSpecialPrice(text)}
                onChangeText={(text) => this.setState({special_price: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
                value={this.state.special_price}
              />
            </View>
            <Dropdown
              label="Duration(min)"
              labelFontSize={15}
              fontSize={13}
              labelTextStyle={{marginBottom: 10}}
              style={{fontFamily: FontFamily.default}}
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
            <View style={[styles.profileItem, {marginTop: 5}]}>
              <Text style={BaseStyle.label}>Publish Service</Text>
              <Switch
                name="angle-right"
                size={18}
                trackColor={{
                  false: BaseColor.grayColor,
                  true: BaseColor.MainColor,
                }}
                thumbColor={
                  this.state.isEnalbeProduct ? BaseColor.SecondColor : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleProductSwitch}
                value={this.state.isEnalbeProduct}
              />
            </View>
            <Text caption1 style={{marginTop: 10, color: BaseColor.grayColor}}>
              Select "Featured" to display this service under "Recommended for
              You" category.
            </Text>
            <View style={[styles.profileItem, {marginTop: 5}]}>
              <Text style={BaseStyle.label}>Featured</Text>
              <Switch
                trackColor={{
                  false: BaseColor.grayColor,
                  true: BaseColor.MainColor,
                }}
                thumbColor={
                  this.state.isFeatured ? BaseColor.SecondColor : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                name="angle-right"
                size={18}
                onValueChange={this.toggleFeaturedSwitch}
                value={this.state.isFeatured}
              />
            </View>
            <Text caption1 style={{marginTop: 10, color: BaseColor.grayColor}}>
              Select 2 main categories to feature your business
            </Text>
            <Dropdown
              label="Business Category"
              labelFontSize={15}
              fontSize={13}
              labelTextStyle={{marginBottom: 10}}
              style={{fontFamily: FontFamily.default}}
              data={vendorSectionsDropdownLst}
              baseColor={BaseColor.sectionColor}
              textColor={BaseColor.titleColor}
              rippleOpacity={0.7}
              onChangeText={(value) => {
                this.setState({
                  vendor_sections: this.getVendorKey(value),
                });
              }}
              value={this.getVendorName(vendor_sections)}
            />
            <SectionedMultiSelect
              items={subMenuList}
              uniqueKey="id"
              subKey="subcategory"
              selectText="Select Services..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              showChips={false}
              showCancelButton={true}
              styles={{
                selectText: {paddingLeft: 0},
                button: {backgroundColor: BaseColor.SecondColor, height: 55},
                cancelButton: {
                  backgroundColor: BaseColor.grayColor,
                  height: 55,
                },
              }}
              iconRenderer={this.icon}
            />
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
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
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

  getVendorName(key) {
    let name = '';
    console.log('key', key);
    this.state.vendorSectionsLst.forEach((element) => {
      if (element.sectionId == key) {
        name = element.sectionName;
        console.log('name', name);
      }
    });
    return name;
  }

  getVendorKey(value) {
    let key = 0;
    this.state.vendorSectionsLst.forEach((element) => {
      if (element.sectionName == value) {
        key = element.sectionId;
        console.log('key', key);
      }
    });
    return key;
  }

  onChangedPrice(text) {
    this.setState({
      price: text.replace(/[^0-9]/g, ''),
    });
  }

  onChangedSpecialPrice(text) {
    this.setState({
      special_price: text.replace(/[^0-9]/g, ''),
    });
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
