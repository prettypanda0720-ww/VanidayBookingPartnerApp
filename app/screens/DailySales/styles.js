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
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  row: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.grayColor,
  },
  rowBottom: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.grayColor,
  },
  text: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.65)',
  },
  textHeader: {
    textAlign: 'center',
    color: BaseColor.secondBlackColor,
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
    flexDirection: 'column',
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
  serviceItemWrapper: {
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderLeftWidth: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: BaseColor.dividerColor,
    borderBottomWidth: 1,
  },
  serviceItemNameStyle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  serviceItemDateStyle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    fontWeight: 'normal',
  }
});
