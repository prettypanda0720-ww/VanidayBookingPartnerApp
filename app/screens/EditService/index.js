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
  Alert,
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

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      dataLoading: true,
      saveloading: false,
      deleteLoading: false,
      id: '',
      service_name: '',
      sku: '',
      price: 0,
      special_price: '',
      service_duration: '',
      vendor_sections: '',
      isEnalbeProduct: false,
      isFeatured: false,
      index: 0,
      description: '',
      short_description: '',
      subMenuList: [],
      selectedItems: [],
      selectedItemsStr: '',
      vendorSectionsLst: [],
      vendorSectionsDropdownLst: [],
    };
  }

  componentDidMount() {
    const {navigation, auth} = this.props;
    const token = auth.user.data;
    const sku = this.props.navigation.state.params.sku;
    const data = {
      sku: sku,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .serviceDetail(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('serviceDetail', res_profile);
          if (res_profile.code == 0) {
            this.setState({
              // dataLoading: false,
              id: res_profile.data.id,
              sku: res_profile.data.sku,
              service_name: res_profile.data.name,
              // id: res_profile.data.type_id,
              price: res_profile.data.price.toString(),
              special_price: res_profile.data.special_price.toString(),
              description: res_profile.data.description,
              short_description: res_profile.data.short_description,
              isFeatured: res_profile.data.is_featured == 1 ? true : false,
              isEnalbeProduct: res_profile.data.status == 1 ? true : false,
              service_duration: res_profile.data.service_duration,
              selectedItems: res_profile.data.category_ids.map(
                (item, index) => {
                  return parseInt(item);
                },
              ),
              vendor_sections: parseInt(res_profile.data.vendor_sections),
            });
          }
        })
        .catch((error) => {
          console.log('service Detail error');
          console.log(error);
        });
      const sectionsData = {
        token: token,
      };
      myAppointmentsSvc
        .getVendorSections(sectionsData)
        .then((response) => {
          const res_profile = response.data;
          console.log('serviceDetail', res_profile);
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
    });
  }

  displayContentView() {
    const {navigation} = this.props;
    const {
      loading,
      dataLoading,
      // subMenuList,
      service_name,
      price,
      special_price,
      service_duration,
      isFeatured,
      description,
      short_description,
      vendorSectionsDropdownLst,
      vendor_sections,
      selectedItems,
    } = this.state;

    console.log('price', price);
    console.log('price', vendor_sections);
    console.log('price', this.getVendorName(vendor_sections));

    const subMenuList = this.props.navigation.state.params.subMenuList;
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
    console.log('submenulist', subMenuList);
    if (!dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Service"
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
                selectionColor={BaseColor.primaryColor}>
                {service_name}
              </TextInput>
            </View>
            {/* <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                SKU
              </Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
                onChangeText={(text) => this.setState({sku: text})}
                autoCorrect={false}
                placeholder="SKU"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View> */}
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
                value={short_description}
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
                value={description}
                multiline={true}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Normal price</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
                onChangeText={(text) => this.onChangedPrice(text)}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}
                keyboardType={'numeric'}
                value={price}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Special price</Text>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 5}]}
                onChangeText={(text) => this.onChangedSpecialPrice(text)}
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
              value={service_duration}
            />
            <View style={[styles.profileItem, {marginTop: 5}]}>
              <Text style={BaseStyle.label}>Enable Service</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleProductSwitch}
                value={this.state.isEnalbeProduct}
              />
            </View>
            <View style={[styles.profileItem, {marginTop: 5}]}>
              <Text style={BaseStyle.label}>Featured</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleFeaturedSwitch}
                value={this.state.isFeatured}
              />
            </View>
            <Dropdown
              label="Vendor Sections"
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
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={dataLoading}
            />
          </View>
          <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={this.state.deleteLoading}
              onPress={() => this.onDelete()}>
              DELETE
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={this.state.saveLoading}
              onPress={() => this.onSave()}>
              SAVE
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Service"
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

  toggleProductSwitch = (value) => {
    this.setState({isEnalbeProduct: value});
  };

  toggleFeaturedSwitch = (value) => {
    this.setState({isFeatured: value});
  };

  checkInput() {
    const {
      service_name,
      sku,
      selectedItems,
      price,
      special_price,
      service_duration,
    } = this.state;

    if (service_name.length === 0) {
      Utils.shortNotifyMessage('Service Name is required!');
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
    if (special_price.length === 0) {
      Utils.shortNotifyMessage('Special Price is required!');
      return false;
    }
    if (service_duration.length === 0) {
      Utils.shortNotifyMessage('Duration is required!');
      return false;
    }
    return true;
  }

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
      <Icon name="angle-down" size={20} color={BaseColor.titleColor} />
    );
    const Up = <Icon name="angle-up" size={20} color={BaseColor.titleColor} />;
    const Close = <Icon name="times" size={20} color={BaseColor.titleColor} />;
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

  onChangedPrice(text) {
    // this.setState({
    //   price: text.replace(/[^0-9]/g, ''),
    // });
  }

  onChangedSpecialPrice(text) {
    this.setState({
      special_price: text.replace(/[^0-9]/g, ''),
    });
  }

  deleteApply() {
    this.setState({deleteLoading: true});
    const {id} = this.state;
    const {navigation} = this.props;

    const {auth} = this.props;
    const data = {
      token: auth.user.data,
      product_id: id,
    };
    console.log('delte service list', data);
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .deleteServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({deleteLoading: false});
            Utils.shortNotifyMessage('Deleting Service is successfully done!');
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  }

  onDelete = () => {
    Alert.alert(
      'Delete Service',
      'Do you really want to delete service?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteApply(),
        },
      ],
      {cancelable: false},
    );
  };

  onSave = () => {
    console.log('selectedItems', this.state.selectedItems.length);
    this.checkInput();
    this.setState({saveLoading: true});
    const {
      id,
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
        entity_id: id,
        service_name: service_name,
        sku: sku,
        price: price,
        special_price: special_price,
        category_ids: selItemsStr,
        is_featured: isFeatured ? 1 : 0,
        service_duration: service_duration,
        vendor_sections: vendor_sections,
        description: description,
        short_description: short_description,
        status: isEnalbeProduct ? 1 : 2,
      },
    };
    console.log('update service list', data);
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .updateServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({saveLoading: false});
            Utils.shortNotifyMessage('Updating Service is successfully done!');
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
