import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';
import { WebView } from 'react-native-webview';
import { env } from '@/utils/env';

interface WebViewContextType {
  webViewRef: React.RefObject<WebView | null>;
  currentUrl: string;
  navigateToUrl: (url: string) => void;
  refresh: () => void;
  goHome: () => void;
  navigateWebView: (url: string) => void;
  setWebViewRef: (ref: React.RefObject<WebView | null> | null) => void;
}

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export function WebViewProvider({ children, homeUrl }: { children: ReactNode; homeUrl: string }) {
  const webViewRef = useRef<WebView | null>(null);
  const [currentUrl, setCurrentUrl] = useState(env.dashboardUrl);
  const [activeWebViewRef, setActiveWebViewRef] = useState<React.RefObject<WebView | null> | null>(null);

  const navigateToUrl = useCallback((url: string) => {
    setCurrentUrl(url);
  }, []);

  const refresh = useCallback(() => {
    // Try active ref first, then fallback to context ref
    const refToUse = activeWebViewRef || webViewRef;
    if (refToUse?.current) {
      refToUse.current.reload();
    }
  }, [activeWebViewRef]);

  const goHome = useCallback(() => {
    setCurrentUrl(env.dashboardUrl);
  }, []);

  const navigateWebView = useCallback((url: string) => {
    const refToUse = activeWebViewRef || webViewRef;
    if (refToUse?.current) {
      refToUse.current.injectJavaScript(`window.location.href = '${url}';`);
    }
  }, [activeWebViewRef]);

  const setWebViewRef = useCallback((ref: React.RefObject<WebView | null> | null) => {
    setActiveWebViewRef(ref);
  }, []);

  return (
    <WebViewContext.Provider value={{ webViewRef, currentUrl, navigateToUrl, refresh, goHome, navigateWebView, setWebViewRef }}>
      {children}
    </WebViewContext.Provider>
  );
}

export function useWebView() {
  const context = useContext(WebViewContext);
  if (context === undefined) {
    throw new Error('useWebView must be used within a WebViewProvider');
  }
  return context;
}

