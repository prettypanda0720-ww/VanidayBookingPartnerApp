import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {View, ScrollView, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import {primarytypes} from '@data';
import {Dropdown} from 'react-native-material-dropdown';
import * as Utils from '@utils';
import Swiper from 'react-native-swiper';
import styles from './styles';

class Aboutus extends Component {
  constructor(props) {
    super();
    this.state = {
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
      serviceTypes: primarytypes,
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
    const {navigation, actions} = this.props;

    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      vendorData: {
        shop_title: shopTitle,
        company_locality: location,
        company_description: description,
        vendor_stripe_id: vendor_stripe_id,
        unique_entity_number: unique_entity_number,
        contact_number: contact_number,
        primary_type: primary_type,
        secondary_type: secondary_type,
        cancellation_policy: cancellation_policy,
        terms_and_conditions: terms_and_conditions,
        free_cancellation_hour: free_cancellation_hour,
      },
    };

    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .updateProfileData(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.notifyMessage('Business Detail is successfully updated!');
          }
        })
        .catch((error) => {
          Utils.notifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.setState({
      shopTitle: this.props.navigation.state.params.title,
      vendor_stripe_id: this.props.navigation.state.params.vendor_stripe_id,
      unique_entity_number: this.props.navigation.state.params
        .unique_entity_number,
      contact_number: this.props.navigation.state.params.contact_number,
      location: this.props.navigation.state.params.location,
      description: this.props.navigation.state.params.description,
      photos: this.props.navigation.state.params.photos,
    });
  }

  render() {
    const {navigation} = this.props;
    const {loading, serviceTypes} = this.state;
    const vendor_stripe_id = this.props.navigation.state.params
      .vendor_stripe_id;
    const unique_entity_number = this.props.navigation.state.params
      .unique_entity_number;
    const contact_number = this.props.navigation.state.params.contact_number;
    const title = this.props.navigation.state.params.title;
    const location = this.props.navigation.state.params.location;
    const description = this.props.navigation.state.params.description;
    const photos = this.props.navigation.state.params.photos;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
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
          style={styles.headerStyle}
        />
        <ScrollView>
          <Text headline style={styles.headerTitle}>
            Featured Image
          </Text>
          <View style={styles.wrapper}>
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor,
              }}
              activeDotColor={BaseColor.primaryColor}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}>
              {photos.map((item, index) => {
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
          </View>
          <View style={styles.changeButton}>
            <Button
              style={{flex: 1}}
              loading={loading}
              onPress={() => navigation.goBack()}>
              Upload Business Photo
            </Button>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Connected Stripe ID
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({vendor_stripe_id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {vendor_stripe_id}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Shop Title
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({shopTitle: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {title}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Dropdown
                label="Primary Type"
                data={serviceTypes}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                style={{color: BaseColor.blackColor}}
                onChangeText={(value) => {
                  this.setState({
                    primary_type: value,
                  });
                }}
              />
            </View>
            <View style={styles.inputGroup}>
              <Dropdown
                label="Seconday Type"
                data={serviceTypes}
                rippleOpacity={0.7}
                baseColor={BaseColor.secondBlackColor}
                tintColor={BaseColor.blackColor}
                style={{color: BaseColor.blackColor}}
                onChangeText={(value) => {
                  this.setState({
                    secondary_type: value,
                  });
                }}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Free Cancellation Hour
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
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
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Contact Number
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({contact_number: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {contact_number}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Unique Entity Number
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
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
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Location
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({location: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {location}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                Description
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.multilineTextInput]}
                onChangeText={(text) => this.setState({description: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
                multiline={true}>
                {description}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Country
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
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
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Cancellation and Rescheduling Policy
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) =>
                  this.setState({cancellation_policy: text})
                }
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}></TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Term & Condition
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) =>
                  this.setState({terms_and_conditions: text})
                }
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}></TextInput>
            </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Aboutus);
