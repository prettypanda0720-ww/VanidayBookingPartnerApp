import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      id: '',
      password: '',
      success: {
        id: true,
        password: true,
      },
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
        loading: true,
      });
      this.authentication();
    }
  };

  authentication() {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate("Loading");
          } else {
            this.setState({
              loading: false
            });
          }
        });
      }
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <View
          style={styles.contain}
        >
          <View style={{ width: "100%", alignItems: 'center' }}>
            <Image
              source={Images.splashlogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text subhead grayColor style={{marginTop: 10, color: BaseColor.secondBlackColor}}>
              Partner Management
            </Text>
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 30}]}
              onChangeText={text => this.setState({id: text})}
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
              onChangeText={text => this.setState({password: text})}
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
              style={{ marginTop: 20, backgroundColor: BaseColor.secondBlackColor }}
              loading={this.state.loading}
              onPress={() => {
                this.onLogin();
              }}>
              Sign In
            </Button>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text body1 style={{color: BaseColor.secondBlackColor}}>
                  Be a Partner
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                <Text body1 style={{color: BaseColor.secondBlackColor}}>
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
