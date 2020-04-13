import { BaseColor } from "@config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  }
});
