import React, {Component} from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from '@components';
import styles from './styles';
//import basic react native components

export default class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  onPressMenu = (id, name) => {
    this.props.onClickMenu(id, name);
  };

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.header}
            onPress={this.onPressMenu.bind(
              this,
              this.props.item.id,
              this.props.item.name,
            )}>
            <Text style={styles.headerText}>{this.props.item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            {this.props.item.isExpanded ? (
              <Icon
                style={[styles.icons, {top: this.state.visibleIconPosition}]}
                name="angle-up"
                size={15}
              />
            ) : (
              <Icon
                style={[styles.icons, {top: this.state.visibleIconPosition}]}
                name="angle-down"
                size={15}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={this.onPressMenu.bind(
                this,
                item.id,
                this.props.item.name + '/' + item.name,
              )}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
