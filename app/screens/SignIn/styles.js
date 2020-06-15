import {StyleSheet, Dimensions} from 'react-native';
import * as Utils from '@utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },
  wrapper: {
    width: '100%',
    height: 350,
  },
  contentPage: {
    bottom: 0,
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
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
  container: {
    flex: 1,
    top: -35,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },

  containerLogin: {
    flex: 1,
    top: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  textLogin: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  logo: {
    width: '100%',
    height: Utils.scaleWithPixel(35),
  },
});
