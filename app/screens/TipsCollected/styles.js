import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';
const win = Dimensions.get('window');
const ww = win.width / 5;

export default StyleSheet.create({
  tableContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.65)',
  },
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
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  sideMenuStyle: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: BaseColor.fieldColor,
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
  colHead: {
    width: ww,
    backgroundColor: BaseColor.fieldColor,
    borderTopColor: BaseColor.titleColor,
    borderBottomColor: BaseColor.titleColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  rowsHead: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: BaseColor.titleColor,
    backgroundColor: BaseColor.fieldColor,
  },
  rowsContent: {
    borderBottomColor: BaseColor.titleColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    backgroundColor: BaseColor.whiteColor,
  },
  itemContent: {
    textAlign: 'center',
    color: BaseColor.sectionColor,
  },
});
