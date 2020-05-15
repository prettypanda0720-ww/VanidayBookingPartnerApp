import React from 'react';
import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  inputGroup: {
    marginTop: 15,
  },
  btnWrapper: {
    marginBottom: 0,
    padding: 20,
    flexDirection: 'row',
  },
  mainWrapper: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    marginTop: 20,
  },
  multilineTextInput: {
    height: 200,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.titleColor,
    borderWidth: 1,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  retailWrapper: {
    paddingVertical: 30,
  },
  blockImage: {
    height: Utils.scaleWithPixel(200),
    width: '100%',
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
    borderRadius: 0,
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
});
