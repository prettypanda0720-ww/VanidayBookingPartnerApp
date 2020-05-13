import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Switch} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

export default class Staffs extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Staffs"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.contain}>
            <View style={{width: '100%'}}>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('StaffMembers');
                }}>
                <Text body1 style={{color: BaseColor.sectionColor}}>Staff Members</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('OpeningHours');
                }}>
                <Text body1 style={{color: BaseColor.sectionColor}}>Opening Hours</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.sectionColor}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('ClosedDates');
                }}>
                <Text body1 style={{color: BaseColor.sectionColor}}>Closed Dates</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.sectionColor}
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
