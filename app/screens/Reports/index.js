import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

export default class Reports extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  gotoScreen(route) {
    const {navigation} = this.props;
    if (route == 'goback') {
      navigation.goBack();
    } else {
      navigation.navigate(route);
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          this.gotoScreen(item.screen);
        }}>
        <Text body1 style={{color: BaseColor.sectionColor}}>
          {item.title}
        </Text>
        <Icon
          name="angle-right"
          size={18}
          color={BaseColor.sectionColor}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    let finances = [
      {title: 'Finances summary', screen: ''},
      {title: 'Payments summary', screen: 'PaymentsSummary'},
      {title: 'Payments log', screen: 'PaymentsLog'},
      {title: 'Taxes summary', screen: 'TaxesSummary'},
      {title: 'Tips collected', screen: 'TipsCollected'},
      {title: 'Discount summary', screen: 'DisplaySummary'},
      {title: 'Outstanding invoices', screen: 'OutstandingInvoices'},
    ];
    let sales = [
      {title: 'Sales by item', screen: 'SalesByItem'},
      {title: 'Sales by type', screen: 'SalesByType'},
      {title: 'Sales by service', screen: 'SalesByService'},
      {title: 'Sales by product', screen: 'SalesByProduct'},
      {title: 'Sales by location', screen: 'SalesByLocation'},
      {title: 'Sales by channel', screen: 'SalesByChannel'},
      {title: 'Sales by client', screen: 'SalesByClient'},
      {title: 'Sales by staff breakdown', screen: 'SalesByStaffBreakdown'},
      {title: 'Sales by staff', screen: 'SalesByStaff'},
      {title: 'Sales by hour', screen: 'SalesByHour'},
      {title: 'Sales by hour of day', screen: 'SalesByHourOfDay'},
      {title: 'Sales by day', screen: 'SalesByDay'},
      {title: 'Sales by month', screen: 'SalesByMonth'},
      {title: 'Sales by quarter', screen: 'SalesByQuarter'},
      {title: 'Sales by year', screen: 'SalesByYear'},
      {title: 'Sales by log', screen: 'SalesByLog'},
    ];
    let vouchers = [
      {title: 'Vouchers outstanding balance', screen: ''},
      {title: 'Vouchers sales', screen: ''},
      {title: 'Vouchers redemptions', screen: ''},
    ];
    let appointments = [
      {title: 'Appointments list', screen: ''},
      {title: 'Appointments summary', screen: ''},
      {title: 'Appointments cancellations', screen: ''},
    ];
    let clients = [
      {title: 'Clients list', screen: ''},
      {title: 'Clients retention', screen: ''},
    ];
    let staffs = [
      {title: 'Staff working hours', screen: ''},
      {title: 'Tips by staff', screen: ''},
      {title: 'Staff commision summary', screen: ''},
      {title: 'Staff commision detailed', screen: ''},
    ];
    let inventorys = [
      {title: 'Stock on hand', screen: ''},
      {title: 'Product sales performance', screen: ''},
      {title: 'Stock movement log', screen: ''},
      {title: 'Stock movement summary', screen: ''},
      {title: 'Product consumption', screen: ''},
    ];
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Reports"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Finances
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              Monitor your overall finances including sales, refunds, taxes,
              payments and more
            </Text>
            <FlatList
              data={finances}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Sales
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              Analyse the performance of your business by comparing sales across
              products, staff, channels and more
            </Text>
            <FlatList
              data={sales}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Vouchers
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              Track your total outstanding liability as well as voucher sales
              and redemption activity.
            </Text>
            <FlatList
              data={vouchers}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Appointments
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              View projected revenues of upcoming appointments, track
              cancellation rates and reasons
            </Text>
            <FlatList
              data={appointments}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Clients
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              Gain insights into how clients interact with your business and who
              your top spendors are
            </Text>
            <FlatList
              data={clients}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Staff
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              View your team's performance, hours worked as well as commision
              and tip earnings
            </Text>
            <FlatList
              data={staffs}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.reportWrapper}>
            <Text title2 bold style={{color: BaseColor.sectionColor}}>
              Inventory
            </Text>
            <Text
              caption1
              numberOfLines={2}
              style={{color: BaseColor.titleColor}}>
              Monitor product stock levels and adjustment made,analyse product
              sales performance, consumption costs and more
            </Text>
            <FlatList
              data={inventorys}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          {/* </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
