import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from "@utils";

const SIZE = 40;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 600,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  profileItem: {
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  tabbar: {
    backgroundColor: "white",
    height: 40
  },
  tab: {
    width: Utils.getWidthDevice() / 3
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondBlackColor,
  },
  sectionStyle: {
    color: 'rgba(0,0,0,0.65)'
  }
});
