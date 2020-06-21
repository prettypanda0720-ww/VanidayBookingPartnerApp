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
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import {primarytypes} from '@data';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
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
      terms_and_conditions: '',
      free_cancellation_hour: '',
      photos: [],
      currentPhotoCnt: 0,
      carousel: {},
      serviceTypes: [],
      productTypes: [],
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
      terms_and_conditions,
      free_cancellation_hour,
    } = this.state;

    const {auth} = this.props;
    const data = {
      token: auth.user.data,
      vendorData: {
        shop_title: shopTitle,
        company_locality: location,
        company_description: description,
        vendor_stripe_id: vendor_stripe_id,
        unique_entity_number: unique_entity_number,
        contact_number: contact_number,
        return_policy: cancellation_policy,
        privacy_policy: terms_and_conditions,
        vendor_free_cancellation_hour: 4,
        vendor_primary_type: primary_type,
        vendor_secondary_type: secondary_type,
      },
    };
    console.log('typedata', data);
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .updateProfileData(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage(
              'Business Detail is successfully updated!',
            );
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  };

  onPhotoUpdate = () => {
    const {auth} = this.props;
    const token = auth.user.data;
    // console.log('this.state.carousel', this.state.carousel);
    if (Object.keys(this.state.carousel).length > 0) {
      this.setState({upLoading: true});
      myAppointmentsSvc
        .updateCarousel(token, this.state.carousel)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({upLoading: false});
            Utils.shortNotifyMessage('Business photos are successfully added!');
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('update photo error');
          console.log(error);
        });
    }
  };

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
            let tpPhotos = [];
            if (res_profile.vendor_carousel !== null) {
              tpPhotos = res_profile.vendor_carousel.map((photo, index) => {
                return res_profile.venCarPrefix + photo.image_name;
              });
            }
            this.setState({
              shopTitle: res_profile.shop_title,
              vendor_stripe_id: res_profile.vendor_stripe_id,
              unique_entity_number: res_profile.unique_entity_number,
              contact_number: res_profile.contact_number,
              location: res_profile.company_locality,
              description: res_profile.company_description,
              photos: tpPhotos,
              primary_type: res_profile.vendor_primary_type,
              secondary_type: res_profile.vendor_secondary_type,
              currentPhotoCnt:
                res_profile.vendor_carousel !== null
                  ? res_profile.vendor_carousel.length
                  : 0,
            });
          }
        })
        .catch((error) => {
          this.setState({dataLoading: false});
          console.log('Some mistakes occured during communication.');
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
        console.log(value, key);
        return key;
      }
    }
  }

  takePics = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      multiple: true,
    }).then((response) => {
      let tempArray = [];
      this.setState({ImageSource: response});
      response.forEach((item, index) => {
        let filename = item.path.substring(item.path.lastIndexOf('/') + 1);
        let filepath = item.path;
        let data = item.data;
        this.state.photos.push(filepath);
        tempArray.push({
          position: this.state.currentPhotoCnt + index,
          image_name: filename,
          image_base64_content: data,
        });
      });
      let uploadPhotoData = {carousel: tempArray};
      this.setState({carousel: uploadPhotoData});
      // console.log('uploadPhotoData', this.state.carousel);
    });
  };

  displayPhotoActionView() {
    if (Object.keys(this.state.carousel).length !== 0) {
      return (
        <Button
          style={{flex: 1}}
          loading={this.state.upLoading}
          onPress={() => this.onPhotoUpdate()}>
          Upload Business Photo
        </Button>
      );
    } else {
      return (
        <Button
          style={{flex: 1}}
          // loading={loading}
          onPress={() => this.takePics()}>
          Select Business Photo
        </Button>
      );
    }
  }

  displayContentView() {
    // console.log('this.state.photos', this.state.photos);
    // console.log('carousel', this.state.carousel);
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
      productTypes,
    } = this.state;
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text headline>Featured Image</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('EditAboutusAlbum')}>
                  <Icon
                    name="edit"
                    size={20}
                    color={
                      this.state.deleteFlag
                        ? BaseColor.SecondColor
                        : BaseColor.titleColor
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() =>
                    navigation.navigate('DeleteAboutusAlbum', {
                      photos: this.state.photos,
                    })
                  }>
                  <Icon
                    name="trash"
                    size={20}
                    color={
                      this.state.deleteFlag
                        ? BaseColor.SecondColor
                        : BaseColor.titleColor
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapper}>{this.displayPhotoView()}</View>
            <View style={styles.changeButton}>
              {this.displayPhotoActionView()}
            </View>
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
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
                    this.setState({free_cancellation_hour: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  4
                </TextInput>
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
                <Text style={BaseStyle.label}>
                  Cancellation and Rescheduling Policy
                </Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({cancellation_policy: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}
                  value={this.state.cancellation_policy}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Term & Condition</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({terms_and_conditions: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}
                  value={this.state.terms_and_conditions}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={BaseStyle.label}>Connected Stripe ID</Text>
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) =>
                    this.setState({vendor_stripe_id: text})
                  }
                  autoCorrect={false}
                  placeholder=""
                  placeholderTextColor={BaseColor.titleColor}
                  selectionColor={BaseColor.titleColor}>
                  {vendor_stripe_id}
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
              loading={loading}
              onPress={() => navigation.goBack()}>
              CANCEL
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

  displayPhotoView() {
    if (this.state.currentPhotoCnt == 0) {
      return <View style={styles.blockImage} />;
    } else {
      return (
        <Swiper
          dotStyle={{
            backgroundColor: BaseColor.textSecondaryColor,
          }}
          activeDotColor={BaseColor.primaryColor}
          paginationStyle={styles.contentPage}
          removeClippedSubviews={false}>
          {this.state.photos.map((item, index) => {
            return (
              <View style={styles.slide} key={index}>
                <Image
                  key={index}
                  source={{uri: item}}
                  style={styles.blockImage}
                />
              </View>
            );
          })}
        </Swiper>
      );
    }
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
