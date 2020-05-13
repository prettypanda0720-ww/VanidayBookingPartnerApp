import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contentPickDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: BaseColor.whiteColor,
    padding: 10,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  itemPick: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  contentModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contentCalendar: {
    borderRadius: 8,
    width: "100%",
    backgroundColor: "white"
  },
  contentActionCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  }
});
