import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    zIndex: 99,
  },
  image: {
    width: 40,
    height: 40,
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: BaseColor.sectionColor,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.fieldColor,
  },
  enableItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor,
    borderLeftWidth: 6,
    borderLeftColor: BaseColor.SecondColor,
  },
  disableItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor,
    borderLeftWidth: 6,
    borderLeftColor: BaseColor.grayColor,
  },
});
