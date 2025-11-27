import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewHeader } from '@/components/WebViewHeader';
import { useWebView } from '@/contexts/WebViewContext';
import { env } from '@/utils/env';

export default function HomeScreen() {
  const webViewRef = useRef<WebView | null>(null);
  const { setWebViewRef } = useWebView();

  React.useEffect(() => {
    setWebViewRef(webViewRef);
    return () => setWebViewRef(null);
  }, [setWebViewRef]);

  return (
    <View style={styles.container}>
      <WebViewHeader />
      <WebView
        ref={webViewRef}
        source={{ uri: env.dashboardUrl }}
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        incognito={false}
        sharedCookiesEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

