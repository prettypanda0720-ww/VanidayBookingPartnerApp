import React, {Component} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

export default class OpeningHours extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      data: [
        {
          title: 'Sunday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Monday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Tuesday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Wednesday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Thursday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Friday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
        },
        {
          title: 'Saturday',
          workingHours: {startTime: '9:00 AM', endTime: '7:30 PM'},
          lunchTime: {startTime: '12:30 PM', endTime: '1:30 PM'},
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
          title="Opening Hours"
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
        <ScrollView>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <Text title3 bold style={{color: BaseColor.SecondColor}}>
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      title3
                      semibold
                      style={{color: BaseColor.blackColor}}>
                      Working Time
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        headline
                        semibold
                        style={{color: BaseColor.grayColor}}>
                        {item.workingHours.startTime}
                      </Text>
                      <Text
                        body1
                        semibold
                        style={{color: BaseColor.titleColor}}>
                        &nbsp;~&nbsp;
                      </Text>
                      <Text
                        headline
                        semibold
                        style={{color: BaseColor.grayColor}}>
                        {item.workingHours.endTime}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <Text title3 semibold style={{color: BaseColor.blackColor}}>
                      Lunch Time
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        headline
                        semibold
                        style={{color: BaseColor.sectionColor}}>
                        {item.workingHours.startTime}
                      </Text>
                      <Text
                        body1
                        semibold
                        style={{color: BaseColor.titleColor}}>
                        &nbsp;~&nbsp;
                      </Text>
                      <Text
                        headline
                        semibold
                        style={{color: BaseColor.sectionColor}}>
                        {item.workingHours.endTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
