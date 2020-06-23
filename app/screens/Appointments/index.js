import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  AppointmentItem,
} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {Dropdown} from 'react-native-material-dropdown';

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      drawerOpen: null,
      modalVisible: false,
      appointmentList: [],
    };
  }

  showModal() {
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  componentDidMount() {
    const {navigation, auth} = this.props;
    const data = {
      token: auth.user.data,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .fetchAppointmentList(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('fetchAppointmentList', res_profile.data);
          if (res_profile.code == 0) {
            this.setState({
              dataLoading: false,
              appointmentList: res_profile.data,
            });
          }
        })
        .catch((error) => {
          dataLoading: false,
            Utils.longNotifyMessage('Some errors occured during communication');
        });
    });
  }

  renderItem(item) {
    return (
      <AppointmentItem
        // refId={item.refId}
        clientName={item.customerName}
        // appointmentDate={item.appointmentDate}
        total={item.price}
        // status={item.status}
        detail={item.data}
        count={item.count}
        // startTime={item.startTime}
        // endTime={item.endTime}
        style={{paddingVertical: 10, marginHorizontal: 20}}
        onPress={() => {
          this.props.navigation.navigate('');
        }}
      />
    );
  }

  displayContentView() {
    const {appointmentList} = this.state;
    const {navigation} = this.props;
    if (!this.state.dataLoading) {
      if (appointmentList.length > 0) {
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
                <Text headline2 style={{margin: 0, padding: 0}}>
                  Appointments
                </Text>
                {/* <TouchableOpacity
                  style={styles.dateRange}
                  onPress={() => this.goBybtn('SelectPeriod')}>
                  <Text caption1 style={{color: BaseColor.grayColor}}>
                    Month to Date
                  </Text>
                  <Icon
                    name="angle-down"
                    size={20}
                    color={BaseColor.grayColor}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity> */}
              </View>
              <View style={styles.right}>
                {/* <TouchableOpacity
                  style={styles.contentRightSecond}
                  onPress={() => {
                    this.setState({drawerOpen: true});
                  }}>
                  <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
                </TouchableOpacity> */}
              </View>
            </View>
            <ScrollView>
              <FlatList
                data={appointmentList}
                keyExtractor={(item, index) => item.id}
                style={{marginTop: 20}}
                renderItem={({item}) => this.renderItem(item)}
              />
            </ScrollView>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView
            style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
            forceInset={{top: 'always'}}>
            <Header
              title="Appointments"
              renderLeft={() => {
                return (
                  <Icon
                    name="angle-left"
                    size={20}
                    color={BaseColor.blackColor}
                  />
                );
              }}
              onPressLeft={() => {
                navigation.goBack();
              }}
              style={BaseStyle.headerStyle}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                There are no appointments to show.
              </Text>
            </View>
          </SafeAreaView>
        );
      }
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
              <Text headline2 style={{margin: 0, padding: 0}}>
                Appointments
              </Text>
              {/* <TouchableOpacity
                style={styles.dateRange}
                onPress={() => this.goBybtn('SelectPeriod')}>
                <Text caption1 style={{color: BaseColor.grayColor}}>
                  Month to Date
                </Text>
                <Icon
                  name="angle-down"
                  size={20}
                  color={BaseColor.grayColor}
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.right}>
              {/* <TouchableOpacity
              style={styles.contentRightSecond}
              onPress={() => {
                this.setState({drawerOpen: true});
              }}>
              <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
            </TouchableOpacity> */}
            </View>
          </View>
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
  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  renderMainContent = () => {};

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
  connect(mapStateToProps, mapDispatchToProps)(Appointments),
);
