import React, {Component} from 'react';
import {FlatList, View, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Checkbox} from 'react-native-material-ui';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import PropTypes from 'prop-types';
import * as Utils from '@utils';
import styles from './styles';

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      index: 0,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    let duration = [
      {value: '1h'},
      {value: '2h'},
      {value: '3h'},
      {value: '4h'},
      {value: '5h'},
      {value: '6h'},
      {value: '7h'},
      {value: '8h'},
      {value: '9h'},
    ];

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderRight={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.sectionColor} />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={{flexDirection: 'column', padding: 20, paddingBottom: 40}}>
          <View style={{marginTop: 0}}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Staff
            </Text>
            <Text caption1 style={{color: BaseColor.titleColor}}>
              Select staff who perform this service.
            </Text>
            <View style={[styles.inputGroup, {flexDirection: 'column'}]}>
              <Checkbox label="Judy T" value="agree" checked={true} />
              <Checkbox label="Wendy Smith" value="agree" checked={false} />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginBottom: 0,
            padding: 20,
            flexDirection: 'row',
          }}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default EditService;
