import React, {Component} from 'react';
import {
  View,
  Animated,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  ProfileDetail,
  ProfilePerformance,
  Text,
  Button,
} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import * as Utils from '@utils';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

// Load sample data
import {UserData} from '@data';

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      index: 0,
      routes: [
        {key: 'appointments', title: 'Appointments'},
        {key: 'products', title: 'Products'},
        {key: 'invoices', title: 'Invoices'},
      ],
      userData: UserData[0],
    };
    this.growAnimated = new Animated.Value(0);
  }

  _handleIndexChange = (index) =>
    this.setState({
      index,
    });

  _renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({route, focused, color}) => (
        <View
          style={{
            flex: 1,
            width: Utils.getWidthDevice() / 3,
            alignItems: 'center',
          }}>
          <Text subhead bold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  _renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'appointments':
        return (
          <AppointmentsTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case 'products':
        return (
          <ProductsTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case 'invoices':
        return (
          <InvoicesTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
    }
  };

  render() {
    const {navigation} = this.props;
    const {search, screen, userData} = this.state;
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 40],
    });

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
        forceInset={{top: 'always'}}>
        <Header
          title="Customer"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={'rgba(0,0,0,0.65)'} />
            );
          }}
          renderRight={() => {
            return (
              <SafeAreaView style={{flexDirection: 'row'}}>
                <View style={{marginRight: 15}}>
                  <Icon name="envelope" size={24} color={'rgba(0,0,0,0.65)'} />
                </View>
                <View>
                  <Icon name="bell" size={24} color={'rgba(0,0,0,0.65)'} />
                </View>
              </SafeAreaView>
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('Notification');
          }}
          style={styles.headerStyle}
        />
        <ScrollView style={{paddingLeft: 20, paddingRight: 20, marginTop: 20}}>
          <ProfileDetail
            image={userData.image}
            textFirst={userData.name}
            point={userData.point}
            textSecond={userData.address}
            textThird={userData.id}
            styleThumb={{width: 60, height: 60, borderRadius: 30}}
            onPress={() => navigation.navigate('ProfileExanple')}
          />
          <ProfilePerformance
            data={userData.performance}
            style={{marginTop: 20, marginBottom: 10}}
          />
          <View style={styles.profileItem}>
            <Text subhead style={styles.sectionStyle}>
              Email: river@hotmail.com
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead style={styles.sectionStyle}>
              Handphone: 91234567
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead style={styles.sectionStyle}>
              Gender: Male
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead style={styles.sectionStyle}>
              Subscribed to Marketing: YES
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 15}}>
            <Button
              full
              style={{}}
              onPress={() => {
                navigation.goBack();
              }}>
              Chat with customer
            </Button>
          </View>
          <View style={{flexDirection: 'row', marginTop: 15, marginBotton: 10}}>
            <View
              style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
              <Text
                subhead
                semibold
                numberOfLines={1}
                style={styles.sectionStyle}>
                SGD 0
              </Text>
              <Text
                subhead
                semibold
                numberOfLines={1}
                style={styles.sectionStyle}>
                Total Sales
              </Text>
            </View>
            <View
              style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
              <Text
                subhead
                semibold
                numberOfLines={1}
                style={styles.sectionStyle}>
                SGD 0
              </Text>
              <Text
                subhead
                semibold
                numberOfLines={1}
                style={styles.sectionStyle}>
                Total Sales
              </Text>
            </View>
          </View>
          <TabView
            lazy
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class AppointmentsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      appointments: [
        {
          date: 'Mar 19',
          title: 'Gel Express Mani',
          summary: '1h 30min with Judy',
          starttime: 'Fri 11:00',
          totalprice: 'SGD 0',
        },
        {
          date: 'Mar 19',
          title: 'Gel Express Mani',
          summary: '1h 30min with Judy',
          starttime: 'Fri 11:00',
          totalprice: 'SGD 0',
        },
      ],
    };
  }

  render() {
    return (
      <View style={{padding: 20}}>
        {this.state.appointments.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'column',
                borderColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text caption1 semibold>
                  {item.date}
                </Text>
                <Text caption1 semibold>
                  &nbsp;&nbsp;{item.starttime}
                </Text>
                <Text caption1 bold style={{color: BaseColor.sectionColor}}>
                  &nbsp;&nbsp;STARTED
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 40,
                }}>
                <Text overline semibold>
                  {item.summary}
                </Text>
                <Text overline semibold>
                  {item.totalprice}
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{position: 'absolute', right: 0}}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

class ProductsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
    };
  }

  toggleSwitch = (value) => {
    this.setState({reminders: value});
  };

  render() {
    const {navigation} = this.props;
    return <View style={{padding: 20}} />;
  }
}
class InvoicesTab extends Component {
  render() {
    return <View style={{marginTop: 20}} />;
  }
}

export default ClientProfile;
