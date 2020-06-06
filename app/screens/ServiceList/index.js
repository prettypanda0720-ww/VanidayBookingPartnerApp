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
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import styles from './styles';

class ServiceList extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      serviceData: [],
      subMenuList: [],
    };
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    const data = {
      token: auth.user.token,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      if (auth.user.token !== undefined) {
        myAppointmentsSvc
          .getServiceList(data)
          .then((response) => {
            const res_profile = response.data;
            if (res_profile.code == 0) {
              this.setState({serviceData: res_profile.data, loading: false});
            }
          })
          .catch((error) => {
            console.log('appointment error');
            console.log(error);
          });
      }
    });
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
  }

  render() {
    const {navigation} = this.props;
    const {serviceData, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Services"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <ScrollView>
            {serviceData.map((item, index) => {
              return (
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      marginBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <Text
                      body1
                      semibold
                      style={{color: BaseColor.sectionColor}}>
                      {item.sectionName}
                      {/* &nbsp;({item.totalCount}) */}
                    </Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        name="ellipsis-h"
                        size={15}
                        color={BaseColor.sectionColor}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      borderLeftWidth: 4,
                      borderLeftColor: BaseColor.MainPrimaryColor,
                      borderTopWidth: 1,
                      borderTopColor: BaseColor.dividerColor,
                    }}>
                    <FlatList
                      data={item.dataList}
                      keyExtractor={(item, index) => item.id}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderBottomColor: BaseColor.dividerColor,
                          }}
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
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.loading}
            />
          </View>
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
  connect(mapStateToProps, mapDispatchToProps)(ServiceList),
);
