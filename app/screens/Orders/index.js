import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  DatePicker,
  ProfileDescription,
} from '@components';
import {appointments} from '@data';
import styles from './styles';
import * as Utils from '@utils';
import {Dropdown} from 'react-native-material-dropdown';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      drawerOpen: null,
      modalVisible: false,
      appointments: appointments,
      search: '',
      ourTeam: [
        {
          image: '',
          subName: 'Created at: 7 May 2020',
          name: 'ORDERED',
          screen: 'OrderDetail',
          description: 'P2',
          rightContent: 'SGD 6,888',
        },
        {
          image: '',
          subName: 'Created at: 7 May 2020',
          name: 'CANCELED',
          screen: 'OrderDetail',
          description: 'P2',
          rightContent: 'SGD 6,888',
        },
      ],
    };
  }

  showModal() {
    console.log('modal is clicked');
    this.setState({modalVisible: true});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <Drawer
        open={this.state.drawerOpen}
        content={this.renderSideMenuContent()}
        type="overlay"
        tapToClose={true}
        styles={styles.drawerStyles}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        onClose={() => {
          this.setState({drawerOpen: false});
        }}
        panOpenMask={0.8}
        captureGestures="open"
        acceptPan={false}
        drawerPosition="right">
        {this.renderMainContent()}
      </Drawer>
    );
  }

  renderSideMenuContent = () => {
    let status = [
      {value: 'All status'},
      {value: 'Ordered'},
      {value: 'Received'},
      {value: 'Cancelled'},
    ];
    let suppliers = [
      {value: 'All suppliers'},
      {value: 'Judy T'},
      {value: 'Wang Wei'},
    ];

    const {loading} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.sideMenuStyle}>
        <View style={styles.filterContain}>
          <Text headline>Filters</Text>
        </View>
        <View style={styles.filterContent}>
          <Dropdown
            label="STATUS"
            data={status}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
          />
          <Dropdown
            label="SUPPLIER"
            data={suppliers}
            rippleOpacity={0.7}
            baseColor={BaseColor.secondBlackColor}
            tintColor={BaseColor.blackColor}
            style={{color: BaseColor.blackColor}}
          />
        </View>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: '#FFF',
            }}
            styleText={{color: '#000'}}
            outline={{borderColor: BaseColor.fieldColor}}
            loading={loading}
            onPress={() => this.setState({drawerOpen: false})}>
            CLEAR
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => this.setState({drawerOpen: false})}>
            APPLY
          </Button>
        </View>
      </View>
    );
  };

  renderMainContent = () => {
    const {appointments, search} = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <View style={[styles.contain, styles.borderBottom]}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
            onPress={() => this.goBybtn('goback')}>
            <Icon
              name="angle-left"
              size={20}
              color={BaseColor.blackColor}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
          <View style={styles.contentCenter}>
            <Text headline>Orders</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              style={styles.contentRightSecond}
              onPress={() => {
                this.setState({drawerOpen: true});
              }}>
              <Icon name="sliders-h" size={20} color={BaseColor.blackColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 20}}>
          <View style={styles.searchWrapper}>
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
        <ScrollView>
          {this.state.ourTeam.map((item, index) => {
            return (
              <ProfileDescription
                style={{marginTop: 10}}
                key={'service' + index}
                image={item.image}
                description={item.description}
                name={item.name}
                subName={item.subName}
                rightContent={item.rightContent}
                onPress={() => this.goBybtn(item.screen)}
              />
            );
          })}
        </ScrollView>
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => this.goBybtn('SelectSupplier')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  goBybtn(route) {
    const {navigation} = this.props;
    if (route == 'goback') {
      navigation.goBack();
    } else {
      navigation.navigate(route);
    }
  }
}
