import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
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
    marginTop: 20,
  },
  summary: {
    color: '#4079a0',
    backgroundColor: '#daeffd',
    padding: 10,
  },
  rowBetweenAlign: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  }
});
