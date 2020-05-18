import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Icon, Text, StarRating} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {BaseColor} from '@config';

export default class ProfileDetail extends Component {
  render() {
    const {
      style,
      image,
      styleLeft,
      styleThumb,
      styleRight,
      onPress,
      textFirst,
      point,
      textSecond,
      textThird,
      icon,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={[styles.contentLeft, styleLeft]}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View>{this.displayImageView(image, styleThumb)}</View>
            <View>{this.displayProfileView()}</View>
          </View>
          <View>
            <Text
              headline
              semibold
              numberOfLines={1}
              style={styles.sectionStyle}>
              {textFirst}
            </Text>
            <Text
              body2
              style={{
                marginTop: 3,
                paddingRight: 10,
              }}
              numberOfLines={1}
              style={styles.sectionStyle}>
              {textSecond}
            </Text>
            <Text
              footnote
              grayColor
              numberOfLines={1}
              style={styles.sectionStyle}>
              {textThird}
            </Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 3,
              }}>
              <StarRating
                disabled={true}
                starSize={15}
                maxStars={5}
                rating={5}
                selectedStar={(rating) => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                caption2
                style={{
                  color: 'rgba(0,0,0,0.65)',
                }}>
                ({4})
              </Text>
            </View>
          </View>
        </View>
        {icon && (
          <View style={[styles.contentRight, styleRight]}>
            <Icon name="angle-right" size={18} color={'rgba(0,0,0,0.65)'} />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  displayProfileView() {
    if (this.props.point != '') {
      return (
        <View style={styles.point}>
          <Text overline whiteColor semibold>
            {this.props.point}
          </Text>
        </View>
      );
    }
  }

  displayImageView(image, styleThumb) {
    if (this.props.image != '') {
      return <Image source={image} style={[styles.thumb, styleThumb]} />;
    }
  }
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetail.defaultProps = {
  image: '',
  textFirst: '',
  textSecond: '',
  icon: true,
  point: '',
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
