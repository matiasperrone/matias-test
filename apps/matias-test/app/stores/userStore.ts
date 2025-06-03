import { create } from 'zustand';
import { UserData } from '../types';
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { mergeDeepLeft } from "ramda";

// User store state interface
interface UserStore {
  // State
  users: UserData[];
  selectedUser: UserData | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  pageSize: number;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  updateUser: (user: UserData) => Promise<void>;
  addUser: (user: Omit<UserData, 'id'>) => Promise<UserData>;
  deleteUser: (id: string) => Promise<void>;
  clearSelectedUser: () => void;
  clearError: () => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

// Mock data for demonstration
const mockUsers: UserData[] = [
  {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    bio: 'Software developer with 5 years of experience in React and TypeScript.'
  },
  {
    id: '456',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 28,
    bio: 'UX Designer passionate about creating user-friendly interfaces.'
  },
  {
    id: '789',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 35,
    bio: 'Marketing specialist with expertise in digital campaigns.'
  },
  {
    id: '101',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    age: 32,
    bio: 'HR Manager focused on employee development and company culture.'
  },
  {
    id: '202',
    name: 'David Brown',
    email: 'david.brown@example.com',
    age: 29,
    bio: 'Sales representative with a track record of exceeding targets.'
  }
];

// Simulate API delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Create the Zustand store
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      immer<UserStore>((set, get) => ({
        // Initial state
        users: [],
        selectedUser: null,
        isLoading: false,
        error: null,
        searchTerm: '',
        currentPage: 1,
        pageSize: 10,

        // Fetch all users
        fetchUsers: async () => {
          set({ isLoading: true, error: null });

          try {
            await delay(800); // Simulate API call
            set({ users: mockUsers, isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch users',
              isLoading: false
            });
          }
        },

        // Fetch user by ID
        fetchUserById: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            await delay(500); // Simulate API call
            const user = mockUsers.find(u => u.id === id);

            if (!user) {
              set({
                error: `User with ID ${id} not found`,
                isLoading: false,
                selectedUser: null
              });
              return;
            }

            set({ selectedUser: user, isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch user',
              isLoading: false,
              selectedUser: null
            });
          }
        },

        // Update user
        updateUser: async (updatedUser: UserData) => {
          set({ isLoading: true, error: null });

          try {
            await delay(1000); // Simulate API call

            const { users } = get();
            const updatedUsers = users.map(user =>
              user.id === updatedUser.id ? updatedUser : user
            );

            set({
              users: updatedUsers,
              selectedUser: updatedUser,
              isLoading: false
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to update user',
              isLoading: false
            });
            throw error; // Re-throw to handle in component
          }
        },

        // Add new user
        addUser: async (userData: Omit<UserData, 'id'>) => {
          set({ isLoading: true, error: null });

          try {
            await delay(1000); // Simulate API call

            const newUser: UserData = {
              ...userData,
              id: Math.random().toString(36).substring(2, 11) // Generate random ID
            };

            const { users } = get();
            set({
              users: [...users, newUser],
              isLoading: false
            });

            return newUser;
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to add user',
              isLoading: false
            });
            throw error;
          }
        },

        // Delete user
        deleteUser: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            await delay(500); // Simulate API call

            const { users } = get();
            const updatedUsers = users.filter(user => user.id !== id);

            set({
              users: updatedUsers,
              selectedUser: null,
              isLoading: false
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete user',
              isLoading: false
            });
            throw error;
          }
        },

        // Clear selected user
        clearSelectedUser: () => {
          set({ selectedUser: null });
        },

        // Clear error
        clearError: () => {
          set({ error: null });
        },

        // Set search term
        setSearchTerm: (term: string) => {
          set({ searchTerm: term, currentPage: 1 }); // Reset to first page when searching
        },

        // Set current page
        setCurrentPage: (page: number) => {
          set({ currentPage: page });
        },

        // Set page size
        setPageSize: (size: number) => {
          set({ pageSize: size, currentPage: 1 }); // Reset to first page when changing page size
        },
      })),
      {
        name: "user-cache",
        merge: (persistedState, currentState: UserStore) =>
          mergeDeepLeft((persistedState ?? {}) as object, currentState),
      }
    ),
    {
      name: "Users",
      anonymousActionType: "users/anonymous",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

// Selector functions for convenience
export const useUserById = (id: string) => {
  return useUserStore(state => state.users.find(user => user.id === id));
};

export const useUsersCount = () => {
  return useUserStore(state => state.users.length);
};

export const useUsersLoading = () => {
  return useUserStore(state => state.isLoading);
};

export const useUsersError = () => {
  return useUserStore(state => state.error);
};

// Filtered selectors
export const useUsersByAgeRange = (minAge: number, maxAge: number) => {
  return useUserStore(state =>
    state.users.filter(user => user.age >= minAge && user.age <= maxAge)
  );
};

export const useUsersByName = (searchTerm: string) => {
  return useUserStore(state =>
    state.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

// Enhanced selector functions
export const useFilteredUsers = () => {
  return useUserStore(state => {
    let filtered = state.users;

    // Apply search filter
    if (state.searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    return filtered;
  });
};

// Simple atomic selectors - no derived state to avoid infinite loops
export const useUsers = () => {
  return useUserStore(state => state.users);
};

export const useCurrentPage = () => {
  return useUserStore(state => state.currentPage);
};

export const usePageSize = () => {
  return useUserStore(state => state.pageSize);
};

// Separate selectors to avoid object creation in selector
export const useUserSearchTerm = () => {
  return useUserStore(state => state.searchTerm);
};

export const useSetSearchTerm = () => {
  return useUserStore(state => state.setSearchTerm);
};

export const useFilteredUsersCount = () => {
  return useUserStore(state => {
    // Filter users based on search term to get count
    const filteredUsers = state.searchTerm ?
      state.users.filter(user =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(state.searchTerm.toLowerCase())
      ) : state.users;

    return filteredUsers.length;
  });
};
