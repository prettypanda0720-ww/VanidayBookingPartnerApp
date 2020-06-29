import React, {Component} from 'react';
import {View, ScrollView, FlatList, TextInput} from 'react-native';
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {withNavigation} from 'react-navigation';
import {CheckBox} from 'react-native-elements';
import * as Utils from '@utils';
import styles from './styles';

class EditOpeningHours extends Component {
  constructor(props) {
    super();
    this.state = {
      saveLoading: false,
      loading: false,
      openingHours: [],
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onSave() {
    this.setState({saveLoading: true});
    const {auth, navigation} = this.props;
    let newOpeningHours = this.state.openingHours.map((item, index) => {
      if (item.checked == true) {
        return {
          hours: '',
          weekName: item.weekName,
        };
      } else {
        return {
          hours: item.hours,
          weekName: item.weekName,
        };
      }
    });
    const postData = {
      token: auth.user.data,
      openingHour: newOpeningHours,
    };
    console.log('updateOpeninghour', postData);
    if (auth.user.data !== undefined) {
      myAppointmentsSvc
        .updateOpeningHour(postData)
        .then((response) => {
          const res_profile = response.data;
          console.log('res_profile', res_profile);
          if (res_profile.code == 0) {
            this.setState({saveLoading: false});
            Utils.shortNotifyMessage('OpeningHours is successfully updated!');
            navigation.goBack();
          } else {
            this.setState({saveLoading: false});
            Utils.shortNotifyMessage('Updating Openinghours error!');
          }
        })
        .catch((error) => {
          this.setState({saveLoading: false});
          Utils.shortNotifyMessage(
            'Error occured while communcating with server',
          );
          console.log('openinghour error');
          console.log(error);
        });
    }
  }

  componentDidMount() {
    const {auth, navigation} = this.props;
    const data = this.props.navigation.state.params.data;
    let newArray = [];
    newArray = data.map((item, index) => {
      return {
        checked: item.hours === '' ? true : false,
        ...item,
      };
    });
    this.setState({openingHours: newArray});
    console.log('openinghours', newArray);
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

  applyCheckedStatus(weekName) {
    let dataTmp = this.state.openingHours.map((item, index) => {
      if (weekName === item.weekName) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    console.log(weekName);
    console.log(dataTmp);
    this.setState({openingHours: dataTmp});
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
          style={BaseStyle.headerStyle}
        />
        <ScrollView>
          <FlatList
            data={openingHours}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View style={styles.itemWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    bold
                    style={{
                      color: BaseColor.SecondColor,
                      fontSize: 18,
                      flex: 2,
                    }}>
                    {item.weekName}
                  </Text>
                  <CheckBox
                    center
                    title="Closed"
                    iconLeft
                    containerStyle={{
                      backgroundColor: BaseColor.whiteColor,
                      borderColor: BaseColor.whiteColor,
                    }}
                    checkedColor={BaseColor.SecondColor}
                    uncheckedColor={BaseColor.grayColor}
                    checked={item.checked}
                    fontFamily={FontFamily.default}
                    textStyle={{fontWeight: 'normal', fontSize: 15}}
                    onPress={() => {
                      this.applyCheckedStatus(item.weekName);
                    }}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.workingTimeWrapper}>
                    <Text
                      headline
                      semibold
                      style={{color: BaseColor.blackColor, flex: 1}}>
                      Working Time
                    </Text>
                    <TextInput
                      style={[
                        !item.checked
                          ? styles.enableTextInput
                          : styles.disableTextInput,
                      ]}
                      onChangeText={(text) =>
                        this.chanegWorkingTimes(index, text)
                      }
                      autoCorrect={false}
                      placeholder=""
                      placeholderTextColor={BaseColor.titleColor}
                      selectionColor={BaseColor.titleColor}
                      editable={!item.checked}>
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
            Cancel
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={this.state.saveLoading}
            onPress={() => this.onSave()}>
            Save
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
