import React, {Component} from 'react';
import {View, ScrollView, FlatList, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import styles from './styles';

class EditOpeningHours extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      openingHours: [],
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  componentDidMount() {
    const {auth, navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    const data = this.props.navigation.state.params.data;
    this.setState({openingHours: data});
    // });
  }

  chanegWorkingTimes(key, value) {
    console.log('key', key);
    console.log('value', value);
    const {openingHours} = this.state;
    let result = [];
    result = openingHours.map((item, index) => {
      if (index == key) {
        item['hours'] = value;
      }
      return item;
    });
    this.setState({openingHours: result});
  }

  onSave() {
    // const {auth, navigation} = this.props;
    // const data = {
    //   token: auth.user.token,
    //   vendorData: {
    //     openingHour: this.state.openingHours,
    //   },
    // };
    // if (auth.user.token !== undefined) {
    //   myAppointmentsSvc
    //     .updateOpeningHours(data)
    //     .then((response) => {
    //       const res_profile = response.data.data;
    //       if (response.data.data != undefined) {
    //         Utils.notifyMessage('Openinghours is successfully updated!');
    //       }
    //     })
    //     .catch((error) => {
    //       Utils.notifyMessage('Error occured while communcating with server');
    //       console.log('appointment error');
    //       console.log(error);
    //     });
    // }
  }

  render() {
    const {navigation} = this.props;
    const {loading, openingHours} = this.state;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Edit Opening Hours"
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
          <FlatList
            data={openingHours}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View style={styles.itemWrapper}>
                <Text bold style={{color: BaseColor.SecondColor, fontSize: 18}}>
                  {item.weekName}
                </Text>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.workingTimeWrapper}>
                    <Text
                      headline
                      semibold
                      style={{color: BaseColor.blackColor, flex: 1}}>
                      Working Time
                    </Text>
                    <TextInput
                      style={[BaseStyle.textInput, styles.textInput, {flex: 2}]}
                      onChangeText={(text) =>
                        this.chanegWorkingTimes(index, text)
                      }
                      autoCorrect={false}
                      placeholder=""
                      placeholderTextColor={BaseColor.titleColor}
                      selectionColor={BaseColor.titleColor}>
                      {item.hours}
                    </TextInput>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => navigation.goBack()}>
            CANCEL
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={loading}
            onPress={() => this.onSave()}>
            SAVE
          </Button>
        </View>
      </SafeAreaView>
    );
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
  connect(mapStateToProps, mapDispatchToProps)(EditOpeningHours),
);
