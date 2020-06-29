import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, FontFamily, Strings} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import * as Utils from '@utils';
import Swiper from 'react-native-swiper';
import styles from './styles';

class Aboutus extends Component {
  constructor(props) {
    super();
    this.state = {
      dataLoading: true,
      upLoading: false,
      loading: false,
      vendor_stripe_id: '',
      unique_entity_number: '',
      contact_number: '',
      shopTitle: '',
      location: '',
      description: '',
      primary_type: '',
      secondary_type: '',
      cancellation_policy: '',
      privacy_policy: '',
      vendor_free_cancellation_hour: '',
      photos: [],
      currentPhotoCnt: 0,
      carousel: {},
      serviceTypes: [],
      productTypes: [],
      image_name: null,
      image_base64_content: null,
      avatarSource: null,
      vendor_area: 1,
      vendor_zipcode: '',
      neighbourhoodLst: [],
      neighbourhoodDropdownLst: [],
      logo_pic: '',
    };
  }

  onSave = () => {
    const {
      vendor_stripe_id,
      unique_entity_number,
      contact_number,
      shopTitle,
      location,
      description,
      primary_type,
      secondary_type,
      cancellation_policy,
      vendor_free_cancellation_hour,
      vendor_zipcode,
      privacy_policy,
      vendor_area,
      image_name,
      image_base64_content,
    } = this.state;

    const {auth, navigation} = this.props;
    let data;
    if (image_name == null || image_name == '') {
      data = {
        token: auth.user.data,
        vendorInfo: {
          shop_title: shopTitle,
          company_locality: location,
          company_description: description,
          vendor_stripe_id: vendor_stripe_id,
          unique_entity_number: unique_entity_number,
          contact_number: contact_number,
          return_policy: cancellation_policy,
          privacy_policy: privacy_policy,
          vendor_area: vendor_area,
          vendor_free_cancellation_hour: vendor_free_cancellation_hour,
          vendor_zipcode: vendor_zipcode,
          vendor_primary_type: primary_type,
          vendor_secondary_type: secondary_type,
        },
      };
    } else {
      data = {
        token: auth.user.data,
        vendorInfo: {
          shop_title: shopTitle,
          company_locality: location,
          company_description: description,
          vendor_stripe_id: vendor_stripe_id,
          unique_entity_number: unique_entity_number,
          contact_number: contact_number,
          return_policy: cancellation_policy,
          privacy_policy: privacy_policy,
          vendor_area: vendor_area,
          vendor_free_cancellation_hour: vendor_free_cancellation_hour,
          vendor_zipcode: vendor_zipcode,
          vendor_primary_type: primary_type,
          vendor_secondary_type: secondary_type,
          image_name: image_name,
          image_base64_content: image_base64_content,
        },
      };
    }
    console.log('updateVendorProfile', data);
    this.setState({loading: true});
    myAppointmentsSvc
      .updateProfileData(data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          this.setState({loading: false});
          Utils.shortNotifyMessage(Strings.update_profile_success);
          navigation.goBack();
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        Utils.shortNotifyMessage(Strings.update_profile_fail);
      });
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let filepath = {uri: response.uri};
        // You can also display the image using data:
        let source = {uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          image_name: response.fileName,
          avatarSource: source,
          image_base64_content: response.data,
        });
      }
    });
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      myAppointmentsSvc
        .fetchProfileData(token)
        .then((response) => {
          const res_profile = response.data.data;
          console.log('AboutUS', res_profile);
          if (response.data.data !== undefined) {
            this.setState({
              shopTitle: res_profile.shop_title,
              vendor_stripe_id: res_profile.vendor_stripe_id,
              unique_entity_number: res_profile.unique_entity_number,
              contact_number: res_profile.contact_number,
              location: res_profile.company_locality,
              description: res_profile.company_description,
              primary_type: res_profile.vendor_primary_type,
              secondary_type: res_profile.vendor_secondary_type,
              logo_pic: res_profile.logo_pic,
              vendor_zipcode: res_profile.vendor_zipcode,
              vendor_area: res_profile.vendor_area,
              privacy_policy: res_profile.privacy_policy,
              vendor_free_cancellation_hour:
                res_profile.vendor_free_cancellation_hour !== null
                  ? res_profile.vendor_free_cancellation_hour.toString()
                  : '0',
              // dataLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({dataLoading: false});
          console.log('Some mistakes occured during communication.');
          console.log(error);
        });
      myAppointmentsSvc
        .getNeighbourhoodList()
        .then((response) => {
          const res_profile = response.data;
          console.log('neighbourhoodlist', res_profile.data);
          if (res_profile.code == 0) {
            this.setState({
              neighbourhoodLst: res_profile.data,
              neighbourhoodDropdownLst: res_profile.data.map((item, index) => {
                return {
                  value: item.area,
                };
              }),
            });
          }
        })
        .catch((error) => {
          this.setState({dataLoading: false});
          console.log('appointment error');
          console.log(error);
        });
    });

    myAppointmentsSvc
      .getHomeCategory()
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          this.setState({
            serviceTypes: res_profile.data,
            productTypes: res_profile.data.map((element) => {
              return {value: element.name};
            }),
            dataLoading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({dataLoading: false});
        Utils.shortNotifyMessage(error);
        console.log('appointment error');
        console.log(error);
      });
  }

  getNameByType(type) {
    var count = Object.keys(this.state.serviceTypes).length;
    let name = '';
    for (var i = 0; i < count; i++) {
      name = this.state.serviceTypes[i].name;
      if (type == this.state.serviceTypes[i].id) {
        name = this.state.serviceTypes[i].name;
        return name;
      }
    }
  }

  getKeyByValue(value) {
    var count = Object.keys(this.state.serviceTypes).length;
    let key = '';
    for (var i = 0; i < count; i++) {
      if (value == this.state.serviceTypes[i].name) {
        key = this.state.serviceTypes[i].id;
        return key;
      }
    }
  }

  displayContentView() {
    const {navigation} = this.props;
    const {
      loading,
      vendor_stripe_id,
      unique_entity_number,
      contact_number,
      shopTitle,
      location,
      description,
      photos,
      serviceTypes,
      privacy_policy,
      vendor_free_cancellation_hour,
      vendor_area,
      vendor_zipcode,
      productTypes,
      logo_pic,
    } = this.state;
    console.log(this.getNameByType(this.state.primary_type));
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Business Detail"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.sectionColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView>
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <Text style={BaseStyle.label}>Featured Image</Text>
              <TouchableOpacity
                style={{alignItems: 'center', paddingVertical: 5}}
                onPress={this.selectPhotoTapped.bind(this)}>
                {this.state.avatarSource === null ? (
                  <FastImage
                    source={{uri: logo_pic}}
                    style={styles.blockImage}
                  />
                ) : (
                  <Image
                    source={this.state.avatarSource}
                    style={styles.blockImage}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Business Name</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({shopTitle: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {shopTitle}
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Business Tel</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({contact_number: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {contact_number}
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Business Address</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({location: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {location}
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Unique Entity Number</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({unique_entity_number: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {unique_entity_number}
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Free Cancellation Hour</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({vendor_free_cancellation_hour: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}
                  value={vendor_free_cancellation_hour}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Description</Text>
                <TextInput
                  style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
                  onChangeText={(text) => this.setState({description: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.SecondColor}
                  selectionColor={BaseColor.primaryColor}
                  multiline={true}>
                  {description}
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Country</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({id: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}
                  editable={false}>
                  Singapore
                </TextInput>
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Terms and Conditions</Text>
                <TextInput
                  style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
                  onChangeText={(text) => this.setState({privacy_policy: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}
                  value={privacy_policy}
                  multiline={true}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Postal Code</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => this.setState({vendor_zipcode: text})}
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {vendor_zipcode}
                </TextInput>
              </View>
              <Dropdown
                label="Primary Type"
                labelFontSize={15}
                fontSize={13}
                labelTextStyle={{marginBottom: 10}}
                style={{fontFamily: FontFamily.default}}
                data={productTypes}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                onChangeText={(value) => {
                  this.setState({
                    primary_type: this.getKeyByValue(value),
                  });
                }}
                value={this.getNameByType(this.state.primary_type)}
              />

              <Dropdown
                label="Seconday Type"
                labelFontSize={15}
                fontSize={13}
                labelTextStyle={{marginBottom: 10}}
                style={{fontFamily: FontFamily.default}}
                data={productTypes}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                onChangeText={(value) => {
                  this.setState({
                    secondary_type: this.getKeyByValue(value),
                  });
                }}
                value={this.getNameByType(this.state.secondary_type)}
              />
              <Dropdown
                label="Select your neighbourhood"
                labelFontSize={15}
                fontSize={13}
                labelTextStyle={{marginBottom: 10}}
                style={{fontFamily: FontFamily.default}}
                data={this.state.neighbourhoodDropdownLst}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                value={this.getNeighbourhoodName(vendor_area)}
                onChangeText={(value) => {
                  this.setState({
                    vendor_area: this.getNeighbourhoodKey(value),
                  });
                }}
              />
            </View>
          </ScrollView>
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.dataLoading}
            />
          </View>
          <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              onPress={() => navigation.goBack()}>
              Cancel
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={loading}
              onPress={() => this.onSave()}>
              Save
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Business Detail"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.sectionColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  getNeighbourhoodName(key) {
    let name = '';
    console.log('key', key);
    this.state.neighbourhoodLst.forEach((element) => {
      if (element.directory_id == key) {
        name = element.area;
        console.log('name', name);
      }
    });
    return name;
  }

  getNeighbourhoodKey(value) {
    let key = 1;
    this.state.neighbourhoodLst.forEach((element) => {
      if (element.area == value) {
        key = element.directory_id;
        console.log('key', key);
      }
    });
    return key;
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  renderItem = ({item, index, move, moveEnd, isActive}) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 32,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Aboutus);
