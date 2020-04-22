import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Switch} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class Staffs extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {shopData, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Staffs"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
                size={20}
                color={BaseColor.blackColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <View style={{width: '100%'}}>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('StaffMembers');
                }}>
                <Text body1>Staff Members</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('OpeningHours');
                }}>
                <Text body1>Opening Hours</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.blackColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

