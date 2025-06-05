import { useEffect } from 'react';
import { useUserStore } from '../stores';

/**
 * Custom hook for managing user data fetching and state
 * Provides convenient methods for common user operations
 */
export const useUser = (userId?: string) => {
  const store = useUserStore();

  // Auto-fetch user when userId is provided
  useEffect(() => {
    if (userId) {
      store.fetchUserById(userId);
    }
  }, [userId, store.fetchUserById]);

  // Auto-fetch users if not already loaded
  useEffect(() => {
    if (store.users.length === 0 && !store.isLoading) {
      store.fetchUsers();
    }
  }, [store.users.length, store.isLoading, store.fetchUsers]);

  return {
    // State
    users: store.users,
    selectedUser: store.selectedUser,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    fetchUsers: store.fetchUsers,
    fetchUserById: store.fetchUserById,
    updateUser: store.updateUser,
    addUser: store.addUser,
    deleteUser: store.deleteUser,
    clearSelectedUser: store.clearSelectedUser,
    clearError: store.clearError,

    // Computed values
    userCount: store.users.length,
    hasUsers: store.users.length > 0,
    hasError: Boolean(store.error),
  };
};

/**
 * Hook specifically for user lists
 */
export const useUserList = () => {
  const store = useUserStore();

  useEffect(() => {
    if (store.users.length === 0 && !store.isLoading) {
      store.fetchUsers();
    }
  }, [store.users.length, store.isLoading, store.fetchUsers]);

  return {
    users: store.users,
    isLoading: store.isLoading,
    error: store.error,
    fetchUsers: store.fetchUsers,
    deleteUser: store.deleteUser,
    clearError: store.clearError,
    userCount: store.users.length,
    hasUsers: store.users.length > 0,
  };
};
