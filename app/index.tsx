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
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  React.useEffect(() => {
    setWebViewRef(webViewRef);
    return () => setWebViewRef(null);
  }, [setWebViewRef]);

  const scrollToTop = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        true; // note: this is required, or you'll sometimes get silent failures
      `);
    }
  };

  // Inject JavaScript to handle window.open calls
  const injectWindowOpenHandler = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        (function() {
          // Override window.open to navigate in the same WebView
          const originalOpen = window.open;
          window.open = function(url, target, features) {
            if (url && typeof url === 'string') {
              // Navigate to the URL in the same WebView
              window.location.href = url;
              return null;
            }
            return originalOpen.apply(this, arguments);
          };
          
          // Also handle links with target="_blank"
          document.addEventListener('click', function(e) {
            const link = e.target.closest('a[target="_blank"]');
            if (link && link.href) {
              e.preventDefault();
              window.location.href = link.href;
            }
          }, true);
          
          true; // Required for injection
        })();
      `);
    }
  };

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
        onLoadEnd={() => {
          setLoading(false);
          scrollToTop();
          // Inject window.open handler after page loads
          injectWindowOpenHandler();
        }}
        onNavigationStateChange={(navState) => {
          // Scroll to top when URL changes
          if (previousUrl && previousUrl !== navState.url) {
            scrollToTop();
          }
          setPreviousUrl(navState.url);
        }}
        onShouldStartLoadWithRequest={(request) => {
          // Allow all navigation requests
          return true;
        }}
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

