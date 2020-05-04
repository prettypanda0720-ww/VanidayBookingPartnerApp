import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    // flex: 1,
    // margin: 20,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    zIndex: 99,
    // backgroundColor: '#F035E0',
  },
  image: {
    width: 40,
    height: 40,
  },
  membersWrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
  },
  memberItemWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.grayColor,
  },
  staffThumb: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
});
