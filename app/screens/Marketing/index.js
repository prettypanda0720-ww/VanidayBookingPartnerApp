import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import CheckBox from 'react-native-checkbox';
import {Values} from '@data';

import {BaseStyle, BaseColor, Images} from '@config';
import styles from './styles';

class Marketing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      Values: Values,
      valid: '',
      type: '',
      value: '',
      checked: false,
    };
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
    });
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Marketing"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView style={styles.container}>
          <Image style={styles.salonImage} source={Images.splashlogo} />
          <View style={styles.logoWrapper}>
            <View style={[styles.contentCenter, {flexDirection: 'row'}]}>
              <Image style={styles.image} source={Images.logo} />
              <View style={styles.logoContentWrapper}>
                <Text subhead bold>
                  The Vaniday Promise
                </Text>
                <Text caption1 semibold>
                  Getting You The Best Offer
                </Text>
              </View>
            </View>
            <View style={[styles.inputGroup, styles.contentCenter]}>
              <Text subhead>Apply Up to</Text>
              <Text
                header
                bold
                style={{color: BaseColor.secondBlackColor, marginTop: 0}}>
                $50,000
              </Text>
              <Text subhead>from 0.5% per month</Text>
              <Text subhead>6 months tenure</Text>
            </View>
            <Text caption1 style={styles.summaryStyle}>
              We will find you the best offer among various financial partners
            </Text>
          </View>
          <View
            style={[
              styles.inputGroup,
              styles.contentBetween,
              {paddingHorizontal: 10, marginTop: 40},
            ]}>
            <View style={[styles.contentCenter, {flexDirection: 'column'}]}>
              <Icon name="file-alt" size={60} color={BaseColor.secondBlackColor} />
              <Text caption1 style={{marginTop: 5}}>
                No collateral
              </Text>
            </View>
            <View style={[styles.contentCenter, {flexDirection: 'column'}]}>
              <Icon
                name="hand-holding-usd"
                size={60}
                color={BaseColor.secondBlackColor}
              />
              <Text caption1 style={{marginTop: 5}}>
                Easy application
              </Text>
            </View>
            <View style={[styles.contentCenter, {flexDirection: 'column'}]}>
              <Icon
                name="clipboard-list"
                size={60}
                color={BaseColor.secondBlackColor}
              />
              <Text caption1 style={{marginTop: 5}}>
                Quick approvals
              </Text>
            </View>
          </View>
          <View style={[styles.contentBetween, {marginTop: 30}]}>
            <CheckBox
              label={''}
              checked={this.state.checked}
              checkboxSize={10}
              onChange={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
            />
            <Text footnote numberOfLines={5} style={{paddingHorizontal: 10}}>
              I have read, understood and agreed to be subjected to Vaniday's
              Privacy and Policy and I consent for Vaniday to disclose my
              personal data to any third parties and / or any of their
              respective agents for purpose of loan application.
            </Text>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            I'm intersted
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default Marketing;
