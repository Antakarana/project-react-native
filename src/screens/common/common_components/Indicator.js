import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Indicator = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        animating={true}
        color="#000000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  }
});
export { Indicator };