import React, {Component} from 'react';
import {
  FlatList,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';

import {Dropdown} from 'react-native-material-dropdown';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';
import {StartTimes, ServiceData} from '@data';

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      index: 0,
      routes: [
        {key: 'general', title: 'General'},
        {key: 'services', title: 'Services'},
        {key: 'workinghours', title: 'Working hours'},
      ],
      timeInterval: StartTimes,
      data: ServiceData,
      title: 'Add a Service',
      modalVisible: false,
      clients: [
        {
          image: Images.profile2,
          subName: 'CEO Founder',
          name: 'Kondo Ieyasu',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile3,
          subName: 'Sale Manager',
          name: 'Yeray Rosales',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile5,
          subName: 'Product Manager',
          name: 'Alf Huncoot',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile4,
          subName: 'Designer UI/UX',
          name: 'Chioke Okonkwo',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
      ],
      clientsModalVisible: false,
      clientTitle: 'Add a Client',
    };
  }

  showModal() {
    console.log('modal is clicked');
    this.setState({modalVisible: true});
  }

  showClientsModal() {
    console.log('modal is clicked');
    this.setState({clientsModalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  hideClientsModal() {
    this.setState({clientsModalVisible: false});
  }

  async getTitle(subtitle) {
    try {
      this.setState({title: subtitle});
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  async getClientTitle(subtitle) {
    try {
      this.setState({clientTitle: subtitle});
      await this.hideClientsModal();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const {navigation} = this.props;
    const {loading, timeInterval, search} = this.state;

    let staffs = [
      {value: 'Judy T'},
      {value: 'Wendy Simth'},
      {value: 'William lay'},
    ];

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <Modal
          animationType="slide" // fade
          transparent={false}
          visible={this.state.clientsModalVisible}>
          <View style={{flex: 1}}>
            <View style={{flex: 12}}>
              <Header
                title=""
                renderRight={() => {
                  return (
                    <Icon
                      name="times"
                      size={20}
                      color={BaseColor.sectionColor}
                    />
                  );
                }}
                onPressRight={() => this.hideClientsModal()}
              />
              <ScrollView style={styles.container}>
                <Text title2 bold>
                  Select Client
                </Text>
                <View style={{paddingTop: 60, paddingBottom: 10}}>
                  <View style={styles.searchWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          search: '',
                        });
                      }}
                      style={styles.btnSearch}>
                      <Icon
                        name="search"
                        size={18}
                        color={BaseColor.grayColor}
                      />
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
                      <Icon
                        name="times"
                        size={18}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {this.state.clients.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={[styles.clientContain]}
                      onPress={() => this.getClientTitle(item.name)}
                      activeOpacity={0.9}>
                      <View style={{flexDirection: 'row'}}>
                        <Image source={item.image} style={[styles.thumb]} />
                        <View>
                          <Text headline semibold numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text
                            footnote
                            grayColor
                            numberOfLines={2}
                            style={{paddingRight: 20}}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <Icon
                        name="angle-right"
                        size={20}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.floatingBtn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateClient')}
                  style={styles.button}
                  activeOpacity={0.8}>
                  <Image style={styles.image} source={Images.icons_create} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
              <ScrollView style={styles.container}>
                <Text title2 bold>
                  Select Service Type
                </Text>
                <View style={{paddingTop: 20}}>
                  <View style={styles.searchWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          search: '',
                        });
                      }}
                      style={styles.btnSearch}>
                      <Icon
                        name="search"
                        size={18}
                        color={BaseColor.grayColor}
                      />
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
                      <Icon
                        name="times"
                        size={18}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  data={this.state.data}
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
                            <View style={styles.serviceItemWrapper}>
                              <Text
                                headline
                                style={{color: BaseColor.sectionColor}}>
                                {item.serviceTitle}
                              </Text>
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
          </View>
        </Modal>
        <Header
          title=""
          renderRight={() => {
            return <Icon name="times" size={20} color={BaseColor.blackColor} />;
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={styles.container}>
          <Text title2 bold style={{color: BaseColor.sectionColor}}>
            New Appointment
          </Text>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={[styles.clientWrapper, {marginTop: 15}]}
              onPress={() => this.showClientsModal()}>
              <Text headline semibold>
                {this.state.clientTitle}
              </Text>
              <View style={styles.contentCenter}>
                <Icon name="plus" size={15} color={BaseColor.blackColor} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.clientWrapper, {marginTop: 10}]}
              onPress={() => navigation.navigate('AppointmentDate')}>
              <View>
                <Text headline semibold>
                  Saturday, 25 Apr 202
                </Text>
                <Text caption1>Doesn't repeat</Text>
              </View>
              <View style={styles.contentCenter}>
                <Icon
                  name="chevron-right"
                  size={15}
                  color={BaseColor.blackColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 60}}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Services
            </Text>
            <TouchableOpacity
              style={[styles.clientWrapper, {marginTop: 30}]}
              onPress={() => this.showModal()}>
              <View>
                <Text caption2 style={{color: BaseColor.sectionColor}}>
                  Service
                </Text>
                <Text headline semibold style={{color: BaseColor.sectionColor}}>
                  {this.state.title}
                </Text>
              </View>
              <View style={styles.contentCenter}>
                <Icon
                  name="chevron-right"
                  size={15}
                  color={BaseColor.sectionColor}
                />
              </View>
            </TouchableOpacity>
            <Dropdown
              label="Staff"
              baseColor={BaseColor.sectionColor}
              textColor={BaseColor.titleColor}
              data={staffs}
              rippleOpacity={0.7}
            />
            <Dropdown
              baseColor={BaseColor.sectionColor}
              textColor={BaseColor.titleColor}
              label="Start Time"
              data={timeInterval}
              rippleOpacity={0.7}
            />
          </View>
          <Text
            title2
            bold
            style={{marginTop: 30, color: BaseColor.sectionColor}}>
            Notes
          </Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={[BaseStyle.textInput, styles.textInput]}
              onChangeText={(text) => this.setState({id: text})}
              autoCorrect={false}
              placeholder="Notes visible to staff only"
              placeholderTextColor={BaseColor.sectionColor}
              selectionColor={BaseColor.titleColor}
            />
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            paddingVertical: 10,
            borderTopColor: BaseColor.sectionColor,
            borderTopWidth: 1,
          }}>
          <Text headline bold style={{color: BaseColor.sectionColor}}>
            Total: SGD 110 (10min)
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={{flex: 1, marginRight: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            CHECK OUT
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            SAVE
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateAppointment;
