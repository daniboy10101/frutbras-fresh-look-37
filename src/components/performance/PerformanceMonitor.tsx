import { useEffect } from 'react';

interface PerformanceEntry {
  name: string;
  startTime: number;
  duration: number;
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as any;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
      }).observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift (CLS)
      new PerformanceObserver((entryList) => {
        let cls = 0;
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            cls += clsEntry.value;
          }
        }
        console.log('CLS:', cls);
      }).observe({ type: 'layout-shift', buffered: true });
    };

    // Monitor navigation timing
    const logPerformanceMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
          'TCP Connection': navigation.connectEnd - navigation.connectStart,
          'Request': navigation.responseStart - navigation.requestStart,
          'Response': navigation.responseEnd - navigation.responseStart,
          'DOM Processing': navigation.domContentLoadedEventStart - navigation.responseEnd,
          'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
          'Total Load Time': navigation.loadEventEnd - navigation.fetchStart,
        };

        console.group('🚀 Performance Metrics');
        Object.entries(metrics).forEach(([key, value]) => {
          console.log(`${key}: ${Math.round(value)}ms`);
        });
        console.groupEnd();
      }
    };

    // Run monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      observeWebVitals();
      
      if (document.readyState === 'complete') {
        logPerformanceMetrics();
      } else {
        window.addEventListener('load', logPerformanceMetrics);
      }
    }

    return () => {
      window.removeEventListener('load', logPerformanceMetrics);
    };
  }, []);

  return null;
};

// Hook for component-level performance monitoring
export const usePerformanceTracking = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`⏱️ ${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
    };
  });
};