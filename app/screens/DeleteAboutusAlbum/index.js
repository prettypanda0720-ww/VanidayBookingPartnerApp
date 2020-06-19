import React, {Component} from 'react';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {Checkbox} from 'react-native-material-ui';
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import * as Utils from '@utils';
import styles from './styles';

class DeleteAboutusAlbum extends Component {
  state = {
    deleteLoading: false,
    saveLoading: false,
    isAllChecked: false,
    photos: [],
    data: [],
  };

  applyCheckedStatus(key) {
    let dataTmp = this.state.data.map((d, index) => {
      if (key == index) {
        return {
          ...d,
          checked: true,
        };
      } else {
        return {
          ...d,
          checked: false,
        };
      }
    });
    this.setState({data: dataTmp});
  }

  applyCheckedAllStatus() {
    const {isAllChecked} = this.state;
    let dataTmp = this.state.data.map((d, index) => {
      return {
        ...d,
        checked: !d.checked,
      };
    });
    this.setState({data: dataTmp, isAllChecked: !isAllChecked});
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      const photosData = this.props.navigation.state.params.photos;
      console.log('photosData', photosData);
      let photosDataTmp = photosData.map((d, index) => ({
        key: index,
        label: d,
        checked: false,
      }));
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({data: photosDataTmp});
    });
  }

  onDelete() {
    const {isAllChecked, data} = this.state;
    const {auth, navigation} = this.props;
    const token = auth.user.token;
    if (isAllChecked) {
      this.setState({deleteLoading: true});
      myAppointmentsSvc
        .deleteCarouselAll(token)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({deleteLoading: false});
            Utils.shortNotifyMessage(
              'All business photos are successfully deleted!',
            );
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('update photo error');
          console.log(error);
        });
    } else {
      let delPos = null;
      data.forEach((element) => {
        if (element.checked) {
          delPos = element.key;
          return;
        }
      });
      console.log('checkedItem', delPos);
      if (delPos == null) {
        Utils.shortNotifyMessage('Please select the item you wanna delete.');
        return;
      }
      this.setState({deleteLoading: true});
      myAppointmentsSvc
        .deleteCarouselById(token, delPos)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({deleteLoading: false});
            Utils.shortNotifyMessage(
              delPos + 1 + 'th photos has been successfully deleted!',
            );
            navigation.goBack();
          }
        })
        .catch((error) => {
          Utils.shortNotifyMessage(error);
          console.log('update photo error');
          console.log(error);
        });
    }
  }

  renderItem = ({item, index, move, moveEnd, isActive}) => {
    console.log('item.label', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Image
          key={index}
          source={{uri: item.label}}
          style={styles.blockImage}
        />
        <Checkbox
          label=""
          value="agree"
          checked={item.checked}
          onCheck={() => this.applyCheckedStatus(item.key)}
        />
      </View>
    );
  };

  render() {
    console.log('PhotoAlbumsData', this.state.data);
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Delete Photos"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.sectionColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          // renderRight={() => {
          //   return (
          //     <Checkbox
          //       label="All"
          //       value="agree"
          //       checked={this.state.isAllChecked}
          //       onCheck={() => this.applyCheckedAllStatus()}
          //     />
          //   );
          // }}
          // onPressRight={() => {
          //   navigation.goBack();
          // }}
          style={BaseStyle.headerStyle}
        />
        <View style={styles.profileItem}>
          <Text caption1 style={{flex: 10}}>
            if you wanna to delete all photos, please check this
          </Text>
          <Checkbox
            label=""
            value="agree"
            style={{width: 20, flex: 1}}
            checked={this.state.isAllChecked}
            onCheck={() => this.applyCheckedAllStatus()}
          />
        </View>

        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => {
            item.key;
          }}
        />
        <View style={styles.btnWrapper}>
          <Button
            style={{flex: 1, marginLeft: 10}}
            // loading={this.state.deleteLoading}
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
          <Button
            style={{flex: 1, marginLeft: 10}}
            loading={this.state.deleteLoading}
            onPress={() => this.onDelete()}>
            Delete
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
  connect(mapStateToProps, mapDispatchToProps)(DeleteAboutusAlbum),
);
