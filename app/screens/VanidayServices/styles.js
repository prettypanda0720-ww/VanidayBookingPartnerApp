import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerStyle: {
    borderTopColor: BaseColor.secondBlackColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  inputGroup: {
    marginTop: 15,
  },
});
