import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import Swiper from 'react-native-swiper';
import styles from './styles';

export default class Aboutus extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    const data = this.props.navigation.state.params.data;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Business Detail"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <Text headline style={styles.headerTitle}>
            Business Photo
          </Text>
          <View style={styles.wrapper}>
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor,
              }}
              activeDotColor={BaseColor.primaryColor}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}>
              {data.images.map((item, index) => {
                return (
                  <View style={styles.slide} key={item.key}>
                    <Image source={item.image} style={styles.blockImage} />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={styles.changeButton}>
            <Button
              style={{flex: 1}}
              loading={loading}
              onPress={() => navigation.goBack()}>
              Upload Business Photo
            </Button>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Business name
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {data.name}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Business address
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({id: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {data.address}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.titleColor}}>
                Business Description
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
                Business, you will experience a private and relaxing space and
                time. All the stylists are experienced Japanese stylists with
                Japanese quality service. Our location is on the happening Keong
                Saik road, on the ground floor in a shop house. We try out best
                to cater damage-free hair using in-house developed
                chemicals(developed in Tokyo by our owner stylist) for
                colouring, pem, rebonding and treatment. We also have Keratin
                treatment for damaged hair as well. For the best result for both
                hair and scalp, we use carbonated water in the Business. Please
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
