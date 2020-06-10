import React, {Component} from 'react';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      dataLoading: true,
      saveloading: false,
      product_name: '',
      sku: '',
      price: '',
      description: '',
      subMenuList: [],
      selectedItems: [],
    };
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };
  /**
   * @description Call when reminder option switch on/off
   */
  toggleRetailSwitch = (value) => {
    this.setState({retailReminders: value});
  };

  toggleStockSwitch = (value) => {
    this.setState({stockReminders: value});
  };

  checkInput() {
    const {product_name, sku, price, selectedItems} = this.state;

    if (product_name.length === 0) {
      Utils.shortNotifyMessage('Product Name is required!');
      return false;
    }
    if (sku.length === 0) {
      Utils.shortNotifyMessage('SKU is required!');
      return false;
    }
    if (selectedItems.length === 0) {
      Utils.shortNotifyMessage('Categories is required!');
      return false;
    }
    if (price.length === 0) {
      Utils.shortNotifyMessage('Price is required!');
      return false;
    }
    return true;
  }

  onChanged(text) {
    this.setState({
      price: text.replace(/[^0-9]/g, ''),
    });
  }

  onSave = () => {
    if (!this.checkInput()) {
      return;
    }
    this.setState({saveLoading: true});
    const {product_name, sku, price, selectedItems, description} = this.state;
    const {navigation} = this.props;
    let selItemsStr = '';
    const count = selectedItems.length;
    if (count > 0) {
      selItemsStr = selectedItems[0];
      for (let index = 1; index < count; index++) {
        selItemsStr += ',' + selectedItems[index];
      }
    }
    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      productInfo: {
        product_name: product_name,
        sku: sku,
        price: price,
        category_ids: selItemsStr,
        description: description,
      },
    };
    console.log('create product list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .createProductList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage('Creating Product is successfully done!');
            this.setState({saveLoading: false});
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('creating product error');
          console.log(error);
        });
    }
  };

  componentDidMount() {
    const {auth} = this.props;
    myAppointmentsSvc
      .getProductCategory()
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          this.setState({
            subMenuList: res_profile.data,
            dataLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log('submenulist error');
        console.log(error);
      });
  }

  displayContentView() {
    const {navigation} = this.props;
    const {dataLoading, subMenuList, loading, saveLoading} = this.state;
    if (!dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Create Product"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <ScrollView style={styles.mainWrapper}>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Product Name
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({product_name: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                SKU
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({sku: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.onChanged(text)}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
                keyboardType={'numeric'}
              />
            </View>
            <SectionedMultiSelect
              items={subMenuList}
              uniqueKey="id"
              subKey="subcategory"
              selectText="Select Products..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
            />
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Description
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.multilineTextInput]}
                onChangeText={(text) => this.setState({description: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}
                multiline={true}
              />
            </View>
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={loading}
              onPress={() => this.goBack()}>
              Cancel
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={saveLoading}
              onPress={() => this.onSave()}>
              Save
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Create Product"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={styles.headerStyle}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(CreateProduct),
);
