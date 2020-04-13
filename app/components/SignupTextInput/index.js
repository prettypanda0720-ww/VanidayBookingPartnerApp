import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';


export default class SignupTextInput extends React.Component {

    constructor(props) {
        super(props);  
        this.state = {
            text: '',
            isActive: false,
        };
    }

  render(){
    const {title} = this.props;
    const {text,  isActive} = this.state;
    const customStyle = isActive ? styles.customText: {backgroundColor: 'white'};  
    console.log(customStyle);
    return (
        <TextInput
            label= {title}
            value={this.state.text}
            style={customStyle}
            selectionColor = {'black'}
            underlineColor = {'black'}
            theme = {{colors: {text: 'green', primary: BaseColor.MainPrimaryColor}}}
            onFocus={() => this.setState({ isActive: true, })}
            onBlur={() => this.setState({ isActive: false, })}
            onChangeText={text => this.setState({ text })}
        />
    );
  }
}