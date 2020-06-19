import React, {Component} from 'react';
import {
  FlatList,
  View,
  TextInput,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  CustomPhoneInput,
} from '@components';
import {Values} from '@data';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CreateBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      countryCode: 65,
      cca2: 'SG',
      country: 'SG',
      phoneNumber: '',
      Values: Values,
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Add Brand"
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.sectionColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={BaseStyle.headerStyle}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          <View style={styles.inputGroup}>
            <Text body2 style={{color: BaseColor.sectionColor}}>
              BRAND NAME
            </Text>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="e.g. L'Oreal"
              placeholderTextColor={BaseColor.titleColor}
              selectionColor={BaseColor.titleColor}
            />
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

export default CreateBrand;
