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
  thumb: {
    width: 130,
    height: 60,
    marginBottom: 20,
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
  phoneInputStyle: {
    // borderColor: BaseColor.grayColor,
    // borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: BaseColor.fieldColor,
  },
  dateInfo: {
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: BaseColor.fieldColor,
    // height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  contentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCalendar: {
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
  },
  contentActionCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
