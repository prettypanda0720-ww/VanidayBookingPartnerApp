import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },

  inputGroup: {
    marginTop: 15,
  },
  wrapper: {
    paddingBottom: 20,
    // width: '100%',
    // height: Utils.scaleWithPixel(250),
  },
  thumb: {
    width: Utils.getWidthDevice(),
    height: (Utils.getWidthDevice() * 520) / 1920,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  sectionStyle: {
    paddingHorizontal: 20,
  },
});
