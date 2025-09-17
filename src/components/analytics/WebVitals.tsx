import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const WebVitals = () => {
  useEffect(() => {
    // Load web-vitals library dynamically
    const loadWebVitals = async () => {
      try {
        const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');
        
        const sendToAnalytics = (metric: WebVitalsMetric) => {
          // Send to Google Analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', metric.name, {
              custom_map: { metric_rating: metric.rating },
              value: Math.round(metric.value),
              metric_rating: metric.rating,
            });
          }
          
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 ${metric.name}:`, {
              value: `${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'}`,
              rating: metric.rating
            });
          }
        };

        // Measure all Web Vitals using the correct callback format
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onFCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
        
      } catch (error) {
        console.warn('Web Vitals could not be loaded:', error);
      }
    };

    loadWebVitals();
  }, []);

  return null;
};

// Custom hook for page-specific analytics
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_TRACKING_ID', {
        page_title: pageName,
        page_location: window.location.href,
      });
    }

    // Track page load time
    const startTime = performance.now();
    
    return () => {
      const loadTime = performance.now() - startTime;
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_load_time', {
          value: Math.round(loadTime),
          page_name: pageName,
        });
      }
    };
  }, [pageName]);
};