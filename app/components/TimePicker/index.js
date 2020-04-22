import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import TimePicker from 'react-native-simple-time-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15, 
    borderWidth: 1, 
    borderColor: BaseColor.grayColor, 
    borderRadius: 10,
    marginTop: 5,
  },
});

export default class VanidayTimePicker extends Component {
  state = {
    selectedHours: 0,
    selectedMinutes: 0,
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View  style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text body1>{selectedHours} : {selectedMinutes}</Text>
            </View>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <TimePicker
                style={{flex:1,  justifyContent: 'center', alignItems: 'center'}}
                selectedHours={0}
                selectedMinutes={30}
                onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
            />  
            </View>
        </View> 
      </View>
    );
  }
}