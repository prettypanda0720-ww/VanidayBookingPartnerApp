import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Table,
  Row,
  TableWrapper,
  Col,
  Rows,
} from 'react-native-table-component';
import {BaseStyle, BaseColor} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  BookingHistory,
} from '@components';
import {appointments} from '@data';
import styles from './styles';
import * as Utils from '@utils';
import {Dropdown} from 'react-native-material-dropdown';

export default class PaymentsSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      drawerOpen: null,
      modalVisible: false,
      col: ['Payment', 'Total'],
      tableHead: ['Transactions', 'Gross Payments', 'Refunds', 'Net Payments'],
      tableData: [['0', 'SGD 0.00', 'SGD 0.00', 'SGD 0.00']],
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
    let location = [{value: 'All locations'}, {value: 'Singapore'}];
    let staffs = [{value: 'All'}, {value: 'Judy T'}, {value: 'William Lay'}];
    const {loading} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.sideMenuStyle}>
        <View style={styles.filterContain}>
          <Text headline>Filters</Text>
        </View>
        <View style={styles.filterContent}>
          <Dropdown
            label="location"
            data={location}
            rippleOpacity={0.7}
            baseColor={BaseColor.sectionColor}
            tintColor={BaseColor.titleColor}
          />
          <Dropdown
            label="Staffs"
            data={staffs}
            rippleOpacity={0.7}
            baseColor={BaseColor.sectionColor}
            tintColor={BaseColor.titleColor}
          />
        </View>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: '#FFF',
            }}
            styleText={{color: '#000', borderRadius: 0}}
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
    const {appointments} = this.state;
    const {navigation} = this.props;
    const {
      col,
      tableHead,
      tableData,
      cashtableHead,
      cashtableData,
    } = this.state;
    const win = Dimensions.get('window');
    const ww = win.width / 3;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
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
            <Text headline2 style={{margin: 0, padding: 0}}>
              Payments summary
            </Text>
            <TouchableOpacity
              style={styles.dateRange}
              onPress={() => this.goBybtn('SelectPeriod')}>
              <Text caption1 style={{color: BaseColor.grayColor}}>
                Month to Date
              </Text>
              <Icon
                name="angle-down"
                size={20}
                color={BaseColor.grayColor}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
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
        <ScrollView style={styles.tableContainer}>
          <View style={{flexDirection: 'row'}}>
            <Table borderStyle={styles.table}>
              <Col data={col} style={styles.colHead} textStyle={styles.text} />
            </Table>
            <ScrollView horizontal={true}>
              <Table borderStyle={styles.table}>
                <Row
                  data={tableHead}
                  style={styles.rowsHead}
                  textStyle={styles.text}
                  widthArr={[ww, ww, ww, ww]}
                />
                <Rows
                  data={tableData}
                  style={styles.rowsContent}
                  textStyle={styles.itemContent}
                  widthArr={[ww, ww, ww, ww]}
                />
              </Table>
            </ScrollView>
          </View>
          <Text
            footnote
            style={{
              color: BaseColor.titleColor,
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            Showing 0 of 0 results
          </Text>
        </ScrollView>
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
