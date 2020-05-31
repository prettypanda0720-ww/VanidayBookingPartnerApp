import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {ActivityIndicator, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {Images, BaseColor} from '@config';
import {Image, Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.actions.resetStore();

    let username = await AsyncStorage.getItem('username');
    let password = await AsyncStorage.getItem('password');

    if (username != null && password != null) {
      this.props.actions.authentication(username, password);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('SignIn');
      }, 200);
    }
  };

  render() {
    const {navigation, loginLoading, token, loginSuccess} = this.props;
    if (loginSuccess && token != '') {
      // navigation.navigate('Loading', {token: this.props.token});
      navigation.navigate('Main');
    }

    return (
      <View style={styles.container}>
        <Image
          source={Images.splashlogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            position: 'absolute',
            top: 150,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color={BaseColor.whiteColor}
            style={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    );
  }
}

SplashScreen.defaultProps = {
  loginLoading: true,
};

SplashScreen.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    loginLoading: state.auth.loginLoading,
    token: state.auth.token,
    loginSuccess: state.auth.loginSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
