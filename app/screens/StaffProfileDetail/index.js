import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, FontFamily} from '@config';
import {withNavigation} from 'react-navigation';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import MultiSelect from 'react-native-multiple-select';
import {Dropdown} from 'react-native-material-dropdown';
import * as Utils from '@utils';
import styles from './styles';

class StaffProfileDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      deleteLoading: false,
      saveLoading: false,
      staff_id: '',
      staff_full_name: '',
      staff_gender: '',
      // staff_skill_level: '',
      staff_joined_date: '',
      staff_status: '',
      productTypes: [],
      selectedItems: [],
      modalCalendarVisible: false,
      markedDates: {
        [this.getCurrentDate()]: {selected: true, marked: false},
      },
      modalTimeVisible: false,
    };
  }

  getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    return year + '-' + month + '-' + date;
  }

  openCalendarModal() {
    this.setState({
      modalCalendarVisible: true,
    });
  }

  checkInput() {
    const {
      staff_full_name,
      staff_title,
      staff_gender,
      // staff_skill_level,
      staff_joined_date,
      staff_status,
      selectedItems,
    } = this.state;

    if (staff_full_name.length === 0) {
      Utils.shortNotifyMessage('Staff Name is required!');
      return false;
    }
    if (staff_title.length === 0) {
      Utils.shortNotifyMessage('Staff Title is required!');
      return false;
    }
    if (staff_gender.length === 0) {
      Utils.shortNotifyMessage('Staff gender is required!');
      return false;
    }
    if (selectedItems.length === 0) {
      Utils.shortNotifyMessage('Please select service categories!');
      return false;
    }
    // if (staff_skill_level.length === 0) {
    //   Utils.shortNotifyMessage('Skill is required!');
    //   return false;
    // }
    if (staff_joined_date.length === 0) {
      Utils.shortNotifyMessage('Joined Date is required!');
      return false;
    }
    if (staff_status.length === 0) {
      Utils.shortNotifyMessage('Status is required!');
      return false;
    }
    return true;
  }

  onSave = () => {
    if (this.checkInput()) {
      this.setState({saveLoading: true});
      const {
        staff_id,
        staff_full_name,
        staff_title,
        staff_gender,
        // staff_skill_level,
        staff_joined_date,
        staff_status,
        selectedItems,
      } = this.state;
      const {navigation} = this.props;
      const {auth} = this.props;
      let customSelectedItems = [];
      customSelectedItems = selectedItems.map((element) => {
        return {entity_id: element};
      });
      console.log('customSelectedItems', customSelectedItems);
      const data = {
        token: auth.user.token,
        staffInfo: {
          staff_id: staff_id,
          staff_full_name: staff_full_name,
          staff_title: staff_title,
          staff_gender: staff_gender,
          // staff_skill_level: staff_skill_level,
          staff_joined_date: staff_joined_date,
          staff_status: staff_status,
          product_ids: customSelectedItems,
        },
      };
      console.log('update staff list', data);
      if (auth.user.token !== undefined) {
        myAppointmentsSvc
          .updateStaffList(data)
          .then((response) => {
            const res_profile = response.data;
            if (res_profile.code == 0) {
              Utils.shortNotifyMessage('Adding Staff is successfully done!');
              this.setState({saveLoading: false});
              navigation.goBack();
            }
          })
          .catch((error) => {
            Utils.shortNotifyMessage(error);
            console.log('appointment error');
            console.log(error);
          });
      }
    }
  };

  onDelete = () => {
    this.setState({deleteLoading: true});
    const {staff_id} = this.state;
    const {navigation} = this.props;

    const {auth} = this.props;
    const data = {
      token: auth.user.token,
      staffId: staff_id,
    };
    if (auth.user.token !== undefined) {
      myAppointmentsSvc
        .deleteStaffList(data)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({deleteLoading: false});
            Utils.shortNotifyMessage('Staff is successfully removed!');
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('delete staff error!');
          console.log(error);
        });
    }
  };

  componentDidMount() {
    const data = this.props.navigation.state.params.data;
    // console.log('data.selItems', data);
    let selItems = data.product_ids.map((item, index) => {
      return item.entity_id;
    });
    console.log('data.selItems', selItems);
    const productTypes = this.props.navigation.state.params.productTypes;
    console.log('productTypes', productTypes);
    this.setState({
      staff_id: data.staff_id,
      staff_full_name: data.staff_full_name,
      staff_title: data.staff_title,
      staff_gender: data.staff_gender,
      // staff_skill_level: data.staff_skill_level,
      staff_joined_date: data.staff_joined_date,
      staff_status: data.staff_status,
      selectedItems: selItems,
      productTypes: productTypes,
    });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };

  getGenderName(key) {
    let name = '';
    switch (parseInt(key)) {
      case 0:
        name = 'Not Specified';
        break;
      case 1:
        name = 'Male';
        break;
      case 2:
        name = 'Female';
        break;
    }
    return name;
  }

  getGenderKey(value) {
    let key = '';
    switch (value) {
      case 'Male':
        key = 1;
        break;
      case 'Female':
        key = 2;
        break;
      case 'Not Specified':
        key = 0;
        break;
    }
    return key;
  }

  setBookingDate(day) {
    this.setState({
      markedDates: {
        [day.dateString]: {selected: true, marked: false},
      },
    });
    this.markedDates = day.dateString;
    console.log('marketDates', this.markedDates);
  }

  onDateApply() {
    console.log('marketDates-onDateApply()', this.markedDates);
    if (this.markedDates !== undefined) {
      let shortDate = Utils.getFormattedShortDate(new Date(this.markedDates));
      this.setState({staff_joined_date: shortDate});
    } else {
      this.setState({staff_joined_date: this.getCurrentDate()});
    }
  }

  render() {
    const {navigation} = this.props;
    const {
      deleteLoading,
      saveLoading,
      productTypes,
      staff_full_name,
      staff_title,
      staff_gender,
      // staff_skill_level,
      staff_joined_date,
      staff_status,
      selectedItems,
      modalCalendarVisible,
      markedDates,
    } = this.state;
    // console.log('selectedItems', selectedItems);
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Staff Profile"
          renderRight={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.sectionColor} />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Full Name
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({staff_full_name: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {staff_full_name}
              </TextInput>
            </View>
            <View style={styles.inputGroup}>
              <Text caption3 style={{color: BaseColor.secondBlackColor}}>
                Title
              </Text>
              <TextInput
                style={[BaseStyle.textInput, styles.textInput]}
                onChangeText={(text) => this.setState({staff_title: text})}
                autoCorrect={false}
                placeholder=""
                placeholderTextColor={BaseColor.titleColor}
                selectionColor={BaseColor.titleColor}>
                {staff_title}
              </TextInput>
            </View>
            <Dropdown
              label="Gender"
              data={[
                {value: 'Not Specified'},
                {value: 'Male'},
                {value: 'Female'},
              ]}
              rippleOpacity={0.7}
              baseColor={BaseColor.secondBlackColor}
              tintColor={BaseColor.blackColor}
              style={{color: BaseColor.blackColor}}
              value={this.getGenderName(staff_gender)}
              onChangeText={(value) => {
                this.setState({
                  staff_gender: this.getGenderKey(value),
                });
              }}
            />
            {/* <Dropdown
              label="Skill Level"
              data={[
                {value: '1'},
                {value: '2'},
                {value: '3'},
                {value: '4'},
                {value: '5'},
              ]}
              rippleOpacity={0.7}
              baseColor={BaseColor.secondBlackColor}
              tintColor={BaseColor.blackColor}
              style={{color: BaseColor.blackColor}}
              value={staff_skill_level}
              onChangeText={(value) => {
                this.setState({
                  staff_skill_level: value,
                });
              }}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {/* <View style={{flex: 1}}>
                <Text headline style={{color: BaseColor.secondBlackColor}}>
                  Joined Date
                </Text>
              </View> */}
              <Modal
                isVisible={modalCalendarVisible}
                backdropColor="rgba(0, 0, 0, 0.5)"
                backdropOpacity={1}
                animationIn="fadeIn"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
                <View style={styles.contentModal}>
                  <View style={styles.contentCalendar}>
                    <Calendar
                      style={{
                        borderRadius: 8,
                      }}
                      markedDates={markedDates}
                      current={this.getCurrentDate()}
                      minDate={this.getCurrentDate()}
                      maxDate={'2099-12-31'}
                      onDayPress={(day) => this.setBookingDate(day)}
                      monthFormat={'MMMM yyyy '}
                      onMonthChange={(month) => {
                        console.log('month changed', month);
                      }}
                      theme={{
                        textSectionTitleColor: BaseColor.textPrimaryColor,
                        selectedDayBackgroundColor: BaseColor.primaryColor,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: BaseColor.primaryColor,
                        dayTextColor: BaseColor.textPrimaryColor,
                        textDisabledColor: BaseColor.grayColor,
                        dotColor: BaseColor.primaryColor,
                        selectedDotColor: '#ffffff',
                        arrowColor: BaseColor.primaryColor,
                        monthTextColor: BaseColor.textPrimaryColor,
                        textDayFontFamily: FontFamily.default,
                        textMonthFontFamily: FontFamily.default,
                        textDayHeaderFontFamily: FontFamily.default,
                        textMonthFontWeight: 'bold',
                        textDayFontSize: 14,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 14,
                      }}
                    />
                    <View style={styles.contentActionCalendar}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({modalCalendarVisible: false});
                        }}>
                        <Text body1>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({modalCalendarVisible: false});
                          this.onDateApply();
                        }}>
                        <Text body1 primaryColor>
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.dateInfo}
                onPress={() => this.openCalendarModal()}>
                {/* <Text headline light style={{color: BaseColor.sectionColor}}>
                  Joined Date
                </Text> */}
                <Text headline semibold>
                  {Utils.getFormattedLongDate(
                    Utils.getDateFromDate(staff_joined_date),
                  )}
                  {/* {Utils.getDateFromDate(staff_joined_date)} */}
                </Text>
              </TouchableOpacity>
            </View>
            <Dropdown
              label="Status"
              data={[{value: 'Inactive'}, {value: 'Active'}]}
              rippleOpacity={0.7}
              baseColor={BaseColor.secondBlackColor}
              tintColor={BaseColor.blackColor}
              style={{color: BaseColor.blackColor}}
              value={staff_status == 0 ? 'Inactive' : 'Active'}
              onChangeText={(value) => {
                this.setState({
                  staff_status: value == 'Inactive' ? 0 : 1,
                });
              }}
            />
            <View style={{flex: 1, marginTop: 10}}>
              <MultiSelect
                hideTags
                items={productTypes}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Select Services"
                searchInputPlaceholderText="Search Services..."
                onChangeInput={(text) => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor={BaseColor.titleColor}
                tagBorderColor={BaseColor.titleColor}
                tagTextColor={BaseColor.titleColor}
                selectedItemTextColor={BaseColor.titleColor}
                selectedItemIconColor={BaseColor.titleColor}
                itemTextColor="#000"
                displayKey="product_name"
                searchInputStyle={{color: BaseColor.titleColor}}
                submitButtonColor={BaseColor.titleColor}
                submitButtonText="Submit"
              />
              <View>
                {/* {this.multiselect
                  ? this.multiSelect.getSelectedItemsExt(selectedItems)
                  : null} */}
                {this.multiSelect &&
                  this.multiSelect.getSelectedItemsExt &&
                  this.multiSelect.getSelectedItemsExt(selectedItems)}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 0, padding: 20, flexDirection: 'row'}}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={deleteLoading}
            onPress={() => this.onDelete()}>
            DELETE
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={saveLoading}
            onPress={() => this.onSave()}>
            UPDATE
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
  connect(mapStateToProps, mapDispatchToProps)(StaffProfileDetail),
);
