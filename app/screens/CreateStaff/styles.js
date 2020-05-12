import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

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
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.grayColor,
    marginBottom: 10,
  },
  checkboxItemWrapper: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  }
});
