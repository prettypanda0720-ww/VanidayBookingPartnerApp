import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  logo: {
    flex: 1,
    width: '90%',
    height: Utils.scaleWithPixel(30),
  },
});
