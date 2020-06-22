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
    marginTop: 5,
  },
  multilineTextInput: {
    height: 200,
  },
  contentPage: {
    bottom: 0,
  },
  slide: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: BaseColor.SecondColor,
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
});
