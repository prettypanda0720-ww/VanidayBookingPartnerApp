import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

const SIZE = 40;

export default StyleSheet.create({
  finishBtn: {
    alignItems: 'flex-end',
  },
  textInput: {
    borderColor: BaseColor.black,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
