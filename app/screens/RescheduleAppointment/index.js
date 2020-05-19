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
import styles from './styles';

class RescheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {navigation} = this.props;
    const item = this.props.navigation.state.params;
    const {loading} = this.state;
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
          renderRight={() => {
            return (
              <Icon
                name="ellipsis-h"
                size={15}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressRight={() => {
            this.showActionSheet();
          }}
          style={styles.headerStyle}
        />
        <ScrollView
          style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Dropdown
            label="Status"
            data={status}
            rippleOpacity={0.7}
            baseColor={BaseColor.sectionColor}
            textColor={BaseColor.titleColor}
            style={{color: BaseColor.blackColor}}
          />
          <View style={[styles.inputGroup, {flex: 1, flexDirection: 'column'}]}>
            <Text headline bold style={{color: BaseColor.sectionColor}}>
              Appointment Date
            </Text>
            <DatePicker time={item.appointmentDate} style={{marginTop: 10}} />
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
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={''}
          options={['Continue', 'Call', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            switch (index) {
              case 0:
                navigation.navigate('Continue');
                break;
              case 1:
                navigation.navigate('Call');
                break;
              case 2:
                navigation.navigate('Cancel');
                break;
              default:
                break;
            }
          }}
        />
      </SafeAreaView>
    );
  }
}

export default RescheduleAppointment;
