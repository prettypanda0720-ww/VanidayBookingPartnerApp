import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    marginTop: 20,
  },
  summary: {
    color: '#4079a0',
    backgroundColor: '#daeffd',
    padding: 10,
  },
  rowBetweenAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
});
