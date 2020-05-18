import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '@config';

export default StyleSheet.create({
  contain: {
    height: 45,
    flexDirection: 'row',
  },
  filterContain: {
    height: 45,
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    width: 60,
  },
  contentCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateRange: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideMenuStyle: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: BaseColor.fieldColor,
  },
  staffsTitle: {
    fontSize: 22,
    color: 'white',
    marginTop: 30,
  },
  drawerStyles: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  inputGroup: {
    marginTop: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  total: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: BaseColor.sectionColor,
  }
});
