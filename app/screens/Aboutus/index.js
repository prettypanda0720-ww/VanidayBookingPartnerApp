import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import {BaseStyle, BaseColor, BaseSetting, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  Image,
  DealCategoryItem,
  StarRating,
} from '@components';
import styles from './styles';

export default class Aboutus extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {shopData, loading} = this.state;
    const data = this.props.navigation.state.params.data;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="About US"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
                size={20}
                color={BaseColor.blackColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>
            <Image source={Images.salon} style={styles.blockImage} />
            <View style={styles.priceContent}>
                <Text title3 textPrimaryColor semibold>
                58%
                </Text>
            </View>
            <View style={styles.iconContent}>
                <Icon
                name="heart"
                size={30}
                color={BaseColor.MainPrimaryColor}
                solid
                />
            </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
        <View
            style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            }}>
            <View style={{width: '50%'}}>
            <Text headline bold numberOfLines={1} style={{marginTop: 5}}>
                {data.name}
            </Text>
            </View>
        </View>
        <View style={styles.blockContentAddress}>
            <View style={{width: '50%'}}>
            <Text caption1 grayColor numberOfLines={2}>
                {data.address}
            </Text>
            </View>
            <View
            style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}>
            <StarRating
                disabled={true}
                starSize={20}
                maxStars={5}
                rating={5}
                selectedStar={(rating) => {}}
                fullStarColor={BaseColor.yellowColor}
            />
            <Text
                caption2
                style={{
                color: BaseColor.textPrimaryColor,
                }}>
                ({4})
            </Text>
            </View>
        </View>
        </View>
        <View style={styles.contentService}>
            <Text caption1>
              In Italian, "Covo" means a hiding place. When you come to our
              salon, you will experience a private and relaxing space and time.
              All the stylists are experienced Japanese stylists with Japanese
              quality service. Our location is on the happening Keong Saik road,
              on the ground floor in a shop house. We try out best to cater
              damage-free hair using in-house developed chemicals(developed in
              Tokyo by our owner stylist) for colouring, pem, rebonding and
              treatment. We also have Keratin treatment for damaged hair as
              well. For the best result for both hair and scalp, we use
              carbonated water in the salon. Please come to experience quality
              technique and service to Covo.
            </Text>
          </View>
      </SafeAreaView>
    );
  }
}
