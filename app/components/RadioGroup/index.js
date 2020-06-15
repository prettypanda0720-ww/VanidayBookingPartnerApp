import * as React from 'react';
import {View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {BaseStyle, BaseColor, Images} from '@config';

export default class RadioGroup extends React.Component {
  state = {
    value: 'first',
  };

  render() {
    return (
      <RadioButton.Group
        onValueChange={(value) => this.setState({value})}
        value={this.state.value}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              color: BaseColor.SecondColor,
            }}>
            <RadioButton
              uncheckedColor={BaseColor.SecondColor}
              color={BaseColor.SecondColor}
              value="first"
            />
            <Text style={{color: BaseColor.sectionColor}}>Company</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <RadioButton
              uncheckedColor={BaseColor.SecondColor}
              color={BaseColor.SecondColor}
              value="second"
            />
            <Text style={{color: BaseColor.sectionColor}}>Freelancer</Text>
          </View>
        </View>
      </RadioButton.Group>
    );
  }
}
