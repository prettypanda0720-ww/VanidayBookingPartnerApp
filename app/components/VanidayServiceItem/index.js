import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Tag} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class VanidayServiceItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, image, name, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.girdContent, styles.contentCenter, style]}>
        <View style={[styles.girdImage, styles.contentCenter]}>
          <View style={styles.contentCenter}>
            <Icon name={image} size={35} style={styles.image} />
          </View>
          <View style={styles.contentCenter}>
            <Text
              body2
              bold
              style={{
                marginTop: 10,
                color: 'rgba(0,0,0,0.65)'
              }}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

VanidayServiceItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.string,
  name: PropTypes.string,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

VanidayServiceItem.defaultProps = {
  style: {},
  image: '',
  name: '',
  onPress: () => {},
  onPressTag: () => {},
};
