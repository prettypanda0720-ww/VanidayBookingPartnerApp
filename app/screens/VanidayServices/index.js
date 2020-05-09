import React, {Component} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {
  SafeAreaView,
  Icon,
  Text,
  Button,
  Header,
  VanidayServiceItem,
} from '@components';
import styles from './styles';

// Load sample data
import {VanidayServiceData} from '@data';

export default class VanidayServices extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      vanidayServices: VanidayServiceData,
    };
  }

  render() {
    const {navigation} = this.props;
    const {vanidayServices, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Header
            title="Vaniday Services"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <ScrollView style={styles.container}>
            <Text body2 style={{color: BaseColor.secondBlackColor}}>
              Check out our full suite of services that help grow your business.
            </Text>
            <View style={styles.inputGroup}>
              <FlatList
                columnWrapperStyle={{marginBottom: 20}}
                numColumns={2}
                data={vanidayServices}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <VanidayServiceItem
                    image={item.image}
                    name={item.name}
                    style={index % 2 ? {marginLeft: 15} : {}}
                    onPress={() => navigation.navigate(item.name)}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
