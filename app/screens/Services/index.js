import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

// Load sample data
import {ServiceData} from '@data';

export default class Services extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      serviceData: ServiceData,
    };
  }

  render() {
    const {navigation} = this.props;
    const {serviceData, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Services"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <ScrollView>
            {serviceData.map((item, index) => {
              return (
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      marginBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <Text
                      body1
                      semibold
                      style={{color: BaseColor.sectionColor}}>
                      {item.title}&nbsp;({item.totalCount})
                    </Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        name="ellipsis-h"
                        size={15}
                        color={BaseColor.sectionColor}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      borderLeftWidth: 4,
                      borderLeftColor: BaseColor.MainPrimaryColor,
                      borderTopWidth: 1,
                      borderTopColor: BaseColor.dividerColor,
                    }}>
                    <FlatList
                      data={item.serviceList}
                      keyExtractor={(item, index) => item.id}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderBottomColor: BaseColor.dividerColor,
                          }}
                          activeOpacity={0.6}
                          onPress={() =>
                            navigation.navigate('EditService', {data: item})
                          }>
                          <View style={{flexDirection: 'column', flex: 8}}>
                            <Text
                              subhead
                              numberOfLines={3}
                              style={{color: BaseColor.titleColor}}>
                              {item.serviceTitle}
                            </Text>
                            <Text
                              caption1
                              style={{
                                marginTop: 5,
                                color: BaseColor.titleColor,
                              }}>
                              {item.duration}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1.2
                            }}>
                            <Text body2 style={{color: BaseColor.titleColor}}>
                              {item.price}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateService')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
