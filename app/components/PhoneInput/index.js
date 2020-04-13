import React from 'react'
import { 
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet, 
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
// native base imports
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

import data from './countries'
import styles from './styles'

// Default render of country flag
const defaultFlag = data.filter(
  obj => obj.name === 'Singapore'
  )[0].flag

export default class App extends React.Component {
  state = {
    flag: defaultFlag,
    modalVisible: false,
    phoneNumber: '',
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  showModal() {
    this.setState({ modalVisible: true })
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }

  async getCountry(country) {
    const countryData = await data
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Set data from user choice of country
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    let { flag } = this.state
    const countryData = data
    return (
      <SafeAreaView style={[styles.container, {marginTop: 20}]}>
        <KeyboardAvoidingView style={[styles.container]} behavior='padding' enabled>
          <TouchableWithoutFeedback style={[styles.container]} onPress={Keyboard.dismiss}>
            <View style={[styles.container]}>
              <Container style={[styles.infoContainer]}>
                {/* Phone input with native-base */}
                  {/* phone section  */}
                  <Item style={[styles.itemStyle]}>
                    <Icon
                      active
                      name='call'
                      style={styles.iconStyle}
                    />
                    {/* country flag */}
                    <View><Text style={{fontSize: 40}}>{flag}</Text></View>
                    {/* open modal */}
                    <Icon
                      active
                      name='md-arrow-dropdown'
                      style={[styles.iconStyle, { marginLeft: 5 }]}
                      onPress={() => this.showModal()}
                    />
                    <Input
                      style={[styles.input]}
                      placeholder='+44766554433'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'phone-pad'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='PhoneInput'
                      value={this.state.phoneNumber}
                      onChangeText={(val) => {
                        if (this.state.phoneNumber===''){
                          // render UK phone code by default when Modal is not open
                          this.onChangeText('phoneNumber', defaultCode + val)
                        } else {
                          // render country code based on users choice with Modal
                          this.onChangeText('phoneNumber', val)
                        }}
                      }
                    />
                    {/* Modal for country code and flag */}
                    <Modal
                      animationType="slide" // fade
                      transparent={false}
                      visible={this.state.modalVisible}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 12}}>
                          <FlatList
                            data={countryData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                              ({ item }) =>
                                <TouchableWithoutFeedback 
                                  onPress={() => this.getCountry(item.name)}>
                                  <View 
                                    style={
                                      [
                                        styles.countryStyle, 
                                        {
                                          flexDirection: 'row', 
                                          alignItems: 'center',
                                          justifyContent: 'space-between'
                                        }
                                      ]
                                    }>
                                    <Text style={{fontSize: 30}}>
                                      {item.flag}
                                    </Text>
                                    <Text style={{fontSize: 18, color: 'black'}}>
                                      {item.name} ({item.dial_code})
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>
                            }
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.hideModal()} 
                          style={styles.closeButtonStyle}>
                          <Text style={styles.textStyle}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </Item>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

