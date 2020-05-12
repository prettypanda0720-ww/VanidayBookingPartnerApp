import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Switch} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, StaffProfileListItem} from '@components';
import styles from './styles';

export default class StaffMembers extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      ourTeam: [
        {
          image: Images.profile2,
          point: '9.5',
          name: 'Judy T',
          screen: 'StaffProfileDetail',
          description: 'riverstar1992@gmail.com',
          address: 'HairRemoval Expert',
          id: 'asdf',
          route: 'asdf',
          rate: 3,
          rateCount: '12 of 20',
        },
        {
          image: Images.profile3,
          point: '5.5',
          name: 'William Lay',
          screen: 'StaffProfileDetail',
          description: 'riverstar1992@gmail.com',
          address: 'Massage Expert',
          id: 'asdf',
          route: 'asdf',
          rate: 5,
          rateCount: '12 of 20',
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
          title="Staff Members"
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
        <View style={styles.membersWrapper}>
          {this.state.ourTeam.map((item, index) => {
            return (
              <StaffProfileListItem
                image={item.image}
                textFirst={item.name}
                point={item.point}
                textSecond={item.address}
                textThird={item.id}
                rate={item.rate}
                rateCount={item.rateCount}
                style={styles.memberItemWrapper}
                styleThumb={styles.staffThumb}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          })}
        </View>
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateStaff')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
