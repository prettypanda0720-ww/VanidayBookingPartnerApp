import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import {
  View,
  Animated,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Header, SafeAreaView, CustomerListItem, Text} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import * as Utils from '@utils';
import styles from './styles';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      search: '',
      refreshing: false,
      clientList: [],
    };
    this.growAnimated = new Animated.Value(0);
  }

  render() {
    return <View style={{flex: 1}}>{this.displayContentView()}</View>;
  }

  displayContentView() {
    const {navigation} = this.props;
    const {search, screen} = this.state;
    if (!this.state.dataLoading) {
      if (this.state.clientList.length > 0) {
        return (
          <SafeAreaView
            style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
            forceInset={{top: 'always'}}>
            <Header title="Clients" style={BaseStyle.headerStyle} />
            {/* <View style={{padding: 20}}>
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
            </View> */}
            {this.state.clientList.map((item, index) => {
              return (
                <CustomerListItem
                  style={{marginTop: 10}}
                  key={'service' + index}
                  image={item.image}
                  // description={item.customerAddr}
                  name={item.customerName}
                  subName={item.customerEmail}
                  // gender={item.customerGender}
                  contactNo={item.contactNo}
                  onPress={() =>
                    navigation.navigate('ClientProfile', {
                      clientId: item.customerId,
                    })
                  }
                />
              );
            })}
            {/* <View style={styles.floatingBtn}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateClient')}
                style={styles.button}
                activeOpacity={0.8}>
                <Image style={styles.image} source={Images.icons_create} />
              </TouchableOpacity>
            </View> */}
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView
            style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
            forceInset={{top: 'always'}}>
            <Header title="Clients" style={BaseStyle.headerStyle} />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text title3 style={{color: BaseColor.sectionColor}}>
                There are no clients to show.
              </Text>
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header title="Clients" style={BaseStyle.headerStyle} />
          <View style={BaseStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={BaseColor.sectionColor}
              style={styles.loading}
              animating={this.state.dataLoading}
            />
          </View>
        </SafeAreaView>
      );
    }
  }

  componentDidMount() {
    console.log('clients is called!');
    const {auth} = this.props;
    const data = {
      token: auth.user.data,
    };
    myAppointmentsSvc
      .fetchClientList(data)
      .then((response) => {
        const res_profile = response.data;
        if (res_profile.code == 0) {
          console.log('product detail', res_profile.data);
          this.setState({clientList: res_profile.data, dataLoading: false});
        }
      })
      .catch((error) => {
        this.setState({dataLoading: false});
        Utils.shortNotifyMessage('Some errors occured during communication');
      });
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
  connect(mapStateToProps, mapDispatchToProps)(Clients),
);
