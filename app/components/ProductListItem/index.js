/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Button} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import * as Utils from '@utils';

export default class ProductListItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  /**
   * Display hotel item as block
   */
  renderBlock() {
    const {style, image, title, specialprice, onPress} = this.props;
    console.log(image);
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={{uri: image}} style={styles.blockImage} />
          {/* <View style={styles.priceContent}>
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
          </View> */}
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text
                subhead
                bold
                numberOfLines={1}
                style={{marginTop: 5, color: BaseColor.sectionColor}}>
                Name :
              </Text>
            </View>
            <View>
              <Text
                subhead
                bold
                numberOfLines={2}
                style={{marginTop: 5, color: BaseColor.sectionColor}}>
                {title}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text
                subhead
                bold
                numberOfLines={1}
                style={{marginTop: 5, color: BaseColor.sectionColor}}>
                Price :
              </Text>
            </View>
            <View>
              <Text subhead primaryColor bold>
                &nbsp;&nbsp;SGD&nbsp;{Utils.to2DigitDeciaml(specialprice)}
              </Text>
            </View>
          </View>
          {/* <View style={[styles.contentCartPromotion, styles.contentCenter]}>
              <Button style={styles.btnPromotion}> */}
          {/* <Text
                  body2
                  style={{textDecorationLine: 'line-through', color: BaseColor.titleColor}}>
                  &nbsp;SGD&nbsp;{retailprice}&nbsp;
                </Text> */}

          {/* </Button>
            </View>
          <View style={styles.blockContentAddress}></View> */}
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
  sku: PropTypes.string,
  specialprice: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

ProductListItem.defaultProps = {
  style: {},
  image: '',
  title: '',
  sku: '',
  specialprice: 0,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};
