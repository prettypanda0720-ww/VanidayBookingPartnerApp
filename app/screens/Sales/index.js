import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@components';

const Sales = props => {
  return (
    <View style={styles.container}>
       <Text style={{fontSize: 40, fontWeight: 'bold'}}>Sales</Text>
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 600,
  },
});