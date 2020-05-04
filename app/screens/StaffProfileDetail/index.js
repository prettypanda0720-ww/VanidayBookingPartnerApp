import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  RateDetail,
  CommentItem,
  RadioGroup,
  Button,
} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import {UserData, ReviewData} from '@data';
import * as Utils from '@utils';
import styles from './styles';

export default class StaffProfileDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      index: 0,
      routes: [
        {key: 'profile', title: 'Profile'},
        {key: 'setting', title: 'Setting'},
      ],
      userData: UserData[0],
    };
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
        <View style={styles.tabLabel}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  _renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'profile':
        return (
          <ProfileTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case 'setting':
        return (
          <SettingsTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
    }
  };

  render() {
    const {navigation} = this.props;
    const {userData} = this.state;
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    
    const imageTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [-5, 50],
      extrapolate: 'clamp',
    });
    
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Staff Profile"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          scrollEventThrottle={8}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: this.state.scrollY},
              },
            },
          ])}>
          <View style={styles.containField}>
            <View style={styles.contentLeftItem}>
              <Text title2 semibold>
                {userData.performance[2].value}
              </Text>
              <Text caption1 grayColor>
                {userData.performance[2].title}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Animated.Image
                source={Images.profile2}
                style={[
                  styles.profileImageStyle,
                  {
                    transform: [
                      {
                        scale: imageScale,
                      },
                      {
                        translateY: imageTranslateY,
                      },
                    ],
                  },
                ]}
              />
              <Text
                headline
                semibold
                numberOfLines={1}
                style={{marginBottom: 20}}>
                {userData.name}
              </Text>
            </View>
            <View style={styles.contentLeftItem}>
              <Text title2 semibold>
                {userData.performance[1].value}
              </Text>
              <Text caption1 grayColor>
                {userData.performance[1].title}
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

class ProfileTab extends Component {
  constructor(props) {
    super();
    this.state = {
      rateDetail: {
        point: 4.7,
        maxPoint: 5,
        totalRating: 25,
        data: ['80%', '10%', '10%', '0%', '0%'],
      },
      reviewList: ReviewData,
    };
  }

  render() {
    let {rateDetail, reviewList} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <View style={{paddingLeft: 20}}>
          <View style={styles.profileItem}>
            <Text subhead>FullName: Steve Garrett</Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead>Email: river@hotmail.com</Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead>Handphone: 91234567</Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead>Gender: Male</Text>
          </View>
          <View style={styles.profileItem}>
            <Text subhead>Subscribed to Marketing: YES</Text>
          </View>
        </View>
        <FlatList
          style={{padding: 20}}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={reviewList}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={() => (
            <RateDetail
              point={rateDetail.point}
              maxPoint={rateDetail.maxPoint}
              totalRating={rateDetail.totalRating}
              data={rateDetail.data}
            />
          )}
          renderItem={({item}) => (
            <CommentItem
              style={{marginTop: 10}}
              image={item.source}
              name={item.name}
              rate={item.rate}
              date={item.date}
              title={item.title}
              comment={item.comment}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

class SettingsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <View style={{padding: 20}}>
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
          <RadioGroup />
          <View style={{marginTop: 20}}>
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
        </View>
      </SafeAreaView>
    );
  }
}
