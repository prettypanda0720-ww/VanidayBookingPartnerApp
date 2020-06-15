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
  serviceItemWrapper: {
    borderColor: BaseColor.grayColor,
    backgroundColor: BaseColor.fieldColor,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    // flex: 1,
    flexDirection: 'row',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  serviceItemNameStyle: {
    fontSize: 14,
    color: BaseColor.blackColor,
    marginTop: 5,
    fontWeight: 'bold',
  },
  serviceItemDateStyle: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'normal',
  },
  dayNum: {
    fontSize: 28,
    fontWeight: '200',
    fontFamily: 'System',
    color: BaseColor.whiteColor,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'System',
    color: BaseColor.whiteColor,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -5
  },
  today: {
    color: '#7a92a5',
  },
  day: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.SecondColor,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});
