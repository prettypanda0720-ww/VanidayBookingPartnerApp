import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { BaseStyle, BaseColor, Images } from "@config";

export default class RadioGroup extends React.Component {
  state = {
    value: 'first',
  };

  render() {
    return(
      <RadioButton.Group
        onValueChange={value => this.setState({ value })}
        value={this.state.value}>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 10}}>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', color: BaseColor.MainPrimaryColor}}>
            <RadioButton 
               uncheckedColor = {BaseColor.MainPrimaryColor}
               color = {BaseColor.MainPrimaryColor}
               value="first" />
            <Text style={{color:BaseColor.MainPrimaryColor}}>Company</Text>
          </View>
          <View style={{flex: 1, flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
            <RadioButton 
              uncheckedColor = {BaseColor.MainPrimaryColor}
              color = {BaseColor.MainPrimaryColor}
              value="second" />
            <Text style={{color:BaseColor.MainPrimaryColor}}>Freelancer</Text>
          </View>
        </View>
      </RadioButton.Group>
    )
  }
}