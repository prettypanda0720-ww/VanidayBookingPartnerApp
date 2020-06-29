import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {Images, BaseColor, BaseStyle} from '@config';
import SplashScreen from 'react-native-splash-screen';
import {Image} from '@components';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    // this.props.actions.resetStore();

    const {navigation, actions} = this.props;
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    console.log('email:' + email, 'password' + password);
    const credential = {email: email, password: password};

    if (email !== null && password !== null) {
      actions.login(credential, (response) => {
        console.log('------- login response', response);
        if (response.data.code == 0) {
          console.log('success');

          navigation.navigate('Home');
        } else {
          navigation.navigate('SignIn');
        }
      });
    } else {
      navigation.navigate('SignIn');
    }

    // SplashScreen.hide();
    // const {auth, navigation} = this.props;
    // const status = auth.login.success;
    // switch (status && auth.user.data !== undefined) {
    //   case true:
    //     setTimeout(() => {
    //       navigation.navigate('Home');
    //     }, 500);
    //     break;
    //   case false:
    //     setTimeout(() => {
    //       navigation.navigate('SignIn');
    //     }, 500);
    //     break;
    //   default:
    //     break;
    // }
  };

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          <Image
            source={Images.splashlogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={[BaseStyle.loadingContainer, {top: 250}]}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
            />
          </View>
        </View>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
// export default Loading;
