/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {FlatList, RefreshControl, View, Animated} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  ECardListItem,
  FilterSort,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';

// Load sample data
import {ECardData} from '@data';

export default class EcardList extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    // Temp data define
    this.state = {
      refreshing: false,
      loading: false,
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
      eCardData: ECardData,
    };

    this.onFilter = this.onFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
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
    const {eCardData, refreshing, clampedScroll} = this.state;
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
          data={eCardData}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <ECardListItem
              block
              image={item.image}
              title={item.title}
              comment={item.comment}
              price={item.price}
              orgPrice={item.orgPrice}
              rate={item.rate}
              numReviews={item.numReviews}
              services={item.services}
              style={{
                marginBottom: 10,
              }}
              onPress={() => navigation.navigate('EcardDetail')}
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
      </View>
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="eCard"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="search" size={20} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('SearchHistory');
          }}
        />
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}
