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
    color: 'black',
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  inputGroup: {
    marginTop: 15,
  },
  clientWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonWrapper: {
    marginBottom: 40,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
  },
  btnClearSearch: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  btnSearch: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
    zIndex: 1000,
  },
  clientContain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  serviceItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
  }, 
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFF',
    zIndex: 100,
  },
  image: {
    width: 40,
    height: 40,
  },
});
