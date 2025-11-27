import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Share, Alert, View, Text } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
import { ColorsV2 } from '@/constants/theme';
import { useWebView } from '@/contexts/WebViewContext';
import { env } from '@/utils/env';

export function WebViewHeader() {
  const { refresh, navigateWebView } = useWebView();

  const handleGoHome = () => {
    navigateWebView(env.dashboardUrl);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Reship Mobile App',
        url: env.homeUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* App Title/Logo */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            reship
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={refresh}
            accessibilityLabel="Refresh"
          >
            <IconSymbol name="arrow.clockwise" size={24} color={ColorsV2.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGoHome}
            accessibilityLabel="Home"
          >
            <IconSymbol name="house.fill" size={24} color={ColorsV2.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleShare}
            accessibilityLabel="Share"
          >
            <IconSymbol name="square.and.arrow.up" size={24} color={ColorsV2.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: ColorsV2.bgDarkBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ColorsV2.special,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorsV2.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
});

