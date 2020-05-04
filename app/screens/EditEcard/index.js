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
          title="Edit Ecard"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
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
            Ecard Logo
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
              Change image of Ecard Logo
            </Button>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={[styles.inputGroup, {flexDirection: 'row'}]}>
              <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
                <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                  Pay
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
                  Get
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
            <View style={[styles.inputGroup, {flexDirection: 'row'}]}>
              <View style={{flex: 1}}>
                <Dropdown
                  label="Validate for"
                  data={duration}
                  rippleOpacity={0.7}
                  baseColor={BaseColor.secondBlackColor}
                  tintColor={BaseColor.blackColor}
                  style={{color: BaseColor.blackColor}}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Terms
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.multilineTextInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
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
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                About
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.multilineTextInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
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
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                How does eCard Works
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.multilineTextInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
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
