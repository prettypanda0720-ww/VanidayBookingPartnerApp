import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  btnClearSearch: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%"
  },
  btnSearch: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%",
    zIndex: 1000,
  },
  textInput: {
    paddingRight: 40,
    color: BaseColor.titleColor,
    borderColor: BaseColor.grayColor,
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
  }
});
