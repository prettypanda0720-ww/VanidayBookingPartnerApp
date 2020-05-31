import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {Images, BaseColor} from '@config';
import SplashScreen from 'react-native-splash-screen';
import {Image} from '@components';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
    const {auth, navigation} = this.props;
    const status = auth.login.success;
    switch (status && auth.user !== undefined) {
      case true:
        setTimeout(() => {
          navigation.navigate('Main');
        }, 500);
        break;
      case false:
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 500);
        break;
      default:
        break;
    }
  }

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
          <View style={styles.loadingContainer}>
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
