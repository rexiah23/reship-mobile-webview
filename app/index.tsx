import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewHeader } from '@/components/WebViewHeader';
import { CustomerLoading } from '@/components/CustomerLoading';
import { useWebView } from '@/contexts/WebViewContext';
import { env } from '@/utils/env';

export default function HomeScreen() {
  const webViewRef = useRef<WebView | null>(null);
  const { setWebViewRef } = useWebView();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setWebViewRef(webViewRef);
    return () => setWebViewRef(null);
  }, [setWebViewRef]);

  return (
    <View style={styles.container}>
      <WebViewHeader />
      {loading && (
        <View style={styles.loaderContainer}>
          <CustomerLoading />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: env.dashboardUrl }}
        style={styles.webview}
        startInLoadingState={false}
        scalesPageToFit={true}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        incognito={false}
        sharedCookiesEnabled={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});

