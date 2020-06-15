import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {withNavigation} from 'react-navigation';
import {
  View,
  Animated,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  ProfileDescription,
  CustomerListItem,
} from '@components';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import * as Utils from '@utils';
import styles from './styles';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      search: '',
      refreshing: false,
      ourTeam: [
        {
          image: Images.profile2,
          subName: '',
          name: 'Kondo Ieyasu',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile3,
          subName: '',
          name: 'Yeray Rosales',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile5,
          subName: '',
          name: 'Alf Huncoot',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
        {
          image: Images.profile4,
          subName: '',
          name: 'Chioke Okonkwo',
          screen: 'ClientProfile',
          description: 'riverstar1992@gmail.com',
        },
      ],
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
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView, {flexDirection: 'column'}]}
          forceInset={{top: 'always'}}>
          <Header
            title="Clients"
            // renderRight={() => {
            //   return (
            //     <Icon name="bell" size={20} color={BaseColor.secondBlackColor} />
            //   );
            // }}
            // onPressRight={() => {
            //   navigation.navigate('Notification');
            // }}
            style={styles.headerStyle}
          />
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
                description={item.customerAddr}
                name={item.customerName}
                subName={item.customerEmail}
                gender={item.customerGender}
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
          style={[BaseStyle.safeAreaView]}
          forceInset={{top: 'always'}}>
          <Header
            title="Clients"
            // renderRight={() => {
            //   return (
            //     <Icon name="times" size={20} color={BaseColor.blackColor} />
            //   );
            // }}
            // onPressRight={() => {
            //   navigation.goBack();
            // }}
            style={styles.headerStyle}
          />
          <View style={styles.loadingContainer}>
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
    const {auth} = this.props;
    const data = {
      token: auth.user.token,
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
        Utils.shortNotifyMessage(error);
        console.log('appointment error');
        console.log(error);
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
