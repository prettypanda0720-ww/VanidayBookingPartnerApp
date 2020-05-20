import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  BookingHistory,
  Button,
} from '@components';

import {BaseStyle, BaseColor} from '@config';
import styles from './styles';

class ManageAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const item = this.props.navigation.state.params.data;
    console.log(item);
    const {loading} = this.state;
    let status = [{value: 'Accept'}, {value: 'Cancel'}, {value: 'No Show'}];
    item.detail = [
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
          title="Manage Appointment"
          renderRight={() => {
            return (
              <Icon name="times" size={15} color={BaseColor.sectionColor} />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <View style={styles.inputGroup}>
              <View style={{paddingHorizontal: 20}}>
                <Dropdown
                  label="Status"
                  data={status}
                  rippleOpacity={0.7}
                  baseColor={BaseColor.sectionColor}
                  textColor={BaseColor.titleColor}
                  style={{color: BaseColor.blackColor}}
                />
              </View>
              <BookingHistory
                refId={item.refId}
                clientName={item.customerName}
                appointmentDate={item.appointmentDate}
                total={item.total}
                status={item.acceptedState}
                detail={item.detail}
                startTime={item.startTime}
                endTime={item.endTime}
                style={{paddingVertical: 20, marginHorizontal: 20}}
                onPress={() => {
                  this.props.navigation.navigate('');
                }}
              />
              <Text
                headline
                style={{
                  color: BaseColor.sectionColor,
                  marginTop: 20,
                  paddingHorizontal: 20,
                  textAlign: 'center',
                }}>
                Before you reschedule, please chat or contact customer at
                96671234
              </Text>
            </View>
            <View
              style={[
                styles.inputGroup,
                {
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  backgroundColor: '#e5e5e5',
                },
              ]}>
              <View style={{marginTop: 20, flexDirection: 'row'}}>
                <Button
                  style={{flex: 1, backgroundColor: '#e5ccc2'}}
                  styleText={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#FD8374',
                  }}
                  loading={loading}
                  onPress={() =>
                    navigation.navigate('RescheduleAppointment', item)
                  }>
                  Reschedule
                </Button>
                <Button
                  style={{flex: 1, marginLeft: 10, backgroundColor: '#e5ccc2'}}
                  styleText={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#FD8374',
                  }}
                  loading={loading}
                  onPress={() => navigation.goBack()}>
                  Chat
                </Button>
              </View>
              <Button
                style={{paddingVertical: 10, marginTop: 15}}
                styleText={{fontWeight: 'bold', fontSize: 22}}
                loading={loading}
                onPress={() => navigation.goBack()}>
                Confirm
              </Button>
              <Button
                style={{backgroundColor: '#bfbfbf', marginTop: 15}}
                styleText={{fontWeight: 'bold', fontSize: 22}}
                loading={loading}
                onPress={() =>
                  navigation.goBack()
                }>
                Exit
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ManageAppointment;
