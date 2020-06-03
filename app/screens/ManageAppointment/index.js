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
import * as Utils from '@utils';
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
    const item = this.props.navigation.state.params.bookingData;
    const {loading} = this.state;
    let status = [{value: 'Accept'}, {value: 'Cancel'}, {value: 'No Show'}];
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
                refId={item.id}
                clientName={'Judy T'}
                appointmentDate={item.slotDate}
                total={item.price}
                status={Utils.capitalize(item.status)}
                detail={detail}
                startTime={item.slotTime}
                endTime={item.bookingTo}
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
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: 8}}>
                  <Button
                    full
                    style={[styles.customBtn, {backgroundColor: '#e5ccc2'}]}
                    styleText={styles.btnTextStyle1}
                    loading={loading}
                    onPress={() =>
                      navigation.navigate('RescheduleAppointment', {
                        bookingData: item,
                      })
                    }>
                    Reschedule
                  </Button>
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                  <Button
                    full
                    style={[styles.customBtn, {backgroundColor: '#e5ccc2'}]}
                    styleText={styles.btnTextStyle1}
                    loading={loading}
                    onPress={() => navigation.goBack()}>
                    Chat
                  </Button>
                </View>
              </View>
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
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ManageAppointment;
