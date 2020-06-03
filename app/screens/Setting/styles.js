import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    // flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  contentService: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    borderColor: BaseColor.fieldColor,
    borderBottomWidth: 1,
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  sectionStyle: {
    color: 'rgba(0,0,0,0.65)',
  },
  multilineText: {
    height: 200,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
