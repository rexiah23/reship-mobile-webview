import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

interface CustomerLoadingProps {
  text?: string;
}

export function CustomerLoading({ text }: CustomerLoadingProps) {
  return (
    <View style={styles.loadingFill}>
      <View style={styles.loadingContent}>
        <View style={styles.loadingIconCircle}>
          <Image
            source={require('@/assets/images/Reship_Logo_Pur.png')}
            style={styles.loadingIcon}
            resizeMode="contain"
          />
        </View>
        {text && (
          <Text style={styles.loadingText}>{text}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingFill: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIconCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    width: 300,
    height: 70,
  },
  loadingText: {
    color: '#84329B', // var(--primaryColor) from CSS
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 16,
  },
});

