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
import {BaseStyle, BaseColor} from '@config';
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
      selectedItemsStr: '',
    };
  }

  onDelete = () => {
    this.setState({deleteLoading: true});
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
            this.setState({deleteLoading: false});
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
    console.log('selectedItems', this.state.selectedItems.length);
    this.checkInput();
    this.setState({saveLoading: true});
    const {
      id,
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
        entity_id: id,
        service_name: service_name,
        price: price,
        category_ids: selItemsStr,
        is_featured: isFeatured ? 1 : 0,
        service_duration: service_duration,
        vendor_sections: isEnalbeProduct ? 1 : 0,
        description: description,
        short_description: short_description,
        status: isEnalbeProduct ? 1 : 0,
      },
    };
    console.log('update service list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .updateServiceList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({saveLoading: false});
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
    const {navigation} = this.props;
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
              dataLoading: false,
              id: res_profile.data.id,
              sku: res_profile.data.sku,
              service_name: res_profile.data.name,
              // id: res_profile.data.type_id,
              price: res_profile.data.price,
              description: res_profile.data.description,
              short_description: res_profile.data.short_description,
              isFeatured: res_profile.data.is_featured == 1 ? true : false,
              service_duration: res_profile.data.service_duration,
              selectedItems: res_profile.data.category_ids.map(
                (item, index) => {
                  return parseInt(item);
                },
              ),
              vendor_sections: res_profile.data.vendor_sections,
            });
          }
        })
        .catch((error) => {
          console.log('service Detail error');
          console.log(error);
        });
    });
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
      service_duration,
    } = this.state;

    if (service_name.length === 0) {
      Utils.notifyMessage('Service Name is required!');
      return false;
    }
    if (selectedItems.length === 0) {
      Utils.notifyMessage('Categories is required!');
      return false;
    }
    if (price.length === 0) {
      Utils.notifyMessage('Price is required!');
      return false;
    }
    if (service_duration.length === 0) {
      Utils.notifyMessage('Duration is required!');
      return false;
    }
    return true;
  }

  displayContentView() {
    const {navigation} = this.props;
    const {
      loading,
      dataLoading,
      // subMenuList,
      service_name,
      price,
      service_duration,
      isFeatured,
      selectedItems,
    } = this.state;

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
                selectionColor={BaseColor.primaryColor}>
                {service_name}
              </TextInput>
            </View>
            {/* <View style={styles.inputGroup}>
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
            </View> */}
            <SectionedMultiSelect
              items={subMenuList}
              uniqueKey="id"
              subKey="subcategory"
              selectText="Select Categories..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              showChips={false}
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
                  selectionColor={BaseColor.primaryColor}
                  keyboardType={'numeric'}>
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
            </View>
          </ScrollView>
          <View style={styles.loadingContainer}>
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
  connect(mapStateToProps, mapDispatchToProps)(EditService),
);
