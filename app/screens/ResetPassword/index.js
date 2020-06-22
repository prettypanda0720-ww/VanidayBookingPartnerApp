import React, {Component} from 'react';
import {View, ScrollView, TextInput, Alert} from 'react-native';
import {BaseStyle, BaseColor, Images, Strings} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import {myAppointmentsSvc} from '@services';
import * as Utils from '@utils';
import styles from './styles';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      success: {
        email: true,
      },
    };
  }

  onReset() {
    const {navigation} = this.props;
    if (this.state.email == '') {
      this.setState({
        success: {
          ...this.state.success,
          email: false,
        },
      });
      console.log(this.state.success);
    } else {
      let data = {
        email: this.state.email,
      };
      this.setState({loading: true});
      myAppointmentsSvc
        .forgotPassword(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('ResetPassword', res_profile);
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage(res_profile.message);
            this.setState({
              loading: false,
            });
          } else {
            Utils.shortNotifyMessage(res_profile.message);
            this.setState({
              loading: false,
            });
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(Strings.reset_password);
          this.setState({
            loading: false,
          });
        });
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Reset Password"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.navigate('SignIn');
          }}
          style={BaseStyle.headerStyle}
        />
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              padding: 20,
              width: '100%',
            }}>
            <Image
              source={Images.splashlogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 40}]}
              onChangeText={(text) => this.setState({email: text})}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    email: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Email Address"
              placeholderTextColor={
                this.state.success.email
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.email}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={{width: '100%'}}>
              <Button
                full
                style={{
                  marginTop: 20,
                  backgroundColor: BaseColor.secondBlackColor,
                }}
                onPress={() => {
                  this.onReset();
                }}
                loading={this.state.loading}>
                Reset Password
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
