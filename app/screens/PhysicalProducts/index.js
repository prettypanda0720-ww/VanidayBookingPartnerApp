/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  RefreshControl,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  ProductListItem,
  FilterSort,
} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {withNavigation} from 'react-navigation';
import styles from './styles';
import * as Utils from '@utils';

// Load sample data
import {ProductsData} from '@data';

class PhysicalProducts extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    // Temp data define
    this.state = {
      refreshing: false,
      loading: true,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        40,
      ),
      productsData: ProductsData,
      subMenuList: [],
    };

    this.onFilter = this.onFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    const data = {
      token: auth.user.token,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      if (auth.user.token !== undefined) {
        myAppointmentsSvc
          .getProductList(data)
          .then((response) => {
            const res_profile = response.data;
            if (res_profile.code == 0) {
              this.setState({productsData: res_profile.data, loading: false});
            }
          })
          .catch((error) => {
            console.log('appointment error');
            console.log(error);
          });
      }
    });
    const postData = {
      token: auth.user.token,
    };
    myAppointmentsSvc
      .getSubMenuByMerchant(postData)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          console.log('sub menu datalist', res_profile.data);
          this.setState({
            subMenuList: res_profile.data,
          });
        }
      })
      .catch((error) => {
        Utils.notifyMessage(error);
        console.log('appointment error');
        console.log(error);
      });
  }

  onChangeSort() {}

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  onFilter() {
    const {navigation} = this.props;
    navigation.navigate('Filter');
  }

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  renderContent() {
    const {productsData, refreshing, clampedScroll, subMenuList} = this.state;
    const {navigation} = this.props;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={productsData}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <ProductListItem
              block
              image={item.img}
              title={item.product_name}
              sku={item.sku}
              specialprice={item.product_price}
              style={{
                marginBottom: 10,
              }}
              onPress={() =>
                // navigation.navigate('PhysicalProductProfile', {data: item})
                navigation.navigate('EditProduct', {
                  sku: item.sku,
                  subMenuList: subMenuList,
                })
              }
            />
          )}
        />
        <Animated.View
          style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
          <FilterSort
            onChangeSort={this.onChangeSort}
            onFilter={this.onFilter}
          />
        </Animated.View>
        <View style={styles.floatingBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProduct')}
            style={styles.button}
            activeOpacity={0.8}>
            <Image style={styles.image} source={Images.icons_create} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  displayContentView() {
    const {loading} = this.state;
    const {navigation} = this.props;
    if (!loading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Products"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.sectionColor}
                />
              );
            }}
            renderRight={() => {
              return (
                <Icon name="search" size={20} color={BaseColor.sectionColor} />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              navigation.navigate('SearchHistory');
            }}
            style={styles.headerStyle}
          />
          {this.renderContent()}
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.loading}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Products"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.sectionColor}
                />
              );
            }}
            renderRight={() => {
              return (
                <Icon name="search" size={20} color={BaseColor.sectionColor} />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              navigation.navigate('SearchHistory');
            }}
            style={styles.headerStyle}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.loading}
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
  connect(mapStateToProps, mapDispatchToProps)(PhysicalProducts),
);
