import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: BaseColor.whiteColor,
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: BaseColor.whiteColor,
    padding: 10,
  },
  headerText: {
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: BaseColor.grayColor,
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: BaseColor.whiteColor,
  },
});
