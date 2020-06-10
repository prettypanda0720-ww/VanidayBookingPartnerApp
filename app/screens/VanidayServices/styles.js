import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  inputGroup: {
    marginTop: 15,
  },
  profileItem: {},
  wrapper: {
    // width: '100%',
    // height: Utils.scaleWithPixel(250),
  },
  thumb: {
    width: '100%',
    height: Utils.getHeightDevice() / 4,
    resizeMode: 'stretch',
  },
});
