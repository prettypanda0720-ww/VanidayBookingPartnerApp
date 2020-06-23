import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {myAppointmentsSvc} from '@services';
import {withNavigation} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  StaffProfileListItem,
  Text,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';

class StaffMembers extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      productTypes: [],
      staffList: [],
    };
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    const data = {
      token: auth.user.data,
    };
    this.focusListener = navigation.addListener('didFocus', () => {
      if (auth.user.data !== undefined) {
        myAppointmentsSvc
          .getStaffList(data)
          .then((response) => {
            const res_profile = response.data;
            if (res_profile.code == 0) {
              this.setState({staffList: res_profile.data, loading: false});
              console.log('staffList', res_profile.data);
            }
          })
          .catch((error) => {
            this.setState({loading: false});
          });
        myAppointmentsSvc
          .getAllServiceList(data)
          .then((response) => {
            const res_profile = response.data;
            console.log('getAllServiceList', response.data);
            if (res_profile.code == 0) {
              this.setState({productTypes: res_profile.data});
            }
          })
          .catch((error) => {
            this.setState({loading: false});
          });
      }
    });
  }

  displayContentView() {
    const {navigation} = this.props;
    const {loading, staffList, productTypes} = this.state;
    if (loading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Staff Members"
            renderLeft={() => {
              return (
                <Icon
                  name="angle-left"
                  size={20}
                  color={BaseColor.blackColor}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            style={BaseStyle.headerStyle}
          />
          <View style={BaseStyle.loadingContainer}>
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
      if (staffList.length > 0) {
        return (
          <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{top: 'always'}}>
            <Header
              title="Staff Members"
              renderLeft={() => {
                return (
                  <Icon
                    name="angle-left"
                    size={20}
                    color={BaseColor.blackColor}
                  />
                );
              }}
              onPressLeft={() => {
                navigation.goBack();
              }}
              style={BaseStyle.headerStyle}
            />
            <ScrollView style={styles.membersWrapper}>
              {staffList.map((item, index) => {
                return (
                  <StaffProfileListItem
                    staff_id={item.staff_id}
                    staff_full_name={item.staff_full_name}
                    staff_gender={item.staff_gender}
                    // staff_skill_level={item.staff_skill_level}
                    // staff_joined_date={Utils.getDateFromDate(
                    //   item.staff_joined_date,
                    // )}
                    staff_status={item.staff_status}
                    product_ids={item.product_ids}
                    seller_id={item.seller_id}
                    create_at={item.create_at}
                    updated_at={item.updated_at}
                    staff_title={item.staff_title}
                    style={styles.memberItemWrapper}
                    styleThumb={styles.staffThumb}
                    onPress={() =>
                      navigation.navigate('StaffProfileDetail', {
                        data: item,
                        productTypes: productTypes,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
            <View style={styles.floatingBtn}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CreateStaff', {
                    productTypes: productTypes,
                  })
                }
                style={styles.button}
                activeOpacity={0.8}>
                <Image style={styles.image} source={Images.icons_create} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView
            style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
            forceInset={{top: 'always'}}>
            <Header
              title="Staff Members"
              renderLeft={() => {
                return (
                  <Icon
                    name="angle-left"
                    size={20}
                    color={BaseColor.blackColor}
                  />
                );
              }}
              onPressLeft={() => {
                navigation.goBack();
              }}
              style={BaseStyle.headerStyle}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                There are no staffs to show.
              </Text>
              <View style={styles.floatingBtn}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CreateStaff', {
                      productTypes: productTypes,
                    })
                  }
                  style={styles.button}
                  activeOpacity={0.8}>
                  <Image style={styles.image} source={Images.icons_create} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      }
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
  connect(mapStateToProps, mapDispatchToProps)(StaffMembers),
);
