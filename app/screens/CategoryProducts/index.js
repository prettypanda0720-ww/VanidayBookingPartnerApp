import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, ProfileDescription} from '@components';

import {Values} from '@data';

import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CategoryProducts extends Component {
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
      suppliers: [
        {
          image: '',
          subName: '',
          name: 'Large Shampoo',
          screen: 'CreateOrder',
          description: '123ABC / 1 in stock',
          rightContent: 'SGD 123',
        },
        {
          image: '',
          subName: '',
          name: 'Large Shampoo',
          screen: 'CreateOrder',
          description: '123ABC / 1 in stock',
          rightContent: 'SGD 123',
        },
        {
          image: '',
          subName: '',
          name: 'Large Shampoo',
          screen: 'CreateOrder',
          description: '123ABC / 1 in stock',
          rightContent: 'SGD 123',
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {loading, Values, search} = this.state;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="HairCut Products"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <View style={{padding: 20}}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnSearch}>
              <Icon name="search" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>

            <TextInput
              style={[BaseStyle.textInput, {paddingLeft: 30}]}
              onChangeText={(text) => this.setState({search: text})}
              autoCorrect={false}
              placeholder="Scan barcode or search any Item"
              placeholderTextColor={BaseColor.grayColor}
              value={search}
              selectionColor={BaseColor.primaryColor}
              onSubmitEditing={() => {
                this.onSearch(search);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  search: '',
                });
              }}
              style={styles.btnClearSearch}>
              <Icon name="times" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 60,
          }}>
          {this.state.suppliers.map((item, index) => {
            return (
              <ProfileDescription
                style={{
                  paddingVertical: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: BaseColor.fieldColor,
                }}
                key={'service' + index}
                image={item.image}
                description={item.description}
                name={item.name}
                subName={item.subName}
                rightContent={item.rightContent}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CategoryProducts;
