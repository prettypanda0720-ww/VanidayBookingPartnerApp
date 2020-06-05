import React, {Component} from 'react';
import {View, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';

export default class OpeningHours extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      openingHours: [],
      dataLoading: true,
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  componentDidMount() {
    const {auth, navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      const data = this.props.navigation.state.params.data;
      this.setState({openingHours: data, dataLoading: false});
    });
  }

  render() {
    const {navigation} = this.props;
    const {loading, openingHours} = this.state;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Opening Hours"
          renderLeft={() => {
            return (
              <Icon name="angle-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          renderRight={() => {
            return (
              <Icon name="ellipsis-h" size={15} color={BaseColor.blackColor} />
            );
          }}
          onPressRight={() => {
            this.showActionSheet();
          }}
          style={styles.headerStyle}
        />
        <ScrollView>
          <FlatList
            data={openingHours}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <Text bold style={{color: BaseColor.SecondColor, fontSize: 18}}>
                  {item.weekName}
                </Text>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      headline
                      semibold
                      style={{color: BaseColor.blackColor}}>
                      Working Time
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        headline2
                        semibold
                        style={{color: BaseColor.grayColor}}>
                        {item.hours}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={BaseColor.sectionColor}
            style={styles.loading}
            animating={this.state.dataLoading}
          />
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={''}
          options={['Edit Opening hours', 'Close']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => {
            switch (index) {
              case 0:
                navigation.navigate('EditOpeningHours', {data: openingHours});
                break;
            }
          }}
        />
      </SafeAreaView>
    );
  }
}
