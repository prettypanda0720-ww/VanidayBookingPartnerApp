import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import * as Utils from '@utils';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  DatePicker,
  BookingHistory,
  Button,
} from '@components';

import {BaseStyle, BaseColor} from '@config';
import {StartTimes} from '@data';
import styles from './styles';

class RescheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      timeInterval: StartTimes,
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {navigation} = this.props;
    const item = this.props.navigation.state.params.bookingData;
    const {loading, timeInterval} = this.state;
    let status = [
      {value: 'Confirmed'},
      {value: 'Pending'},
      {value: 'Cancel'},
      {value: 'No Show'},
    ];
    const detail = [
      {
        serviceName: item.serviceName,
        staffName: item.staffName,
        price: item.price,
        duration: item.service_duration,
      },
    ];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Header
          title="Reschedule Appointment"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={15}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
          }}>
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Appointment Date
            </Text>
            <DatePicker time={item.slotDate} style={{marginTop: 10}} />
          </View>
          <View style={[styles.inputGroup, styles.rowBetweenAlign]}>
            <View style={{flex: 1, marginRight: 10}}>
              <Dropdown
                label="Start Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
                value={item.slotTime}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Dropdown
                label="End Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
                value={Utils.getTimeFromDate(item.bookingTo)}
              />
            </View>
          </View>
          <BookingHistory
            refId={item.id}
            clientName={'Judy T'}
            appointmentDate={item.slotDate}
            total={item.price}
            status={Utils.capitalize(item.status)}
            detail={detail}
            startTime={item.slotTime}
            endTime={item.bookingTo}
            style={{paddingVertical: 20, marginHorizontal: 0}}
            onPress={() => {
              this.props.navigation.navigate('');
            }}
          />
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Payment method
            </Text>
            <Text
              headline
              semibold
              style={{color: BaseColor.sectionColor, marginLeft: 10}}>
              Credit Card (Online Payment)
            </Text>
          </View>
        </ScrollView>
        <View
          style={[
            styles.inputGroup,
            {
              justifyContent: 'flex-end',
              flexDirection: 'column',
              paddingHorizontal: 20,
              paddingVertical: 10,
            },
          ]}>
          <Button
            style={[
              styles.customBtn,
              {
                paddingVertical: 10,
                marginTop: 15,
              },
            ]}
            styleText={{fontSize: 15}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Confirm
          </Button>
          <Button
            style={[
              styles.customBtn,
              {
                backgroundColor: '#bfbfbf',
                marginTop: 15,
              },
            ]}
            styleText={{fontSize: 15}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Exit
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default RescheduleAppointment;
