import React, {Component} from 'react';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  SectionedMultiSelect,
} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import styles from './styles';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      loading: false,
      dataLoading: true,
      saveloading: false,
      id: '',
      sku: '',
      name: '',
      type_id: '',
      price: '',
      description: '',
      short_description: '',
      is_featured: '',
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

  componentDidMount() {
    const {navigation} = this.props;
    const sku = this.props.navigation.state.params.sku;
    const data = {
      sku: sku,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      myAppointmentsSvc
        .productDetail(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            console.log('product detail', res_profile.data);
            this.setState({
              id: res_profile.data.id,
              sku: res_profile.data.sku,
              name: res_profile.data.name,
              type_id: res_profile.data.type_id,
              price: res_profile.data.price,
              description: res_profile.data.description,
              short_description: res_profile.data.short_description,
              is_featured: res_profile.data.is_featured,
              selectedItems: res_profile.data.category_ids.map(
                (item, index) => {
                  console.log(item, index);
                  return parseInt(item);
                },
              ),
              dataLoading: false,
            });
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('appointment error');
          console.log(error);
        });
    });
  }

  checkInput() {
    const {name, price, selectedItems} = this.state;

    if (name.length === 0) {
      Utils.shortNotifyMessage('Product Name is required!');
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

  onDelete = () => {
    Alert.alert(
      'Delete Product',
      'Do you really delete product?',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteApply(),
        },
      ],
      {cancelable: false},
    );
  };

  deleteApply() {
    this.setState({deleteLoading: true});
    const {id, sku} = this.state;
    const {navigation} = this.props;
    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      sku: sku,
      product_id: id,
    };
    console.log('delete product list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .deleteProductList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage('Deleting Product is successfully done!');
            this.setState({deleteLoading: false});
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('Deleting product error');
          console.log(error);
        });
    }
  }
  
  onSave = () => {
    if (!this.checkInput()) {
      return;
    }
    this.setState({saveLoading: true});
    const {name, sku, price, selectedItems, description} = this.state;
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
      sku: sku,
      productInfo: {
        product_name: name,
        price: price,
        category_ids: selItemsStr,
        description: description,
      },
    };
    console.log('update product list', data);
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .updateProductList(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('update product list data', res_profile);
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage('Updating Product is successfully done!');
            this.setState({saveLoading: false});
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('Updating product error');
          console.log(error);
        });
    }
  };

  displayContentView() {
    const {navigation} = this.props;
    const {
      dataLoading,
      // subMenuList,
      deleteLoading,
      saveLoading,
      id,
      sku,
      name,
      type_id,
      price,
      description,
      short_description,
      is_featured,
    } = this.state;
    console.log('selectedItems', this.state.selectedItems);
    const subMenuList = this.props.navigation.state.params.subMenuList;
    console.log('subMenuList', subMenuList);
    if (!dataLoading) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Product"
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
                onChangeText={(text) => this.setState({name: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {name}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text body2 style={{color: BaseColor.sectionColor}}>
                Price
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({price: text})}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.MainPrimaryColor}
                selectionColor={BaseColor.primaryColor}>
                {price}
              </TextInput>
            </View>
            <SectionedMultiSelect
              items={subMenuList}
              uniqueKey="id"
              subKey="subcategory"
              selectText="Select Categories..."
              showDropDowns={true}
              readOnlyHeadings={false}
              loading={false}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              showChips={false}
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
                multiline={true}>
                {description}
              </TextInput>
            </View>
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={deleteLoading}
              onPress={() => this.onDelete()}>
              Delete
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
            title="Edit Product"
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
  connect(mapStateToProps, mapDispatchToProps)(EditProduct),
);
