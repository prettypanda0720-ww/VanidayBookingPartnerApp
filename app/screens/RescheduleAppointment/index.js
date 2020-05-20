import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import ActionSheet from 'react-native-actionsheet';
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
    const item = this.props.navigation.state.params;
    const {loading, timeInterval} = this.state;
    let status = [
      {value: 'Confirmed'},
      {value: 'Pending'},
      {value: 'Cancel'},
      {value: 'No Show'},
    ];
    const detail = [
      {
        serviceName: item.name,
        staffName: item.staffName,
        price: item.total,
        duration: item.duration,
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
            paddingVertical: 10,
          }}>
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Appointment Date
            </Text>
            <DatePicker time={item.appointmentDate} style={{marginTop: 10}} />
          </View>
          <View style={[styles.inputGroup, styles.rowBetweenAlign]}>
            <View style={{flex: 1, marginRight: 10}}>
              <Dropdown
                label="Start Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Dropdown
                label="End Time"
                baseColor={BaseColor.sectionColor}
                textColor={BaseColor.titleColor}
                data={timeInterval}
                rippleOpacity={0.7}
              />
            </View>
          </View>
          <BookingHistory
            refId={item.refId}
            clientName={item.customerName}
            appointmentDate={item.appointmentDate}
            total={item.total}
            status={item.acceptedState}
            detail={detail}
            startTime={item.startTime}
            endTime={item.endTime}
            style={{paddingVertical: 10, marginTop: 10}}
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
              paddingVertical: 20,
            },
          ]}>
          <Button
            style={{paddingVertical: 10}}
            styleText={{fontWeight: 'bold', fontSize: 22}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            Confirm
          </Button>
          <Button
            style={{backgroundColor: '#bfbfbf', marginTop: 15}}
            styleText={{fontWeight: 'bold', fontSize: 22}}
            loading={loading}
            onPress={() => navigation.navigate('RescheduleAppointment', item)}>
            Exit
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default RescheduleAppointment;
