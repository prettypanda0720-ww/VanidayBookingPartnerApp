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
  Switch,
} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import { Dropdown } from 'react-native-material-dropdown';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';

class NewPricingOption extends Component {
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
    let duration = [{value: '1h'},{value: '2h'}, {value: '3h'},
                {value: '4h'},{value: '5h'}, {value: '6h'},
                {value: '7h'},{value: '8h'}, {value: '9h'},];

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={{flexDirection: 'column', padding: 20, paddingBottom: 40}}>
          <View style={{marginTop: 0}}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              New pricing option
            </Text>
            <View style={styles.inputGroup}>
              <Dropdown
                label='Duration'
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data = {duration}
                rippleOpacity = {0.7}
              />
              <Text caption3 style={{color: BaseColor.sectionColor}}>Retail price</Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}>
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.sectionColor}}>Special price</Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="$ 0.00"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}>
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.sectionColor}}>Pricing name(optional)</Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder="e.g Long hair"
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.primaryColor}>
              </TextInput>
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button style={{flex: 1, marginLeft: 10,}} loading={loading} onPress={() => navigation.goBack()}>
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default NewPricingOption;

