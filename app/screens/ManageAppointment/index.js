import React, {Component} from 'react';
import {View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {myAppointmentsSvc} from '@services';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  BookingHistory,
  Button,
} from '@components';

import {BaseStyle, BaseColor} from '@config';
import * as Utils from '@utils';
import styles from './styles';

class ManageAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      refreshing: false,
      confirmLoading: false,
      rejectLoading: false,
      orderId: '',
      status: '',
      customerName: '',
      totalPrice: '',
      contactNo: '',
      detail: [],
    };
  }

  onConfirmAppointment() {
    this.setState({confirmLoading: true});
    const {navigation} = this.props;

    const {auth} = this.props;
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .confirmAppointment(auth.user.token, this.state.orderId)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({confirmLoading: false});
            Utils.shortNotifyMessage(res_profile.message);
            navigation.goBack();
          } else if (res_profile.code == 1) {
            this.setState({confirmLoading: false});
            Utils.shortNotifyMessage(res_profile.message);
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  }

  onRejectAppointment() {
    this.setState({rejectLoading: true});
    const {navigation} = this.props;

    const {auth} = this.props;
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .rejectAppointment(auth.user.token, this.state.orderId)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({rejectLoading: false});
            Utils.shortNotifyMessage(res_profile.message);
            navigation.goBack();
          } else if (res_profile.code == 1) {
            this.setState({rejectLoading: false});
            Utils.shortNotifyMessage(res_profile.message);
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    }
  }

  showCancelAlertDlg() {
    Alert.alert(
      'Cancel Appointment',
      'Do you really want to cancel appointment?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.onRejectAppointment(),
        },
      ],
      {cancelable: false},
    );
  }

  componentDidMount() {
    const item = this.props.navigation.state.params.bookingData;
    // this.setState({orderId: item.id});
    const {auth, navigation} = this.props;
    const token = auth.user.token;
    const data = {
      token: token,
      orderId: item.id,
      orderItemId: item.item_id,
    };
    console.log('ManageAppointment', data);
    this.setState({orderId: item.id, orderItemId: item.item_id});
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .getOrderItemInfo(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            console.log('getOrderItemInfo', res_profile.data.status);
            this.setState({
              status: res_profile.data.status,
              customerName: res_profile.data.customerName,
              totalPrice: res_profile.data.totalPrice,
              detail: res_profile.data.orderInfo,
              dataLoading: false,
              contactNo: res_profile.data.contactNo,
            });
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('asdf error');
          console.log(error);
        });
    });
  }

  displayContentView() {
    const {navigation} = this.props;
    // const item = this.props.navigation.state.params.bookingData;
    // console.log('ManageAppointment', item);
    const {loading} = this.state;
    const {
      orderId,
      orderItemId,
      customerName,
      status,
      totalPrice,
      contactNo,
      detail,
    } = this.state;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Manage Appointment"
            renderRight={() => {
              return (
                <Icon name="times" size={15} color={BaseColor.sectionColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <View style={styles.inputGroup}>
                <BookingHistory
                  refId={orderId}
                  clientName={customerName}
                  appointmentDate={detail.bookingDate}
                  // total={detail.price}
                  status={status}
                  detail={detail}
                  // startTime={detail.bookingFrom}
                  // endTime={detail.bookingTo}
                  style={{paddingVertical: 20, marginHorizontal: 20}}
                  onPress={() => {
                    this.props.navigation.navigate('');
                  }}
                />
                <Text
                  headline
                  style={{
                    color: BaseColor.sectionColor,
                    marginTop: 20,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                  }}>
                  Before you reschedule, please chat or contact customer at
                  &nbsp;
                  {contactNo}
                </Text>
              </View>
              <View
                style={[
                  styles.inputGroup,
                  {
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    backgroundColor: '#e5e5e5',
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Button
                      full
                      style={[styles.customBtn, {backgroundColor: '#e5ccc2'}]}
                      styleText={styles.btnTextStyle1}
                      loading={loading}
                      onPress={() =>
                        navigation.navigate('RescheduleAppointment', {
                          orderId: orderId,
                          orderItemId: orderItemId,
                        })
                      }>
                      Reschedule
                    </Button>
                  </View>
                  {/* <View style={{flex: 1, marginLeft: 8}}>
                    <Button
                      full
                      style={[styles.customBtn, {backgroundColor: '#e5ccc2'}]}
                      styleText={styles.btnTextStyle1}
                      loading={loading}
                      onPress={() => navigation.goBack()}>
                      Chat
                    </Button>
                  </View> */}
                </View>
                <Button
                  style={[
                    styles.customBtn,
                    {
                      paddingVertical: 10,
                      marginTop: 15,
                    },
                  ]}
                  styleText={{fontSize: 15}}
                  loading={this.state.confirmLoading}
                  onPress={() => this.onConfirmAppointment()}>
                  Confirm
                </Button>
                <Button
                  style={[
                    styles.customBtn,
                    {
                      backgroundColor: '#bfbfbf',
                      marginTop: 15,
                    },
                  ]}
                  styleText={{fontSize: 15}}
                  loading={this.state.rejectLoading}
                  onPress={() => this.showCancelAlertDlg()}>
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Manage Appointment"
            renderRight={() => {
              return (
                <Icon name="times" size={15} color={BaseColor.sectionColor} />
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
              animating={this.state.dataLoading}
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
  connect(mapStateToProps, mapDispatchToProps)(ManageAppointment),
);
