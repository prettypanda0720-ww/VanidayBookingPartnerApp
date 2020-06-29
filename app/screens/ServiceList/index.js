import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import Accordion from 'react-native-collapsible/Accordion';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import styles from './styles';

class ServiceList extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      serviceData: [],
      subMenuList: [],
      activeSections: [],
    };
  }

  componentDidMount() {
    console.log('servicelist is called!');
    const {auth, navigation} = this.props;
    const data = {
      token: auth.user.data,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      if (auth.user.data !== undefined) {
        this.setState({loading: true});
        myAppointmentsSvc
          .getSubMenuByMerchant(data)
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
            console.log('submenulist error');
            console.log(error);
          });
        myAppointmentsSvc
          .getServiceList(data)
          .then((response) => {
            const res_profile = response.data;
            console.log('res_profile', res_profile.data);
            if (res_profile.code == 0) {
              this.setState({
                serviceData: res_profile.data,
                loading: false,
                // activeSections: res_profile.data[0],
              });
            }
          })
          .catch((error) => {
            console.log('appointment error');
            console.log(error);
          });
      }
    });
  }

  displayContentView() {
    const {navigation} = this.props;
    const {serviceData, loading} = this.state;
    console.log('serviceData', serviceData);
    if (!this.state.loading) {
      if (serviceData.length > 0) {
        return (
          <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{top: 'always'}}>
            <Header title="Services" style={BaseStyle.headerStyle} />
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <ScrollView>
                <Accordion
                  sections={serviceData}
                  activeSections={this.state.activeSections}
                  underlayColor={BaseColor.fieldColor}
                  renderSectionTitle={this._renderSectionTitle}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                  expandMultiple={true}
                />
              </ScrollView>
            </SafeAreaView>
            <View style={styles.floatingBtn}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateService')}
                style={styles.button}
                activeOpacity={0.8}>
                <Image style={styles.image} source={Images.icons_create} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView
            style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
            forceInset={{top: 'always'}}>
            <Header title="Services" style={BaseStyle.headerStyle} />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                There are no services to show.
              </Text>
              <View style={styles.floatingBtn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateService')}
                  style={styles.button}
                  activeOpacity={0.8}>
                  <Image style={styles.image} source={Images.icons_create} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Services"
            // renderLeft={() => {
            //   return (
            //     <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            //   );
            // }}
            // onPressLeft={() => {
            //   navigation.goBack();
            // }}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.loading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  _renderSectionTitle = (section) => {};

  _renderHeader = (section) => {
    let serviceCnt = '';
    this.state.serviceData.forEach((item) => {
      console.log('asdf' + item.sectionName, section.sectionName);
      if (item.sectionName == section.sectionName) {
        serviceCnt = item.dataList.length;
        return;
      }
    });

    return (
      <Text body1 semibold style={styles.header}>
        {section.sectionName}&nbsp;({serviceCnt})
      </Text>
    );
  };

  _renderContent = (section) => {
    const {navigation} = this.props;
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: BaseColor.dividerColor,
        }}>
        <FlatList
          data={section.dataList}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={item.status == 1 ? styles.enableItem : styles.disableItem}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('EditService', {
                  sku: item.sku,
                  subMenuList: this.state.subMenuList,
                })
              }>
              <View style={{flexDirection: 'column', flex: 8}}>
                <Text
                  subhead
                  numberOfLines={3}
                  style={{color: BaseColor.titleColor}}>
                  {item.product_name}
                </Text>
                <Text
                  caption1
                  style={{
                    marginTop: 5,
                    color: BaseColor.titleColor,
                  }}>
                  {item.service_duration}&nbsp;Min
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1.5,
                }}>
                <Text body2 style={{color: BaseColor.titleColor}}>
                  $&nbsp;{item.product_price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
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
  connect(mapStateToProps, mapDispatchToProps)(ServiceList),
);
