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
    flex: 2,
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  inputGroup: {
    paddingVertical: 20,
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
  },
  multilineTextInput: {
    height: 200,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftCenter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  orderItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  orderWrapper: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
  },
  contentButtonBottom: {
    backgroundColor: BaseColor.secondBlackColor, 
    flexDirection: 'row',
    height: Utils.scaleWithPixel(60),
  }
});
