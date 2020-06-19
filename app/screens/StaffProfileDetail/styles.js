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
    marginTop: 15,
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
  
  dateInfo: {
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: BaseColor.fieldColor,
    // height: 75,
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  contentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCalendar: {
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
  },
  contentActionCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
