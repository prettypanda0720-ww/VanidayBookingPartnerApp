import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput, 
} from 'react-native';

import PropTypes from 'prop-types';

import {Header, Icon, Text} from '@components';
import {ServiceData} from '@data';
import {BaseColor, BaseSetting, BaseStyle} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';

class ServiceInput extends Component {
  state = {
    search: '',
    data: ServiceData,
    modalVisible: false,
    title: 'Please Select Service Type!',
  };

  showModal() {
    console.log('modal is clicked');
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
    // Refocus on the Input field after selecting the country code
    // this.refs.PhoneInput._root.focus();
  }

  async getTitle(subtitle) {
    const serviceData = await this.state.data;
    try {
      // const countryCode = await serviceData.filter(
      //   (obj) => obj.serviceTitle === subtitle,
      // )[0].serviceTitle;
      // Set data from user choice of country
      this.setState({title: subtitle});
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
    console.log(this.state.title);
  }

  render() {
    const serviceData = this.state.data;
    const search = this.state.search;
    const {
      style,
      data,
      ...rest
    } = this.props;

    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide" // fade
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{flex: 1}}>
            <View style={{flex: 12}}>
              <Header
                title=""
                renderRight={() => {
                  return (
                    <Icon name="times" size={20} color={BaseColor.blackColor} />
                  );
                }}
                onPressRight={() => this.hideModal()}
              />
              <ScrollView
                style={{
                  flexDirection: 'column',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <Text title2 bold>
                  Select Service Type
                </Text>
                <View style={{paddingTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: 'black',
                      borderRadius: 5,
                      borderWidth: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          search: '',
                        });
                      }}
                      style={styles.btnSearch}>
                      <Icon name="search" size={18} color={BaseColor.grayColor} />
                    </TouchableOpacity>

                    <TextInput
                      style={[BaseStyle.textInput, {paddingLeft: 30}]}
                      onChangeText={(text) => this.setState({search: text})}
                      autoCorrect={false}
                      placeholder="Search..."
                      placeholderTextColor={BaseColor.grayColor}
                      value={search}
                      selectionColor={BaseColor.primaryColor}
                      onSubmitEditing={() => {
                        this.onSearch(search);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          search: '',
                        });
                      }}
                      style={styles.btnClearSearch}>
                      <Icon name="times" size={18} color={BaseColor.grayColor} />
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  data={serviceData}
                  style={{marginTop: 20}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'column', marginTop: 20}}>
                      <Text title3 bold>
                        {item.title}&nbsp;({item.totalCount})
                      </Text>
                      <FlatList
                        data={item.serviceList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <TouchableWithoutFeedback
                            onPress={() => this.getTitle(item.serviceTitle)}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomColor: BaseColor.grayColor,
                                borderBottomWidth: 1,
                              }}>
                              <Text headline style={{color: '#b0b0b0'}}>{item.serviceTitle}</Text>
                              <Icon
                                name="chevron-right"
                                style={[styles.iconStyle, {marginLeft: 5}]}
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      />
                    </View>
                  )}
                />
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() => this.hideModal()}
              style={styles.closeButtonStyle}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{marginTop: 10,}}>
          <Text
            style={[BaseStyle.textInput, styles.textInput]}
            autoCorrect={false}
            placeholder="Service Name"
            placeholderTextColor={BaseColor.MainPrimaryColor}
            selectionColor={BaseColor.blackColor}
            numberOfLines = {1}>
            {this.state.title}
          </Text>
          <TouchableOpacity style={{position: 'absolute', right: 15, top: 10}}>
            <Icon
              name="angle-down"
              size={20}
              color={BaseColor.blackColor}
              onPress={() => this.showModal()}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default ServiceInput;


