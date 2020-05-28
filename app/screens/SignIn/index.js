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
// import firebaseSvc from '@services/FirebaseSvc';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      token: '',
      loginLoading: false,
      success: {
        id: true,
        password: true,
      },
      fireBaseLogin: false,
    };
  }

  onLogin() {
    const {id, password, success} = this.state;

    if (id == '' || password == '') {
      this.setState({
        success: {
          ...success,
          id: false,
          password: false,
        },
      });
    } else {
      const user = {
        email: this.state.id,
        password: this.state.password,
      };
      this.setState({
        loginLoading: true,
      });
      this.props.actions.authentication(user.email, user.password);
    }
  }

  storeAuthInfo = async () => {
    const {id, password} = this.state;

    if (id != null && password != null) {
      await AsyncStorage.setItem('username', id);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('token', password);
    }
  };

  loginFireBaseSuccess = () => {
    const {navigation} = this.props;
    this.props.actions.authentication(true, (response) => {
      if (response.success) {
        navigation.navigate('Loading');
      } else {
        this.setState({
          loginLoading: false,
        });
      }
    });
  };

  loginFireBaseFailed() {
    Alert.alert('failed');
  }

  render() {
    const {
      navigation,
      loginLoading,
      token,
      loginSuccess,
      code,
      message,
    } = this.props;
    console.log('-----after communication----');
    console.log(token);
    console.log(loginSuccess);
    console.log(loginLoading);
    if (code == 0 && token != '') {
      navigation.navigate('Loading');
      this.storeAuthInfo();
    } else if (code == -1 && token != '') {
      this.props.actions.resetStore();
    }

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
              onChangeText={(text) => this.setState({id: text})}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    id: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.secondBlackColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={(text) => this.setState({password: text})}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    password: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.secondBlackColor
                  : BaseColor.primaryColor
              }
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            />
            <Button
              full
              style={{
                marginTop: 20,
                backgroundColor: BaseColor.secondBlackColor,
              }}
              loading={this.state.loginLoading}
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
    loginLoading: state.auth.loginLoading,
    loginSuccess: state.auth.loginSuccess,
    code: state.auth.code,
    token: state.auth.data,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
