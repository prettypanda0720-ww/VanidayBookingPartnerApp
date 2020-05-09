import React from 'react';
import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  inputGroup: {
    marginTop: 15,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
  },
  logoWrapper: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 2,
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 20,
  },
  logoContentWrapper: {
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  floatingLogo: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 100,
    borderRadius: 5,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryStyle: {
    marginTop: 20,
    padding: 10,
    backgroundColor: BaseColor.textSecondaryColor,
    textAlign: 'center'
  },
  contentBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
    borderTopColor: BaseColor.secondBlackColor,
    borderTopWidth: 1,
  },
});
