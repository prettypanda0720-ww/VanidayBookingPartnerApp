import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
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
    paddingTop: 20,
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
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  retailWrapper: {
    paddingVertical: 30,
  },
  
});
