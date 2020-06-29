import React, {Component} from 'react';
import {View, ScrollView, TextInput, Alert} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import * as Utils from '@utils';
import styles from './styles';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
    };
  }

  checkInput() {
    const {currentPassword, newPassword, confirmPassword} = this.state;

    if (currentPassword.length === 0) {
      Utils.shortNotifyMessage('First Name is required!');
      return false;
    }
    if (newPassword.length === 0) {
      Utils.shortNotifyMessage('Last Name is required!');
      return false;
    }
    if (
      newPassword.length != 0 &&
      currentPassword.length != 0 &&
      confirmPassword != newPassword
    ) {
      Utils.shortNotifyMessage('Confirm password is wrong!');
      return false;
    }
    return true;
  }

  passwordUpdate() {
    if (!this.checkInput()) {
      return;
    }
    this.setState({loading: true});
    const {currentPassword, newPassword} = this.state;
    const {auth, actions} = this.props;
    let data;

    data = {
      token: auth.user.data,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    console.log('passwordUpdate');
    console.log(data);
    myAppointmentsSvc
      .changePassword(data)
      .then((response) => {
        const res_profile = response.data;
        console.log('changepassword', res_profile);
        if (res_profile.code == 0) {
          actions.clearPassword();
          Alert.alert('Password is successfully changed!');
          this.setState({
            loading: false,
          });
        } else {
          Alert.alert(res_profile.message);
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        // Utils.longNotifyMessage(error);
        console.log('changePassword error!', error);
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Change Password"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.secondBlackColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={BaseStyle.headerStyle}
        />
        <ScrollView>
          <View style={styles.contain}>
            <Image
              source={Images.splashlogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Current Password
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({currentPassword: text})}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Current Password"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.currentPassword}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                New Password
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({newPassword: text})}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="New Password"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.newPassword}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Reenter new Password
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Confirm New Password"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.confirmPassword}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            style={{backgroundColor: BaseColor.secondBlackColor}}
            loading={this.state.loading}
            full
            onPress={() => {
              this.passwordUpdate();
            }}>
            Confirm
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
