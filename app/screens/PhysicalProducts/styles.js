import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {height: 2, width: 0},
    elevation: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: BaseColor.fieldColor,
  },
  image: {
    width: 40,
    height: 40,
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
});
