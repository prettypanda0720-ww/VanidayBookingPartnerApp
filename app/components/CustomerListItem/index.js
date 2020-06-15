import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text, Icon} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {BaseStyle, BaseColor, BaseSetting} from '@config';

export default class CustomerListItem extends Component {
  displaySubNameView(subName) {
    if (subName != '') {
      return (
        <Text
          footnote
          semibold
          numberOfLines={1}
          style={{color: BaseColor.titleColor}}>
          Email: {subName}
        </Text>
      );
    }
  }
  displayDescriptionView(description) {
    if (description != '') {
      return (
        <Text
          footnote
          numberOfLines={2}
          style={{paddingRight: 20, color: BaseColor.titleColor}}>
          Address: {description}
        </Text>
      );
    }
  }
  displayImageView(image, styleThumb) {
    if (image != '') {
      return <Image source={image} style={[styles.thumb, styleThumb]} />;
    }
  }
  displayRightContentView(rightContent) {
    if (rightContent != '') {
      return (
        <Text
          headline
          semibold
          numberOfLines={1}
          style={{marginRight: 20, color: BaseColor.titleColor}}>
          {rightContent}
        </Text>
      );
    }
  }
  render() {
    const {
      style,
      image,
      styleThumb,
      onPress,
      name,
      subName,
      description,
      gender,
      contactNo,
      rightContent,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.contentCenter}>
            {this.displayImageView(image, styleThumb)}
          </View>
          <View style={styles.contentCenter}>
            <Text
              headline
              semibold
              numberOfLines={1}
              style={{color: BaseColor.sectionColor}}>
              Name: {name}
            </Text>
            <Text
              footnote
              numberOfLines={1}
              style={{color: BaseColor.sectionColor}}>
              Gender: {gender == null ? 'Not Assigned' : gender}
            </Text>
            <Text
              footnote
              numberOfLines={1}
              style={{color: BaseColor.sectionColor}}>
              contactNo: {contactNo}
            </Text>
            <View>{this.displaySubNameView(subName)}</View>
            <View>{this.displayDescriptionView(description)}</View>
          </View>
        </View>
        <View style={[styles.contentCenter, {flexDirection: 'row'}]}>
          {this.displayRightContentView(rightContent)}
          <Icon name="angle-right" size={20} color={BaseColor.grayColor} />
        </View>
      </TouchableOpacity>
    );
  }
}

CustomerListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  subName: PropTypes.string,
  description: PropTypes.string,
  gender: PropTypes.string,
  contactNo: PropTypes.string,
  rightContent: PropTypes.string,
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

CustomerListItem.defaultProps = {
  image: '',
  name: '',
  subName: '',
  description: '',
  gender: '',
  rightContent: '',
  contactNo: '',
  styleThumb: {},
  onPress: () => {},
  style: {},
};
