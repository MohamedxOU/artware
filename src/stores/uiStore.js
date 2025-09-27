import { create } from 'zustand';

const useUIStore = create((set, get) => ({
  // Modal states
  modals: {
    termsModal: false,
    forgotPasswordModal: false,
    successDialog: false,
    // Add more modals as needed
  },

  // Loading states
  loading: {
    global: false,
    auth: false,
    // Add more loading states as needed
  },

  // Notifications
  notifications: [],

  // Form states
  forms: {
    showCard: false, // For animation states
  },

  // Actions
  openModal: (modalName) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: true
    }
  })),

  closeModal: (modalName) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: false
    }
  })),

  closeAllModals: () => set((state) => ({
    modals: Object.keys(state.modals).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  })),

  setLoading: (loadingType, isLoading) => set((state) => ({
    loading: {
      ...state.loading,
      [loadingType]: isLoading
    }
  })),

  setGlobalLoading: (isLoading) => set((state) => ({
    loading: {
      ...state.loading,
      global: isLoading
    }
  })),

  // Notification system
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info', // 'success', 'error', 'warning', 'info'
      title: '',
      message: '',
      duration: 5000, // auto-remove after 5 seconds
      ...notification
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }));

    // Auto-remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  },

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  clearAllNotifications: () => set({ notifications: [] }),

  // Success dialog helpers
  showSuccessDialog: (message, title = 'Success!') => {
    set((state) => ({
      modals: {
        ...state.modals,
        successDialog: true
      }
    }));
    
    get().addNotification({
      type: 'success',
      title,
      message,
      duration: 0 // Don't auto-remove
    });
  },

  hideSuccessDialog: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        successDialog: false
      }
    }));
  },

  // Form animation helpers
  setShowCard: (show) => set((state) => ({
    forms: {
      ...state.forms,
      showCard: show
    }
  })),

  // Error handling
  showError: (message, title = 'Error') => {
    get().addNotification({
      type: 'error',
      title,
      message,
      duration: 8000 // Show errors longer
    });
  },

  showSuccess: (message, title = 'Success') => {
    get().addNotification({
      type: 'success',
      title,
      message,
      duration: 5000
    });
  },

  showWarning: (message, title = 'Warning') => {
    get().addNotification({
      type: 'warning',
      title,
      message,
      duration: 6000
    });
  },

  showInfo: (message, title = 'Info') => {
    get().addNotification({
      type: 'info',
      title,
      message,
      duration: 4000
    });
  }
}));

export default useUIStore;