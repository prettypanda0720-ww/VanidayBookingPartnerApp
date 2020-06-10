import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.sectionColor,
    marginBottom: 10,
  },
  thumb: {
    width: 130,
    height: 60,
    marginBottom: 20,
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  profileItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputGroup: {
    width: '100%',
    paddingVertical: 5,
  },
  logo: {
    flex: 1,
    width: '90%',
    height: Utils.scaleWithPixel(30),
  },
  blockImage: {
    marginTop: 10,
    height: Utils.scaleWithPixel(200),
    width: '100%',
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
    borderRadius: 0,
  },
  wrapper: {
    width: '100%',
    height: Utils.scaleWithPixel(230),
  },
});
