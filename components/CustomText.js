import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function CustomText({ style, children, ...rest }) {
  return (
    <Text style={[styles.default, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Prompt-Regular', // หรือชื่อฟอนต์ของคุณ
    fontSize: 16,
    color: '#222',
  },
});
