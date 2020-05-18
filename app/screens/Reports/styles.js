import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  reportWrapper: {
    flexDirection: 'column',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
