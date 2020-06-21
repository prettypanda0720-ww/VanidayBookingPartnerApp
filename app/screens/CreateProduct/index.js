import React, {Component} from 'react';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  SectionedMultiSelect,
  Image,
} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import ImagePicker from 'react-native-image-picker';
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
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, GreenColor, BaseSetting, Images} from '@config';
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
      updatePhotoLoading: false,
      id: '',
      sku: '',
      name: '',
      type_id: '',
      price: '',
      special_price: '',
      description: '',
      short_description: '',
      status: false,
      is_featured: '',
      subMenuList: [],
      selectedItems: [],
      image_type: '',
      image_name: '',
      image_base64_content: null,
      avatarSource: null,
      thumbnail: '',
    };
  }

  onChangedPrice(text) {
    this.setState({
      price: text.replace(/[^0-9]/g, ''),
    });
  }

  onChangedSpecialPrice(text) {
    this.setState({
      special_price: text.replace(/[^0-9]/g, ''),
    });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };
  /**
   * @description Call when reminder option switch on/off
   */
  toggleProductSwitch = (value) => {
    this.setState({status: value});
  };

  toggleFeaturedSwitch = (value) => {
    this.setState({is_featured: value});
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let filepath = {uri: response.uri};
        // You can also display the image using data:
        // let source = {uri: 'data:image/jpeg;base64,' + response.data};
        // console.log('type', response.type);
        this.setState({
          image_type: response.type,
          image_name: response.fileName,
          avatarSource: response.uri,
          image_base64_content: response.data,
        });
      }
    });
  }

  createProductPhoto() {
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    const {id, sku, image_name, image_base64_content, image_type} = this.state;
    const data = {
      thumbInfo: {
        position: 1,
        type: image_type,
        base64_encoded_data: image_base64_content,
        name: image_name,
      },
      sku: sku,
    };
    const tpdata = {
      thumbInfo: {
        position: 1,
        type: image_type,
        // base64_encoded_data: image_base64_content,
        name: image_name,
      },
      sku: sku,
    };
    console.log('createProductPhoto is called!', tpdata);
    this.setState({updatePhotoLoading: true});
    myAppointmentsSvc
      .createProductThumb(token, data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          this.setState({
            updatePhotoLoading: false,
            image_base64_content: null,
            // deleteFlag: true,
          });
          Utils.shortNotifyMessage('Product Photo is successfully added!');
          navigation.goBack();
          // console.log('product detail', res_profile.data);
        }
      })
      .catch((error) => {
        Utils.shortNotifyMessage(error);
        console.log('appointment error');
        console.log(error);
      });
  }

  componentDidMount() {
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
      'Do you really want to delete product?',
      [
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
      token: auth.user.data,
      sku: sku,
      product_id: id,
    };
    console.log('delete product list', data);
    if (auth.user.data !== undefined) {
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
    const {
      name,
      sku,
      price,
      special_price,
      selectedItems,
      description,
      short_description,
      status,
      is_featured,
    } = this.state;
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
      token: auth.user.data,
      sku: sku,
      productInfo: {
        product_name: name,
        price: price,
        category_ids: selItemsStr,
        short_description: short_description,
        description: description,
        special_price: special_price,
        status: status ? 1 : 2,
        is_featured: is_featured ? 1 : 0,
        sku: sku,
      },
    };
    console.log('create product list', data);
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .createProductList(data)
        .then((response) => {
          const res_profile = response.data;
          console.log('create product list data', res_profile);
          if (res_profile.code == 0) {
            Utils.shortNotifyMessage('Creating Product is successfully done!');
            this.setState({saveLoading: false});
            // navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('Creating product error');
          console.log(error);
        });
    }
    if (this.state.image_base64_content !== null) {
      this.createProductPhoto();
    }
  };

  icon = ({name, size = 18, style}) => {
    let iconComponent;
    const Search = (
      <Icon
        name="search"
        size={15}
        color={BaseColor.titleColor}
        style={{paddingLeft: 10}}
      />
    );
    const Down = (
      <Icon name="angle-down" size={15} color={BaseColor.titleColor} />
    );
    const Up = <Icon name="angle-up" size={15} color={BaseColor.titleColor} />;
    const Close = <Icon name="times" size={10} color={BaseColor.titleColor} />;
    const Check = (
      <Icon name="check" size={10} color={GreenColor.darkPrimaryColor} />
    );
    const Cancel = <Icon name="times" size={20} color={BaseColor.whiteColor} />;

    switch (name) {
      case 'search':
        iconComponent = Search;
        break;
      case 'keyboard-arrow-up':
        iconComponent = Up;
        break;
      case 'keyboard-arrow-down':
        iconComponent = Down;
        break;
      case 'close':
        iconComponent = Close;
        break;
      case 'check':
        iconComponent = Check;
        break;
      case 'cancel':
        iconComponent = Cancel;
        break;
      default:
        iconComponent = null;
        break;
    }
    return <View style={styles}>{iconComponent}</View>;
  };

  displayContentView() {
    const {navigation} = this.props;
    const {
      dataLoading,
      // subMenuList,
      deleteLoading,
      saveLoading,
      subMenuList,
    } = this.state;
    console.log('selectedItems', this.state.selectedItems);
    // const subMenuList = this.props.navigation.state.params.subMenuList;
    // console.log('subMenuList', subMenuList);
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
            style={BaseStyle.headerStyle}
          />
          <ScrollView style={styles.mainWrapper}>
            <Text headline style={[styles.headerTitle, {marginTop: 20}]}>
              Product Image
            </Text>
            <Image
              source={{uri: this.state.avatarSource}}
              style={styles.blockImage}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.uploadBtnWrapper}
                onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.uploadBtnStyle}>Select Product Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.inputGroup, {marginTop: 20}]}>
              <Text style={BaseStyle.label}>Product Name</Text>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({name: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Price</Text>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.onChangedPrice(text)}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                value={this.state.price}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Special Price</Text>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.onChangedSpecialPrice(text)}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                value={this.state.special_price}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>SKU</Text>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) => this.setState({sku: text})}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Short Description</Text>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={(text) =>
                  this.setState({short_description: text})
                }
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>Description</Text>
              <TextInput
                style={[BaseStyle.textInput, BaseStyle.multilineTextInput]}
                onChangeText={(text) => this.setState({description: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                multiline={true}
              />
            </View>
            <View style={styles.profileItem}>
              <Text style={BaseStyle.label}>Enable Service</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleProductSwitch}
                value={this.state.status}
              />
            </View>
            <View style={styles.profileItem}>
              <Text style={BaseStyle.label}>Is Featured</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleFeaturedSwitch}
                value={this.state.is_featured == 1 ? true : false}
              />
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
              showCancelButton={true}
              styles={{
                button: {backgroundColor: BaseColor.SecondColor, height: 55},
                cancelButton: {
                  backgroundColor: BaseColor.grayColor,
                  height: 55,
                },
              }}
              iconRenderer={this.icon}
            />
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
            title="Create Product"
            renderRight={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.blackColor} />
              );
            }}
            onPressRight={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
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
