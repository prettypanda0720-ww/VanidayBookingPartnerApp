import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

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
    color: BaseColor.grayColor,
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
