import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      repassword: "",
      loading: false
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Change Password"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
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
                New Password
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ password: text })}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Confirm Password
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ repassword: text })}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Password Confirm"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.repassword}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            style={{backgroundColor: BaseColor.secondBlackColor}}
            loading={this.state.loading}
            full
            onPress={() => {
              this.setState(
                {
                  loading: true
                },
                () => {
                  setTimeout(() => {
                    navigation.navigate('Walkthrough');
                  }, 500);
                }
              );
            }}
          >
            Confirm
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
