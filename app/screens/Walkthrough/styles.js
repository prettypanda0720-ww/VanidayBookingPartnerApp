import { StyleSheet } from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    // paddingHorizontal: 20,
    marginTop: 50,
  },
  wrapper: {
    width: '100%',
    height: Utils.scaleWithPixel(300),
  },
  contentPage: {
    bottom: 0,
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  img: {
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(200),
    borderRadius: Utils.scaleWithPixel(200) / 2,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textSlide: {
    marginTop: 30,
  },
  buttonGroup: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
