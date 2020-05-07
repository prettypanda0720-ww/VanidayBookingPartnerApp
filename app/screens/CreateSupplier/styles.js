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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    marginVertical: 20,
  },
  countryCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: BaseColor.fieldColor,
    height: 40,
    marginRight: 5,
    alignItems: 'center',
    paddingHorizontal: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  phoneNumberContainer: {
    flex: 2,
    borderRadius: 5,
    backgroundColor: BaseColor.fieldColor,
    height: 40,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    margin: 0,
    padding: 0,
  },
  countryCodeText: {
    fontSize: 18
  }
});
