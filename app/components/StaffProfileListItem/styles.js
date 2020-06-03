import {BaseColor} from '@config';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {flexDirection: 'row', flex: 1},
  contentLeft: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  thumb: {
    width: 120,
    height: 55,
    // resizeMode: 'contain',
    // borderRadius: 30,
    marginRight: 20,
  },
  point: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BaseColor.lightPrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 9,
    bottom: 0,
  },
  listContentRate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
