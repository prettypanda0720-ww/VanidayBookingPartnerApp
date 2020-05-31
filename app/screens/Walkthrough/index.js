import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {View, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {Text, Button, Image} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, Images} from '@config';
import * as Utils from '@utils';
import LinearGradient from 'react-native-linear-gradient';

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      slide: [
        {
          key: 1,
          image: Images.profile1,
          title: 'Post a job if you want any help',
        },
        {key: 2, image: Images.profile2, title: 'Find helpers near around'},
        {key: 3, image: Images.profile3, title: 'Pay to your helpers'},
        {
          key: 4,
          image: Images.profile4,
          title: 'Rate your helpers and get feedback from them',
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#5574F7', '#60C3FF']}
        style={{flex: 1}}>
        <StatusBar hidden={true} />
        <ScrollView
          style={styles.contain}
          scrollEnabled={this.state.scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight),
            })
          }>
          {/* <View style={styles.wrapper}> */}
          {/* Images Swiper */}
          <Swiper
            containerStyle={styles.wrapper}
            dotStyle={{
              backgroundColor: BaseColor.textSecondaryColor,
            }}
            activeDotColor={BaseColor.primaryColor}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}>
            {this.state.slide.map((item, index) => {
              return (
                <View style={styles.slide} key={item.key}>
                  <Image source={item.image} style={styles.img} />
                  <Text body1 whiteColor style={styles.textSlide}>
                    {item.title}
                  </Text>
                </View>
              );
            })}
          </Swiper>
          {/* </View> */}
          <View style={styles.buttonGroup}>
            {/* <Button
              full
              style={{
                backgroundColor: BaseColor.navyBlue,
                marginTop: 20,
              }}
              onPress={() => {}}>
              Login with Facebook
            </Button> */}
            <Button
              full
              style={{marginTop: 20}}
              loading={this.state.loading}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Button>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text body1 fieldColor>
                  Don't have an account? <Text darkBlueColor>Sign up.</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
