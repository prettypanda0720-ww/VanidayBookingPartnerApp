import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  itemWrapper: {
    paddingTop: 10,
    // paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  enableTextInput: {
    flex: 1,
    height: 46,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  disableTextInput: {
    flex: 1,
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  workingTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
  },
});
