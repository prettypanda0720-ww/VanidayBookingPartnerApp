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

class EditProduct extends Component {
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
      deleteFlag: false,
    };
  }

  onChangedPrice(text) {
    this.setState({
      price: text.replace(/[^0-9]/g, ''),
    });
  }

  onChangedSpecialPrice(text) {
    console.log('onChangedSpecialPrice', text);
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

  deleteProductPhoto() {
    Alert.alert(
      'Delete Photo',
      'Do you really want to delete photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.onDeleteProductPhoto(),
        },
      ],
      {cancelable: false},
    );
  }

  onDeleteProductPhoto() {
    // this.setState({deleteLoading: true});
    const {thumbnail, sku} = this.state;
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    const data = {
      sku: sku,
      thumbInfo: {
        id: thumbnail.id,
      },
    };
    myAppointmentsSvc
      .deleteProductThumb(token, data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          Utils.shortNotifyMessage('Deleting Photo is successfully done!');
          // this.setState({avatarSource: null, deleteFlag: false});
          navigation.goBack();
        }
      })
      .catch((error) => {
        Utils.shortNotifyMessage(error);
        console.log('Deleting product error');
        console.log(error);
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

  updateProductPhoto() {
    const {auth, navigation} = this.props;
    const token = auth.user.data;
    const {
      id,
      sku,
      image_name,
      image_base64_content,
      image_type,
      thumbnail,
    } = this.state;
    const data = {
      thumbInfo: {
        id: thumbnail.id,
        position: thumbnail.position,
        type: image_type,
        base64_encoded_data: image_base64_content,
        name: image_name,
      },
      sku: sku,
      entryId: id,
    };
    const tpdata = {
      thumbInfo: {
        id: thumbnail.id,
        position: thumbnail.position,
        type: image_type,
        // base64_encoded_data: image_base64_content,
        name: image_name,
      },
      sku: sku,
      entryId: id,
    };
    console.log('updateProductPhoto is called!', tpdata);
    this.setState({updatePhotoLoading: true});
    myAppointmentsSvc
      .updateProductThumb(token, data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          this.setState({
            updatePhotoLoading: false,
            image_base64_content: null,
          });
          Utils.shortNotifyMessage('Product Photo is successfully updated!');
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

  fetchProductDetail() {
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
              special_price: res_profile.data.special_price,
              description: res_profile.data.description,
              short_description: res_profile.data.short_description,
              is_featured: res_profile.data.is_featured == 1 ? true : false,
              status: res_profile.data.status == 1 ? true : false,
              selectedItems: res_profile.data.category_ids.map(
                (item, index) => {
                  console.log(item, index);
                  return parseInt(item);
                },
              ),
              dataLoading: false,
              thumbnail: res_profile.data.thumbnail,
              avatarSource:
                res_profile.data.thumbnail.thumbnail_url !== undefined
                  ? res_profile.data.thumbnail.thumbnail_url
                  : '',
              deleteFlag:
                res_profile.data.thumbnail.thumbnail_url !== undefined
                  ? true
                  : false,
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

  componentDidMount() {
    this.fetchProductDetail();
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
      // this.onDeleteProductPhoto();
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
    console.log('update product list', data);
    if (auth.user.data !== undefined) {
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
      id,
      sku,
      name,
      type_id,
      price,
      special_price,
      description,
      short_description,
      is_featured,
      thumbnail,
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
            style={BaseStyle.headerStyle}
          />
          <ScrollView style={styles.mainWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
              }}>
              <Text headline style={styles.headerTitle}>
                Product Image
              </Text>
              <TouchableOpacity
                onPress={() => this.deleteProductPhoto()}
                disabled={this.state.deleteFlag ? false : true}>
                <Icon
                  name="trash"
                  size={20}
                  color={
                    this.state.deleteFlag
                      ? BaseColor.SecondColor
                      : BaseColor.titleColor
                  }
                />
              </TouchableOpacity>
            </View>
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
                style={[styles.uploadBtnWrapper, {marginRight: 5}]}
                onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.uploadBtnStyle}>Select Product Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.image_base64_content == null
                    ? [
                        styles.uploadBtnWrapper,
                        {marginLeft: 10, backgroundColor: BaseColor.grayColor},
                      ]
                    : [styles.uploadBtnWrapper, {marginLeft: 5}]
                }
                onPress={
                  this.state.thumbnail.thumbnail_url !== undefined
                    ? this.updateProductPhoto.bind(this)
                    : this.createProductPhoto.bind(this)
                }
                disabled={
                  this.state.image_base64_content == null ? true : false
                }>
                <Text style={styles.uploadBtnStyle}>Upload Product Photo</Text>
                {this.state.updatePhotoLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={BaseColor.whiteColor}
                    style={{paddingLeft: 5}}
                  />
                ) : null}
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
                selectionColor={BaseColor.primaryColor}>
                {name}
              </TextInput>
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
                value={this.state.price.toString()}
                keyboardType={'numeric'}
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
                keyboardType={'numeric'}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={BaseStyle.label}>SKU</Text>
              <TextInput
                style={BaseStyle.textInput}
                // onChangeText={(text) => this.setState({special_price: text})}
                autoCorrect={false}
                placeholder="$0.00"
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={BaseColor.primaryColor}
                editable={false}>
                {sku}
              </TextInput>
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
                selectionColor={BaseColor.primaryColor}>
                {short_description}
              </TextInput>
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
                multiline={true}>
                {description}
              </TextInput>
            </View>
            <View style={styles.profileItem}>
              <Text body1 style={styles.sectionStyle}>
                Enable Service
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleProductSwitch}
                value={this.state.status}
              />
            </View>
            <View style={styles.profileItem}>
              <Text body1 style={styles.sectionStyle}>
                Is Featured
              </Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleFeaturedSwitch}
                value={is_featured == 1 ? true : false}
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
              // showRemoveAll={false}
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
            title="Edit Product"
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
  connect(mapStateToProps, mapDispatchToProps)(EditProduct),
);
