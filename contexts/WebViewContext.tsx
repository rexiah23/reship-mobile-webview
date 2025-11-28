import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';
import { WebView } from 'react-native-webview';
import { env } from '@/utils/env';

interface WebViewContextType {
  webViewRef: React.RefObject<WebView | null>;
  currentUrl: string;
  canGoBack: boolean;
  navigateToUrl: (url: string) => void;
  refresh: () => void;
  goHome: () => void;
  goBack: () => void;
  navigateWebView: (url: string) => void;
  setWebViewRef: (ref: React.RefObject<WebView | null> | null) => void;
  setCanGoBack: (canGoBack: boolean) => void;
}

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export function WebViewProvider({ children, homeUrl }: { children: ReactNode; homeUrl: string }) {
  const webViewRef = useRef<WebView | null>(null);
  const [currentUrl, setCurrentUrl] = useState(env.dashboardUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [historyStack, setHistoryStack] = useState<string[]>([env.dashboardUrl]);
  const [activeWebViewRef, setActiveWebViewRef] = useState<React.RefObject<WebView | null> | null>(null);
  const isNavigatingBackRef = useRef(false);

  const navigateToUrl = useCallback((url: string) => {
    setCurrentUrl(url);
    
    // Don't add to history if we're programmatically navigating back
    if (isNavigatingBackRef.current) {
      isNavigatingBackRef.current = false;
      return;
    }
    
    // Add to history stack if it's a new URL
    setHistoryStack((prev) => {
      // Don't add if it's the same as the last URL
      if (prev[prev.length - 1] !== url) {
        return [...prev, url];
      }
      return prev;
    });
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
    // Reset history stack to just home
    setHistoryStack([env.dashboardUrl]);
  }, []);

  const goBack = useCallback(() => {
    const refToUse = activeWebViewRef || webViewRef;
    
    // Try manual history first (more reliable for new pages)
    if (historyStack.length > 1) {
      isNavigatingBackRef.current = true; // Set flag to prevent adding to history
      
      setHistoryStack((prev) => {
        const newStack = [...prev];
        newStack.pop(); // Remove current URL
        const previousUrl = newStack[newStack.length - 1];
        
        if (previousUrl && refToUse?.current) {
          // Navigate to previous URL
          refToUse.current.injectJavaScript(`window.location.href = '${previousUrl}';`);
          setCurrentUrl(previousUrl);
        }
        
        return newStack;
      });
    } else if (refToUse?.current) {
      // Fallback to WebView's built-in goBack
      refToUse.current.goBack();
    }
  }, [activeWebViewRef, historyStack]);

  const navigateWebView = useCallback((url: string) => {
    const refToUse = activeWebViewRef || webViewRef;
    if (refToUse?.current) {
      refToUse.current.injectJavaScript(`window.location.href = '${url}';`);
    }
  }, [activeWebViewRef]);

  const setWebViewRef = useCallback((ref: React.RefObject<WebView | null> | null) => {
    setActiveWebViewRef(ref);
  }, []);

  // Update canGoBack based on history stack
  React.useEffect(() => {
    setCanGoBack(historyStack.length > 1);
  }, [historyStack]);

  return (
    <WebViewContext.Provider value={{ webViewRef, currentUrl, canGoBack, navigateToUrl, refresh, goHome, goBack, navigateWebView, setWebViewRef, setCanGoBack }}>
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

