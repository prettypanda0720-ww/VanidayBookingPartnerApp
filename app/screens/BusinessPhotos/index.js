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
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import * as Utils from '@utils';
import Swiper from 'react-native-swiper';
import styles from './styles';

class BusinessPhotos extends Component {
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

  onPhotoUpdate = () => {
    const {auth} = this.props;
    const token = auth.user.data;
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
    } else {
      Utils.shortNotifyMessage(Strings.non_exist_items_to_update);
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
              photos: tpPhotos,
              currentPhotoCnt:
                res_profile.vendor_carousel !== null
                  ? res_profile.vendor_carousel.length
                  : 0,
              dataLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({dataLoading: false});
          console.log('Some mistakes occured during communication.');
          console.log(error);
        });
    });
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
    const {loading, photos} = this.state;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Business Photos"
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
          </ScrollView>
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
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Business Photos"
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
    console.log(this.state.photos, 'this.state.photos');
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
                <FastImage
                  style={styles.blockImage}
                  source={{
                    uri: item,
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPhotos);
