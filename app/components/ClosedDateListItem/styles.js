import {BaseColor} from '@config';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {flexDirection: 'row'},
  contentLeft: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    width: 120,
    height: 55,
    // resizeMode: 'contain',
    // borderRadius: 30,
    marginRight: 20,
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
});
