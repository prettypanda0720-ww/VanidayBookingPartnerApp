import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Linking} from 'react-native';
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

export default class Help extends Component {
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
            title="Help"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.blackColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <ScrollView style={{marginBottom: 20}}>
            <View style={styles.wrapper}>
              <Image source={Images.contactus} style={styles.thumb} />
            </View>
            <View style={styles.contentWrapper}>
              <Text headline bold style={{color: BaseColor.sectionColor}}>
                CUSTOMERS
              </Text>
              <Text
                subhead
                style={{color: BaseColor.titleColor, marginTop: 10}}>
                We may have already answered your question in our Vaniday FAQ.
                If you have any questions, please visit our Vaniday FAQ or get
                in touch with our customer service team
              </Text>
              <TouchableOpacity
                style={[styles.profileItem, {marginTop: 5}]}
                onPress={() => {
                  Linking.openURL('https://chat.vaniday.com.sg');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  24/7 Live Chat Support
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  Linking.openURL('contact@vaniday.com.sg');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  Email: contact@vaniday.com.sg
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  Linking.openURL('www.facebook.com/vaniday.sg');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  Facebook: www.facebook.com/vaniday.sg
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>

              <Text
                headline
                bold
                style={{marginTop: 20, color: BaseColor.sectionColor}}>
                SALONS
              </Text>
              <Text
                subhead
                style={{color: BaseColor.titleColor, marginTop: 10}}>
                If you have already visited our Vaniday FAQ and have pending
                questions, or would just like to get to know us better, feel
                free to contact our customer service team:
              </Text>
              {/* <TouchableOpacity
                style={[styles.profileItem, {marginTop: 5}]}
                onPress={() => {
                  navigation.navigate('');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  24/7 Live Chat Support
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  Email: contact@vaniday.com.sg
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  Facebook: www.facebook.com/vaniday.sg
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity> */}

              <Text
                headline
                bold
                style={{marginTop: 20, color: BaseColor.sectionColor}}>
                WORK WITH US
              </Text>
              <Text
                subhead
                style={{color: BaseColor.titleColor, marginTop: 10}}>
                Want to join the awesome Vaniday team? Send a CV, along with a
                few lines about yourself and how you will contribute to our team
                to careers@vaniday.com
              </Text>

              <Text
                headline
                bold
                style={{marginTop: 20, color: BaseColor.sectionColor}}>
                PRESS
              </Text>
              <Text
                subhead
                style={{color: BaseColor.titleColor, marginTop: 10}}>
                Interested in knowing more about us, our team and our business
                model?
              </Text>
              {/* <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  navigation.navigate('');
                }}>
                <Text subhead style={{color: BaseColor.titleColor}}>
                  contact@vaniday.com.sg
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={'rgba(0,0,0,0.65)'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
