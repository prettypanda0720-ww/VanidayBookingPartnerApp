import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  inputGroup: {
    marginTop: 15,
  },
  btnWrapper: {
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  retailWrapper: {
    paddingVertical: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  uploadBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.SecondColor,
    borderRadius: 8,
  },
  uploadBtnStyle: {
    paddingVertical: 15,
    color: BaseColor.whiteColor,
    textAlign: 'center',
  },
  blockImage: {
    marginTop: 10,
    width: '90%',
    height: Utils.scaleWithPixel(200),
    borderWidth: 1,
    borderColor: BaseColor.SecondColor,
    borderRadius: 0,
  },
  sectionStyle: {
    color: 'rgba(0,0,0,0.65)',
  },
});
