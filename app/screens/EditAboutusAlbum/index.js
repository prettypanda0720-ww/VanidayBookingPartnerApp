import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {myAppointmentsSvc} from '@services';
import {bindActionCreators} from 'redux';
import {AuthActions} from '@actions';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {withNavigation} from 'react-navigation';
import {BaseStyle, BaseColor} from '@config';
import * as Utils from '@utils';
import styles from './styles';

class EditAboutusAlbum extends Component {
  state = {
    dataLoading: true,
    deleteLoading: false,
    saveLoading: false,
    photos: [],
    data: [],
  };

  componentDidMount() {
    const {auth, navigation} = this.props;
    const token = auth.user.token;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      myAppointmentsSvc
        .fetchProfileData(token)
        .then((response) => {
          const res_profile = response.data.data;
          console.log('EditAboutUSAlbum', res_profile);
          if (response.data.data !== undefined) {
            let photosDataTmp = [];
            if (res_profile.vendor_carousel !== null) {
              photosDataTmp = JSON.parse(res_profile.vendor_carousel).map(
                (photo, index) => ({
                  image_index: index,
                  image_name: res_profile.venCarPrefix + photo,
                }),
              );
            }
            this.setState({
              data: photosDataTmp,
              dataLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log('appointment error');
          console.log(error);
        });
    });
  }

  renderItem = ({item, index, move, moveEnd, isActive}) => {
    // console.log('item.image_name', item.image_name);
    return (
      <TouchableOpacity
        style={styles.imageWrapper}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Image
          key={index}
          source={{uri: item.image_name}}
          style={styles.blockImage}
        />
      </TouchableOpacity>
    );
  };

  onPhotoUpdate = () => {
    const {auth, navigation} = this.props;
    const token = auth.user.token;
    console.log('---------Middle photos data-------------', this.state.data);
    // reset position of images
    let pos = 0;
    let photosDataTmp = this.state.data.map((d, index) => ({
      position: pos++,
      image_index: d.image_index,
    }));

    let postData = {carousel: photosDataTmp};
    console.log(
      '---------------------Final photos data-------------',
      postData,
    );
    if (Object.keys(photosDataTmp).length > 0) {
      this.setState({saveLoading: true});
      myAppointmentsSvc
        .updateCarouselPosition(token, postData)
        .then((response) => {
          const res_profile = response.data;
          if (res_profile.code == 0) {
            this.setState({saveLoading: false});
            Utils.shortNotifyMessage(
              'Business photos are successfully reordered!',
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
  };

  displayContentView() {
    const {navigation} = this.props;
    if (!this.state.dataLoading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Images Order"
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
            style={BaseStyle.headerStyle}
          />
          <Text subhead style={{padding: 10}}>
            if you wanna to change photo's order, please drag and drop photo.
          </Text>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({data}) => this.setState({data})}
          />
          <View style={styles.btnWrapper}>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={this.state.deleteLoading}
              onPress={() => this.onDelete()}>
              Cancel
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              loading={this.state.saveLoading}
              onPress={() => this.onPhotoUpdate()}>
              Save
            </Button>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{top: 'always'}}>
          <Header
            title="Edit Images Order"
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
            style={BaseStyle.headerStyle}
          />
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
  connect(mapStateToProps, mapDispatchToProps)(EditAboutusAlbum),
);
