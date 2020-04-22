import React, {Component} from 'react';
import {FlatList, View, TextInput, Animated, Image, StyleSheet, TouchableOpacity, RefreshControl, ScrollView, Switch} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  SignupTextInput,
  Button,
  ProfileDescription,
  PhoneInput,
  DatePicker,
  VanidayTimePicker
} from '@components';
import { TabView, TabBar } from "react-native-tab-view";
import CheckBox from "react-native-checkbox";
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import * as Utils from "@utils";
import styles from "./styles";

class CreateStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      refreshing: false,
      index: 0,
      routes: [
        { key: "general", title: "General" },
        { key: "services", title: "Services" },
        { key: "workinghours", title: "Working hours" }
      ],
    }
  }

  _onFocus(){
    this.setState({
        color: 'red',
    })
  }

    _handleIndexChange = index =>
    this.setState({
      index
    });

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({ route, focused, color }) => (
        <View
          style={{
            flex: 1,
            width: Utils.getWidthDevice() / 3,
            alignItems: "center"
          }}
        >
          <Text subhead semibold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "services":
        return (
          <ServicesTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case "general":
        return (
          <GeneralTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case "workinghours":
        return (
          <WorkingHoursTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
    }
  };

  render() {
    const {navigation} = this.props;
    const { search, screen } = this.state;
    
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="New Staff"
          renderRight={() => {
            return (
              <Icon
                name="times"
                size={20}
                color={BaseColor.blackColor}
              />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        
        <TabView
            lazy
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
        />
        
      </SafeAreaView>
    );
  }

};

class ServicesTab extends Component {
  constructor(props) {
    super();
    this.state = {
        data: [
            {title: '10 june 7:40PM - (Luxe)', checked: true},
            {title: 'Birthday Brow Wax & Styleing - (SBT)', checked: true},
            {title: 'Clarte & Confort Facial0 - (Facial)', checked: false},
            {title: 'Classic Gel Manicure - (Gek Nails)'},
            {title: 'Classic Haircut - (Eyebrow Shaping)', checked: false},
            {title: 'Classic Pedicure - (Others)', checked: false},
            {title: 'Coba - (Makeup)', checked: false},
            {title: 'Coba - (Makeup)', checked: false},
            {title: 'Gel Express Mani - (Gel Nails)', checked: true},
            {title: 'Hair Colour - (Balayage)', checked: true},
            {title: 'Hair Colouring Test - (Others)', checked: false},
            {title: 'Hair Treatment Test - (Others)', checked: false},
        ],
    };
  }

  render() {
    const {navigation} = this.props;
    return (
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
            <ScrollView>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => item.id}
                    style={{marginTop: 30}}
                    renderItem={({ item }) => (
                        <View style= {{paddingTop: 7, paddingBottom: 7, paddingLeft: 20, paddingRight: 20, flexDirection: 'row'}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex: 8}}>
                                <CheckBox
                                    label={item.title}
                                    checked={item.checked}
                                    onPress={() => this.setState({
                                        checked: !this.state.checked
                                    })}
                                    checked={this.state.checked}
                                    style={{height: 20}}
                                />
                            </View>
                            <View style={{flex: 1}}></View>
                        </View>
                    )}
                />
            </ScrollView>
            <View style={{padding: 20}}>
                <Button
                    loading={this.state.loading}
                    full
                    onPress={() => {
                    this.setState(
                        {
                        loading: true,
                        },
                        () => {
                        setTimeout(() => {
                            navigation.goBack();
                        }, 500);
                        },
                    );
                    }}>
                    Save
                </Button>
            </View>
        </SafeAreaView>
    );
  }
}

class GeneralTab extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false
    };
  }

  toggleSwitch = value => {
    this.setState({ reminders: value });
  };

  render() {
    const { navigation } = this.props;
    return (
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
            <ScrollView style={{ padding: 20 }}>
                <TextInput
                    style={[BaseStyle.textInput, styles.textInput]}
                    onChangeText={(text) => this.setState({id: text})}
                    autoCorrect={false}
                    placeholder="First Name"
                    placeholderTextColor={BaseColor.MainPrimaryColor}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[BaseStyle.textInput, styles.textInput]}
                    onChangeText={(text) => this.setState({id: text})}
                    autoCorrect={false}
                    placeholder="Last Name"
                    placeholderTextColor={BaseColor.MainPrimaryColor}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[BaseStyle.textInput, styles.textInput]}
                    onChangeText={(text) => this.setState({id: text})}
                    autoCorrect={false}
                    placeholder="Email"
                    placeholderTextColor={BaseColor.grayColor}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[BaseStyle.textInput, styles.textInput]}
                    onChangeText={(text) => this.setState({id: text})}
                    autoCorrect={false}
                    placeholder="Address"
                    placeholderTextColor={BaseColor.grayColor}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[BaseStyle.textInput, styles.textInput]}
                    onChangeText={(text) => this.setState({id: text})}
                    autoCorrect={false}
                    placeholder="Mobile Number"
                    placeholderTextColor={BaseColor.grayColor}
                    selectionColor={BaseColor.primaryColor}
                />
            </ScrollView>
            <View style={{padding: 20}}>
                <Button
                    loading={this.state.loading}
                    full
                    onPress={() => {
                    this.setState(
                        {
                        loading: true,
                        },
                        () => {
                        setTimeout(() => {
                            navigation.goBack();
                        }, 500);
                        },
                    );
                  }}>
                    Save
                </Button>
            </View>
        </SafeAreaView>
    );
  }
}

class WorkingHoursTab extends Component {
    
    constructor(props) {
        super();
        this.state = {
            reminders: false,
            data: [
                {title: 'Sunday', checked: true},
                {title: 'Monday',checked: false},
                {title: 'Tuesday',checked: true},
                {title: 'Wensday',checked: false},
                {title: 'Thursday',checked: true},
                {title: 'Friday',checked: false},
                {title: 'Saturday',checked: false},
            ],
        };
    }

    render(){
        const {navigation} = this.props;
        return (
            <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
                <ScrollView
                  style={{paddingTop: 10, marginBottom: 20}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => (
                            <View style= {{paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'column'}}>
                                <CheckBox
                                    label={item.title}
                                    checked={item.checked}
                                    onPress={() => this.setState({
                                        checked: !this.state.checked
                                    })}
                                    checked={this.state.checked}
                                    style={{height: 20}}
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                  <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                                      <Text body1 semibold>Start/Finish</Text>  
                                      <VanidayTimePicker/>
                                  </View>

                                  <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                                      <Text body1 semibold>Lunch Start/Finish</Text>   
                                      <VanidayTimePicker/>
                                  </View>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
                <View style={{padding: 10}}>
                  <Button
                      loading={this.state.loading}
                      full
                      onPress={() => {
                      this.setState(
                          {
                          loading: true,
                          },
                          () => {
                          setTimeout(() => {
                              navigation.goBack();
                          }, 500);
                          },
                      );
                      }}>
                      Save
                  </Button>
                </View>                
            </SafeAreaView>
        );
    }

}

export default CreateStaff;
