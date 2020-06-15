/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Button} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class ECardListItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  /**
   * Display hotel item as block
   */
  renderBlock() {
    const {
      style,
      image,
      title,
      comment,
      rate,
      numReviews,
      price,
      orgPrice,
      onPress,
    } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          <View style={styles.priceContent}>
            <Text title3 whiteColor semibold>
              -17%
            </Text>
          </View>
          <View style={styles.iconContent}>
            <Icon
              name="heart"
              size={30}
              color={BaseColor.SecondColor}
              solid
            />
          </View>
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flex: 1}}>
              <Text headline bold numberOfLines={1} style={{marginTop: 5, color: 'rgba(0,0,0,0.65)'}}>
                {title}
              </Text>
            </View>
            <View style={styles.contentCartPromotion}>
              <Button style={styles.btnPromotion}>
                <Text
                  body2
                  whiteColor
                  style={{textDecorationLine: 'line-through'}}>
                  {price}
                  {'  '}
                </Text>
                <Text body1 whiteColor>
                  {orgPrice}
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.blockContentAddress}>
            <View style={{width: '50%'}}>
              <Text caption1 grayColor numberOfLines={2}>
                {comment}
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
                rating={rate}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                caption2
                style={{
                  color: BaseColor.textPrimaryColor,
                }}>
                ({numReviews})
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    let {block, grid} = this.props;
    return this.renderBlock();
  }
}

ECardListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  comment: PropTypes.string,
  rate: PropTypes.number,
  numReviews: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

ECardListItem.defaultProps = {
  style: {},
  image: '',
  title: '',
  comment: '',
  rate: 0,
  rateCount: '',
  numReviews: 0,
  onPress: () => {},
  onPressTag: () => {},
};
