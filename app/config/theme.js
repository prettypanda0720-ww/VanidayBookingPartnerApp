import {StyleSheet} from 'react-native';
// import {BaseColor} from './color';
import {BaseColor, FontFamily} from '@config';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20,
  },
  bodyMarginDefault: {
    marginHorizontal: 20,
  },
  // textInput: {
  //   height: 46,
  //   backgroundColor: BaseColor.fieldColor,
  //   borderRadius: 5,
  //   padding: 10,
  //   width: '100%',
  //   justifyContent: 'flex-start',
  // },
  label: {
    color: BaseColor.secondBlackColor,
    fontSize: 15,
    fontFamily: FontFamily.default,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    fontSize: 13,
    fontFamily: FontFamily.default,
    // borderColor: BaseColor.grayColor,
    // borderWidth: 1,
  },
  multilineTextInput: {
    height: 200,
    backgroundColor: BaseColor.fieldColor,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
});
