import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 220,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
});
