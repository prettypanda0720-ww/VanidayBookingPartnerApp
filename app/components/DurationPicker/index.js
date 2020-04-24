import React, {Component} from 'react';
import PickerModal from 'react-native-picker-modal-view';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      list: [
        {Id: 1, Name: '1h', Value: '1h'},
        {Id: 2, Name: '2h', Value: '2h'},
        {Id: 3, Name: '3h', Value: '3h'},
        {Id: 4, Name: '4h', Value: '4h'},
        {Id: 5, Name: '5h', Value: '5h'},
        {Id: 6, Name: '6h', Value: '6h'},
        {Id: 7, Name: '7h', Value: '7h'},
        {Id: 8, Name: '8h', Value: '8h'},
        {Id: 9, Name: '9h', Value: '9h'},
        {Id: 10, Name: '10h', Value: '10h'},
      ]
    };
  }

  selected(selected) {
    this.setState({
      selectedItem: selected,
    });
  }

  render() {
    return (
      <PickerModal
        onSelected={(selected) => this.selected(selected)}
        onRequestClosed={() => console.warn('closed...')}
        onBackRequest={() => console.warn('back key pressed')}
        list={this.state.list}
        sortingLanguage={'tr'}
        showToTopButton={true}
        defaultSelected={this.state.selectedItem}
        autoCorrect={false}
        autoGenerateAlphabet={true}
        chooseText={'Choose one'}
        searchText={'Search...'}
        forceSelect={false}
        autoSort={true}
      />
    );
  }
}
