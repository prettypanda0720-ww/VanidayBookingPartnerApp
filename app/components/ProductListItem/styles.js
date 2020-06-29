import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  //block css
  container: {
    flex: 1,
  },
  blockImage: {
    height: Utils.scaleWithPixel(200),
    width: '100%',
    // borderWidth: 1,
    // borderColor: BaseColor.grayColor,
  },
  paymentImage: {
    height: Utils.scaleWithPixel(35),
    width: '100%',
    paddingTop: 10,
  },
  blockContentAddress: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
  },
  blockContentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  blockListContentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    marginTop: 4,
  },
  contentService: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: BaseColor.fieldColor,
    borderBottomWidth: 1,
  },
  serviceItemBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  //list css
  listImage: {
    height: Utils.scaleWithPixel(140),
    width: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
  listContent: {
    flexDirection: 'row',
  },
  listContentRight: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    flex: 1,
  },
  listContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  //gird css
  girdImage: {
    borderRadius: 8,
    height: Utils.scaleWithPixel(120),
    width: '100%',
  },
  girdContent: {
    flex: 1,
  },
  girdContentLocation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  girdContentRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPromotion: {
    height: 40,
    // borderRadius: 3,
    paddingHorizontal: 5,
    // paddingVertical: 5,
    backgroundColor: BaseColor.blackColor,
  },
  priceContent: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: BaseColor.SecondColor,
    borderRadius: 8,
    padding: 5,
  },
  iconContent: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 5,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
