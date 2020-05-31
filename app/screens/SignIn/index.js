import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
// import firebaseSvc from '@services/FirebaseSvc';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLogin = () => {
    if (!this.checkInput()) {
      return;
    }

    const {email, password} = this.state;
    const {navigation, actions} = this.props;

    const credential = {
      email: email,
      password: password,
    };
    actions.login(credential, (response) => {
      console.log('------- login response', response);
      if (response.code == 0) {
        // showMessage({
        //   message: response.msg,
        //   type: 'success',
        //   icon: 'auto',
        // });
        console.log('success');
        navigation.navigate('Home');
      } else {
        showMessage({
          message: response.msg,
          type: 'warning',
          icon: 'auto',
        });
      }
    });
  };

  checkInput() {
    const {email, password} = this.state;

    if (email.length === 0) {
      showMessage({
        message: 'Please input email address',
        type: 'warning',
        icon: 'auto',
      });
      return false;
    }
    if (password.length === 0) {
      showMessage({
        message: 'Please input password',
        type: 'warning',
        icon: 'auto',
      });
      return false;
    }
    return true;
  }

  render() {
    const {navigation, auth} = this.props;
    const {email, password} = this.state;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <View style={styles.contain}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              source={Images.splashlogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              subhead
              grayColor
              style={{marginTop: 10, color: BaseColor.secondBlackColor}}>
              Partner Management
            </Text>
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 30}]}
              onChangeText={(text) => this.setState({email: text})}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={BaseColor.grayColor}
              value={email}
              selectionColor={BaseColor.primaryColor}
              autoCapitalize={'none'}
              autoCompleteType={'email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={(text) => this.setState({password: text})}
              autoCorrect={false}
              placeholder="Password"
              placeholderTextColor={BaseColor.grayColor}
              value={password}
              selectionColor={BaseColor.primaryColor}
              autoCapitalize={'none'}
              autoCompleteType={'password'}
              keyboardType={'password-address'}
              textContentType={'passwordAddress'}
              secureTextEntry={true}
            />
            <Button
              full
              style={{
                marginTop: 20,
                backgroundColor: BaseColor.secondBlackColor,
              }}
              loading={auth.login.isLoading}
              disabled={auth.login.isLoading}
              onPress={() => {
                this.onLogin();
              }}>
              Sign In
            </Button>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text subhead style={{color: BaseColor.secondBlackColor}}>
                  Be a Partner
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text subhead style={{color: BaseColor.secondBlackColor}}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
