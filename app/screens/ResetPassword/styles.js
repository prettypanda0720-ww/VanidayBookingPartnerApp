import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from '@utils';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 65,
    padding: 10,
    width: "100%"
  },
  logo: {
    width: '90%',
    height: Utils.scaleWithPixel(30),
  },
});
