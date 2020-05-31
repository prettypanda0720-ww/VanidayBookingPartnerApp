import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, Button, Text} from '@components';
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
          <View style={[styles.contentCenter, {marginTop: 30}]}>
            <Image style={styles.salonImage} source={Images.splashlogo} />
            <Text
              headline
              style={{color: BaseColor.sectionColor, marginTop: 20}}>
              Marketing Package
            </Text>
          </View>
          <Text
            bold
            numberOfLines={3}
            style={{
              color: BaseColor.sectionColor,
              marginTop: 20,
              width: '100%',
              textAlign: 'center',
              fontSize: 30,
            }}>
            Grow Your Business With Marketing Package
          </Text>
        </ScrollView>
        <Text
          title3
          bold
          numberOfLines={2}
          style={{
            color: BaseColor.sectionColor,
            marginTop: 20,
            width: '100%',
            textAlign: 'center',
          }}>
          contact@vaniday.com.sg
        </Text>
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
