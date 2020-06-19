import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {
  SafeAreaView,
  Icon,
  Text,
  Header,
  VanidayServiceItem,
} from '@components';
import styles from './styles';

// Load sample data
import {VanidayServiceData} from '@data';

export default class VanidayServices extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      vanidayServices: VanidayServiceData,
    };
  }

  render() {
    const {navigation} = this.props;
    const {vanidayServices, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Header
            title="Vaniday Services"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Financing');
              }}>
              <View style={styles.wrapper}>
                <Image source={Images.financing} style={styles.thumb} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Marketing');
              }}>
              <View style={styles.wrapper}>
                <Image source={Images.marketing} style={styles.thumb} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('');
              }}>
              <View style={styles.wrapper}>
                <Image source={Images.it} style={styles.thumb} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('');
              }}>
              <View style={styles.wrapper}>
                <Image source={Images.design} style={styles.thumb} />
              </View>
            </TouchableOpacity>
            {/* </View> */}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
