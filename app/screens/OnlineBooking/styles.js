import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  inputGroup: {
    marginTop: 20,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 20
  }
});
