import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HomeActions} from '@actions';
import {ActivityIndicator, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {Images, BaseColor} from '@config';
import SplashScreen from 'react-native-splash-screen';
import {Image, Text} from '@components';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import styles from './styles';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  onProcess() {
    SplashScreen.hide();
    let {navigation, auth} = this.props;
    let status = auth.loginSuccess;
    switch (status) {
      case true:
        setTimeout(() => {
          navigation.navigate('Main');
        }, 500);
        break;
      case false:
        setTimeout(() => {
          navigation.navigate('Walkthrough');
        }, 500);
        break;
      default:
        break;
    }
  }

  async componentDidMount() {
    // let token = await AsyncStorage.getItem('token');
    console.log('Loading screen is mounted!');
    const token = this.props.navigation.state.params.token;
    let currentDate = this.getCurrentDate();
    await this.props.actions.fetchOrderByDate(token, -1, currentDate);
  }

  render() {
    const {loadingmyVanidayHome, myVanidayHomeData, navigation} = this.props;
    if (!loadingmyVanidayHome && myVanidayHomeData != undefined) {
      navigation.navigate('Main', {orders: myVanidayHomeData});
    }

    return (
      <View style={styles.container}>
        <Image
          source={Images.splashlogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: 220,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color={BaseColor.whiteColor}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    );
  }

  getCurrentDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      parseInt(today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log('date format');
    console.log(date);
    return date;
  }
}

Loading.defaultProps = {
  loadingmyVanidayHome: false,
  myVanidayHomeData: [],
};

Loading.propTypes = {
  loadingmyVanidayHome: PropTypes.bool,
  myVanidayHomeData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    loadingmyVanidayHome: state.home.loadingVanidayHome,
    myVanidayHomeData: state.home.vanidayHomeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(HomeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
// export default Loading;
