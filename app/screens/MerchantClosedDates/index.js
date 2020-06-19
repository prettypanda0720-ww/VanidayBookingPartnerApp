import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Switch} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, ClosedDateListItem} from '@components';
import styles from './styles';

export default class MerchantClosedDates extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      ourTeam: [
        {
          image: Images.findbycovo,
          point: '',
          name: 'FINDER by COVO',
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
          image: Images.findbycovo,
          point: '',
          name: 'FINDER by COVO',
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
    const {loading} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Closed Dates"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={BaseStyle.headerStyle}
        />
        <View style={styles.merchantWrapper}>
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
                style={styles.itemStyle}
                styleThumb={styles.thumbStyle}
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
