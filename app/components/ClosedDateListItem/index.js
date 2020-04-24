import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Icon, Text, StarRating} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {BaseColor} from '@config';

export default class ClosedDateListItem extends Component {
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
      reason,
      long,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={[styles.contentLeft, styleLeft]}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={image} style={[styles.thumb, styleThumb]} />
            <View style={styles.point}>
              <Text overline whiteColor semibold>
                {this.props.point}
              </Text>
            </View>
          </View>
          <View>
            <Text headline bold numberOfLines={1}>
              {textFirst}
            </Text>
            <Text
              body2
              semibold
              style={{
                marginTop: 3,
                paddingRight: 10,
              }}
              numberOfLines={1}>
              {textSecond}
            </Text>
            <View style={styles.listContentRate}>
              <Text
                caption1
                grayColor
                semibold
                style={{
                  marginRight: 3,
                }}>
                {reason}
              </Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text headline primaryColor semibold>
            {long} days
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ClosedDateListItem.propTypes = {
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
  reason: PropTypes.string,
  long: PropTypes.string,
};

ClosedDateListItem.defaultProps = {
  image: '',
  textFirst: '',
  textSecond: '',
  icon: true,
  point: '',
  reason: '',
  long: '',
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
