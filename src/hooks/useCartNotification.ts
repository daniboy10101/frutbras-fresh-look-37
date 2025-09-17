import { useState, useCallback } from 'react';
import { CartItem } from '@/types/cart';

export const useCartNotification = () => {
  const [notification, setNotification] = useState<{
    item: CartItem | null;
    isVisible: boolean;
  }>({
    item: null,
    isVisible: false,
  });

  const showNotification = useCallback((item: CartItem) => {
    setNotification({
      item,
      isVisible: true,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({
      item: null,
      isVisible: false,
    });
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};