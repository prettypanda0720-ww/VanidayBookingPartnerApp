import React, {Component} from 'react';
import {FlatList, View, Animated, Image, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  SignupTextInput,
  Button,
  ProfileDescription,
  PhoneInput,
  DatePicker,
} from '@components';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from "./styles";

class CreateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      refreshing: false,
    }
  }

  _onFocus(){
    this.setState({
        color: 'red',
    })
  }

  render() {
    const {navigation} = this.props;
    const { search, screen } = this.state;
    
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <View style={{flex: 3.2, flexDirection:'column', padding:20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.finishBtn}
          >
            <Icon name="times" size={18} color={BaseColor.grayColor} />
          </TouchableOpacity>          
          <Text title2 bold>New Client</Text>
          <SignupTextInput
            title = {'First name'}
          />
          <SignupTextInput
            title = {'Last name'}
          />
          <SignupTextInput
            title = {'Email'}
          />
        </View>
        <PhoneInput />
        <View style={{flex:7, flexDirection:'column'}}>
          <DatePicker />  
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <SignupTextInput
              title = {'Address'}
            />
          </View>
        </View>
        <View style={{flex: 0.6, justifyContent: 'flex-end', alignItems: 'flex-end',padding: 20}}>
            <View style={{width: '30%'}}>
              <Button
                full
                style={{}}
                onPress={() => {
                  navigation.goBack();
                }}>
                Save
              </Button>
            </View>            
          </View>
      </SafeAreaView>
    );
  }

};

export default CreateClient;
