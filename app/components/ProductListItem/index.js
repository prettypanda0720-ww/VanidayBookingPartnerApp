/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Button} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class ProductListItem extends Component {
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
      barcode,
      sku,
      brand,
      category,
      description,
      enableretail,
      retailprice,
      specialprice,
      istax,
      enablecommision,
      enablestock,
      supplyprice,
      initialstock,
      supplier,
      reorderpoint,
      reorderqty,
      rate,
      numReviews,
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
              color={BaseColor.MainPrimaryColor}
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
            <View style={[{flex: 1}, styles.contentCenter]}>
              <Text
                headline
                bold
                numberOfLines={1}
                style={{marginTop: 5, color: BaseColor.sectionColor}}>
                {title}
              </Text>
            </View>
            <View style={[styles.contentCartPromotion, styles.contentCenter]}>
              <Button style={styles.btnPromotion}>
                <Text
                  body2
                  style={{textDecorationLine: 'line-through', color: BaseColor.titleColor}}>
                  &nbsp;SGD&nbsp;{retailprice}&nbsp;
                </Text>
                <Text body1 primaryColor bold>
                  &nbsp;&nbsp;SGD&nbsp;{specialprice}
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.blockContentAddress}>
            <View style={{width: '50%'}}>
              <Text footnote blackColor numberOfLines={2} style={{color: BaseColor.titleColor}}>
                {brand}
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
                selectedStar={(rating) => {}}
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

ProductListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  barcode: PropTypes.string,
  sku: PropTypes.string,
  brand: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  enableretail: PropTypes.string,
  retailprice: PropTypes.number,
  specialprice: PropTypes.number,
  istax: PropTypes.string,
  enablecommision: PropTypes.string,
  enablestock: PropTypes.nunber,
  supplyprice: PropTypes.number,
  initialstock: PropTypes.number,
  supplier: PropTypes.string,
  reorderpoint: PropTypes.number,
  reorderqty: PropTypes.number,
  rate: PropTypes.number,
  numReviews: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

ProductListItem.defaultProps = {
  style: {},
  image: '',
  title: '',
  barcode: '',
  sku: '',
  brand: '',
  category: '',
  description: '',
  enableretail: 'false',
  retailprice: 0,
  specialprice: 0,
  istax: '',
  enablecommision: 'false',
  enablestock: '',
  supplyprice: 0,
  initialstock: 0,
  supplier: 0,
  reorderpoint: 0,
  reorderqty: 0,
  rate: 0,
  numReviews: 0,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};
