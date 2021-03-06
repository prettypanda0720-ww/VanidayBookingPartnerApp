import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  inputGroup: {
    marginTop: 20,
  },
  multilineTextInput: {
    height: 200,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
});
