import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  blockImage: {
    height: Utils.scaleWithPixel(200),
    width: Utils.getWidthDevice(),
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
    borderRadius: 0,
  },
  inputGroup: {
    marginTop: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  multilineTextInput: {
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
  contentPage: {
    bottom: 0,
  },
  slide: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    height: Utils.scaleWithPixel(230),
  },
  headerTitle: {
    color: BaseColor.secondBlackColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  changeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
});
