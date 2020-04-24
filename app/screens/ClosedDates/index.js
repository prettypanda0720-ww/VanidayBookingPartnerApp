import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Switch} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ClosedDateListItem,
} from '@components';
import styles from './styles';

// Load sample data
import {ShopsData} from '@data';

export default class ClosedDates extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      ourTeam: [
        {
          image: Images.profile2,
          point: '9.5',
          name: 'Judy T',
          screen: 'EditClosedDate',
          description: 'riverstar1992@gmail.com',
          closedates: '2020/03/01-2020/03/20',
          startDate: '2020/03/01',
          endDate: '2020/03/20',
          id: 'asdf',
          route: 'EditClosedDate',
          reason: 'Public holiday',
          long: '20',
        },
        {
          image: Images.profile3,
          point: '5.5',
          name: 'William Lay',
          screen: 'EditClosedDate',
          description: 'riverstar1992@gmail.com',
          closedates: '2020/04/01 - 2020/04/25',
          startDate: '2020/04/01',
          endDate: '2020/04/20',
          id: 'asdf',
          route: 'EditClosedDate',
          reason: 'Public holiday',
          long: 12,
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    const {shopData, loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Closed Dates"
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
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'column',
          }}>
          {this.state.ourTeam.map((item, index) => {
            return (
              <ClosedDateListItem
                image={item.image}
                textFirst={item.name}
                point={item.point}
                textSecond={item.closedates}
                textThird={item.id}
                reason={item.reason}
                long={item.long}
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: BaseColor.grayColor,
                }}
                styleThumb={{width: 75, height: 75, borderRadius: 15}}
                onPress={() => navigation.navigate(item.screen, {data: item})}
              />
            );
          })}
        </View>
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateClosedDate')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
