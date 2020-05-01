import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  DatePicker,
} from '@components';
import {appointments} from '@data';
import styles from './styles';
import * as Utils from '@utils';
import {Dropdown} from 'react-native-material-dropdown';

export default class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      drawerOpen: null,
      modalVisible: false,
      appointments: appointments,
    };
  }

  showModal() {
    console.log('modal is clicked');
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <Drawer
        open={this.state.drawerOpen}
        content={this.renderSideMenuContent()}
        type="overlay"
        tapToClose={true}
        styles={styles.drawerStyles}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        onClose={() => {
          this.setState({drawerOpen: false});
        }}
        panOpenMask={0.8}
        captureGestures="open"
        acceptPan={false}
        drawerPosition="right">
        {this.renderMainContent()}
      </Drawer>
    );
  }

  renderSideMenuContent = () => {
    let channels = [
      {value: 'All channels'},
      {value: 'All online channels'},
      {value: 'Fresha'},
      {value: 'Book now link'},
      {value: 'Facebook'},
      {value: 'Instagram'},
      {value: 'Marketing'},
      {value: 'offline'},
    ];
    let location = [{value: 'All locations'}, {value: 'Singapore'}];
    let staffs = [
      {value: 'All staffs'},
      {value: 'asdf asdf'},
      {value: 'Wendy Smith'},
    ];

    const {loading} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.sideMenuStyle}>
        <View style={styles.filterContain}>
          <Text headline>Filters</Text>
        </View>
        <View style={styles.filterContent}>
          <Dropdown
            label="location"
            data={location}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
          />
          <Dropdown
            label="Staff"
            data={staffs}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
          />
          <Dropdown
            label="Channel"
            data={channels}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
          />
        </View>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: '#FFF',
            }}
            styleText={{color: '#000'}}
            outline={{borderColor: BaseColor.fieldColor}}
            loading={loading}
            onPress={() => this.setState({drawerOpen: false})}>
            CLEAR
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => this.setState({drawerOpen: false})}>
            APPLY
          </Button>
        </View>
      </View>
    );
  };

  renderMainContent = () => {
    const {appointments} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
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
            <Text headline>Appointments</Text>
            <TouchableOpacity
              style={styles.dateRange}
              onPress={() => this.goBybtn('SelectPeriod')}>
              <Text footnote>Month to Date</Text>
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
              <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => item.id}
            style={{marginTop: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                // testID={testIDs.agenda.ITEM}}
                style={styles.serviceItemWrapper}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                    {item.refId}
                  </Text>
                  <Text style={styles.serviceItemNameStyle}>
                    Client Name: {item.clientName}
                  </Text>
                  <Text style={styles.serviceItemNameStyle}>
                    Service Name: {item.serviceName}
                  </Text>
                  <Text style={styles.serviceItemNameStyle}>
                    Staff Name: {item.staffName}
                  </Text>
                  <Text style={styles.serviceItemDateStyle}>
                    {item.appointmentDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
                    {item.price}
                  </Text>
                  <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
                    {item.startTime}
                  </Text>
                  <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
                    {item.endTime}
                  </Text>
                  <Text style={{fontSize: 18, color: 'green', fontWeight: 'bold'}}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  goBybtn(route) {
    const {navigation} = this.props;
    if (route == 'goback') {
      navigation.goBack();
    } else {
      navigation.navigate(route);
    }
  }
}
