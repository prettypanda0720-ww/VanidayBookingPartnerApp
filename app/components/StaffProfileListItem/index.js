import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon, Text, StarRating} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {BaseColor} from '@config';

export default class StaffProfileListItem extends Component {

  getGenderName(key) {
    let name = '';
    switch (parseInt(key)) {
      case 0:
        name = 'Not Specified';
        break;
      case 1:
        name = 'Male';
        break;
      case 2:
        name = 'Female';
        break;
    }
    return name;
  }

  render() {
    const {
      style,
      styleLeft,
      styleThumb,
      styleRight,
      onPress,
      icon,
      staff_id,
      staff_full_name,
      staff_gender,
      staff_skill_level,
      staff_joined_date,
      staff_status,
      product_ids,
      seller_id,
      create_at,
      updated_at,
      staff_title,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={[styles.contentLeft, styleLeft]}>
          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.point}>
              <Text overline whiteColor semibold>
                {this.props.point}
              </Text>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                headline
                numberOfLines={1}
                style={{color: BaseColor.secondBlackColor}}>
                Name:
              </Text>
              <Text
                subhead
                numberOfLines={1}
                style={{color: 'rgba(0,0,0,0.65)', marginLeft: 20}}>
                {staff_full_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                headline
                numberOfLines={1}
                style={{color: BaseColor.secondBlackColor}}>
                Status:
              </Text>
              <Text
                subhead
                numberOfLines={1}
                style={{color: 'rgba(0,0,0,0.65)', marginLeft: 20}}>
                {staff_status == 1 ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                headline
                numberOfLines={1}
                style={{color: BaseColor.secondBlackColor}}>
                Gender:
              </Text>
              <Text
                subhead
                numberOfLines={1}
                style={{
                  color: 'rgba(0,0,0,0.65)',
                  textAlign: 'center',
                  marginLeft: 20,
                }}>
                {this.getGenderName(staff_gender)}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                headline
                numberOfLines={1}
                style={{color: BaseColor.secondBlackColor}}>
                Skill Level:
              </Text>
              <Text
                subhead
                numberOfLines={1}
                style={{
                  color: 'rgba(0,0,0,0.65)',
                  textAlign: 'center',
                  marginLeft: 20,
                }}>
                {staff_skill_level}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                headline
                numberOfLines={1}
                style={{color: BaseColor.secondBlackColor}}>
                Joined Date:
              </Text>
              <Text
                subhead
                numberOfLines={1}
                style={{
                  color: 'rgba(0,0,0,0.65)',
                  textAlign: 'center',
                  marginLeft: 20,
                }}>
                {staff_joined_date}
              </Text>
            </View> */}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              body2
              semibold
              style={{
                marginTop: 3,
                paddingRight: 10,
                color: BaseColor.titleColor,
              }}
              numberOfLines={1}>
              {gender}
            </Text>
            <View style={styles.listContentRate}>
              <StarRating
                disabled={true}
                starSize={10}
                maxStars={5}
                rating={staff_skill_level}
                selectedStar={(rating) => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                body2
                semibold
                style={{
                  marginTop: 3,
                  paddingRight: 10,
                  color: BaseColor.titleColor,
                }}
                numberOfLines={1}>
                &nbsp;&nbsp;(Level: {staff_skill_level})
              </Text>
            </View>
          </View>
          <Text
            headline
            semibold
            numberOfLines={1}
            style={{marginTop: 5, color: BaseColor.sectionColor}}>
            {staff_joined_date}
          </Text> */}
        </View>
        <View style={[styles.contentRight, styleRight]}>
          <Icon name="angle-right" size={18} color={BaseColor.grayColor} />
        </View>
      </TouchableOpacity>
    );
  }
}

StaffProfileListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  staff_id: PropTypes.number,
  staff_full_name: PropTypes.string,
  staff_gender: PropTypes.string,
  staff_skill_level: PropTypes.string,
  staff_joined_date: PropTypes.string,
  staff_status: PropTypes.string,
  product_ids: PropTypes.array,
  seller_id: PropTypes.string,
  create_at: PropTypes.string,
  updated_at: PropTypes.string,
  staff_title: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

StaffProfileListItem.defaultProps = {
  style: {},
  staff_id: PropTypes.number,
  staff_full_name: PropTypes.string,
  staff_gender: PropTypes.string,
  staff_skill_level: PropTypes.string,
  staff_joined_date: PropTypes.string,
  staff_status: PropTypes.string,
  product_ids: PropTypes.array,
  seller_id: PropTypes.string,
  create_at: PropTypes.string,
  updated_at: PropTypes.string,
  staff_title: PropTypes.string,
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
