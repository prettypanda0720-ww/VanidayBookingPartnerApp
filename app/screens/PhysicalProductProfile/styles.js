import React from 'react';
import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: 'black',
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  inputGroup: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.grayColor,
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
  },
  multilineTextInput: {
    height: 200,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: 'black',
    marginTop: 5,
    borderColor: BaseColor.grayColor,
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
    marginTop: 10,
  },
  stockHisWrapper: {
    marginTop: 60,
  },
});
