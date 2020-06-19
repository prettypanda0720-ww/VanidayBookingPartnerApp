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
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
} from '@components';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';

class TermsAndConditions extends Component {
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
            return <Icon name="times" size={20} color={BaseColor.sectionColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={{flexDirection: 'column', padding: 20, paddingBottom: 40}}>
          <View style={{marginTop: 0}}>
            <Text title2 bold style={{color:BaseColor.sectionColor}}>
              Edit Terms and Conditions
            </Text>
            <View style={styles.inputGroup}>
              <Text headline style={{color: BaseColor.sectionColor}}>
                Terms and Conditions
              </Text>
              <TextInput
                style={[
                  BaseStyle.textInput,
                  BaseStyle.multilineTextInput,
                  {marginTop: 10},
                ]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}
                multiline={true}>
                In Italian, "Covo" means a hiding place. When you come to our
                salon, you will experience a private and relaxing space and
                time. All the stylists are experienced Japanese stylists with
                Japanese quality service. Our location is on the happening Keong
                Saik road, on the ground floor in a shop house. We try out best
                to cater damage-free hair using in-house developed
                chemicals(developed in Tokyo by our owner stylist) for
                colouring, pem, rebonding and treatment. We also have Keratin
                treatment for damaged hair as well. For the best result for both
                hair and scalp, we use carbonated water in the salon. Please
                come to experience quality technique and service to Covo.
              </TextInput>
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
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

export default TermsAndConditions;
