import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
  TextInput,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  Image,
  DealCategoryItem,
  StarRating,
} from '@components';
import styles from './styles';
import {Dropdown} from 'react-native-material-dropdown';

// Load sample data
import {ShopsData} from '@data';

export default class EditEcard extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {shopData, loading} = this.state;
    const data = this.props.navigation.state.params.data;
    let duration = [
      {value: '7 days'},
      {value: '14 days'},
      {value: '21 days'},
      {value: '28 days'},
      {value: '35 days'},
      {value: '42 days'},
      {value: '49 days'},
      {value: '56 days'},
      {value: '63 days'},
    ];
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Product"
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
        />
        <ScrollView>
          <Text
            headline
            style={{
              color: BaseColor.secondBlackColor,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            Product Logo
          </Text>
          <Image source={data.image} style={styles.blockImage} />
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Button
              style={{flex: 1}}
              loading={loading}
              onPress={() => navigation.goBack()}>
              Change image of Product Logo
            </Button>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={[styles.inputGroup, {flexDirection: 'row'}]}>
              <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                  Retail Price
                </Text>
                <TextInput
                  style={[BaseStyle.textInput, styles.textInput]}
                  onChangeText={(text) => this.setState({id: text})}
                  autoCorrect={false}
                  placeholder="200$"
                  placeholderTextColor={BaseColor.MainPrimaryColor}
                  selectionColor={BaseColor.primaryColor}>
                  {data.address}
                </TextInput>
              </View>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                  Price
                </Text>
                <TextInput
                  style={[BaseStyle.textInput, styles.textInput]}
                  onChangeText={(text) => this.setState({id: text})}
                  autoCorrect={false}
                  placeholder="240$"
                  placeholderTextColor={BaseColor.MainPrimaryColor}
                  selectionColor={BaseColor.primaryColor}>
                  {data.address}
                </TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            CANCEL
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            SAVE
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
