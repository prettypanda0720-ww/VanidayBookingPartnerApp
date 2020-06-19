import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {SafeAreaView, Icon, Text, Button, InvoiceListItem} from '@components';
import {appointments} from '@data';
import styles from './styles';
import {Dropdown} from 'react-native-material-dropdown';

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      drawerOpen: null,
      invoiceData: {},
      appointments: appointments,
    };
  }

  componentDidMount() {
    const {navigation, auth} = this.props;
    const data = {
      token: auth.user.token,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .fetchInvoiceList(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('fetchInvoiceList', res_profile.data);
          if (res_profile.code == 0) {
            this.setState({
              dataLoading: false,
              invoiceData: res_profile.data,
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
    const {invoiceData} = this.state;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <View style={[styles.contain, styles.borderBottom]}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              onPress={() => this.goBybtn('goback')}>
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.blackColor}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
            <View style={styles.contentCenter}>
              <Text headline>Invoices</Text>
              <TouchableOpacity
                style={styles.dateRange}
                onPress={() => this.goBybtn('SelectPeriod')}>
                <Text footnote style={{color: 'rgba(0,0,0,0.65)'}}>
                  Month to Date
                </Text>
                <Icon
                  name="angle-down"
                  size={20}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.contentRightSecond}
                onPress={() => {
                  this.setState({drawerOpen: true});
                }}>
                {/* <Icon name="sliders-h" size={20} color={BaseColor.blackColor} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{paddingVertical: 10}}>
            <FlatList
              data={this.state.invoiceData.invoiceInfo}
              keyExtractor={(item, index) => item.id}
              style={{marginTop: 10}}
              renderItem={({item, index}) => (
                <InvoiceListItem
                  // refId={item.invoiceId}
                  clientName={item.customerName}
                  // appointmentDate={item.slotDate}
                  total={item.price}
                  count={item.count}
                  // status={item.status}
                  detail={item.data}
                  // startTime={item.bookingFrom}
                  // endTime={item.bookingTo}
                  style={{paddingVertical: 10, marginHorizontal: 20}}
                  onPress={() => {}}
                />
              )}
            />
          </ScrollView>
          <View style={styles.total}>
            <View style={styles.alignCenter}>
              <Text body1 bold style={{color: 'rgba(0,0,0,0.65)'}}>
                Total
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[styles.alignCenter, {flex: 1, flexDirection: 'row'}]}>
                <Text body1 bold style={{color: 'rgba(0,0,0,0.65)'}}>
                  Salon:
                </Text>
                <Text body1 semibold style={{color: 'rgba(0,0,0,0.65)'}}>
                  &nbsp;&nbsp;SGD&nbsp;
                  {(parseFloat(this.state.invoiceData.totalPrice) * 9) / 10}
                </Text>
              </View>
              <View
                style={[styles.alignCenter, {flex: 1, flexDirection: 'row'}]}>
                <Text body1 bold style={{color: 'rgba(0,0,0,0.65)'}}>
                  Vaniday:
                </Text>
                <Text body1 semibold style={{color: 'rgba(0,0,0,0.65)'}}>
                  &nbsp;&nbsp;SGD&nbsp;
                  {parseFloat(this.state.invoiceData.totalPrice) / 10}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <View style={[styles.contain, styles.borderBottom]}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              onPress={() => this.goBybtn('goback')}>
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.blackColor}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
            <View style={styles.contentCenter}>
              <Text headline>Invoices</Text>
              <TouchableOpacity
                style={styles.dateRange}
                onPress={() => this.goBybtn('SelectPeriod')}>
                <Text footnote style={{color: 'rgba(0,0,0,0.65)'}}>
                  Month to Date
                </Text>
                <Icon
                  name="angle-down"
                  size={20}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.contentRightSecond}
                onPress={() => {
                  this.setState({drawerOpen: true});
                }}>
                {/* <Icon name="sliders-h" size={20} color={BaseColor.blackColor} /> */}
              </TouchableOpacity>
            </View>
          </View>
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

  goBybtn(route) {
    const {navigation} = this.props;
    if (route == 'goback') {
      navigation.goBack();
    } else {
      navigation.navigate(route);
    }
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
  connect(mapStateToProps, mapDispatchToProps)(Invoices),
);
