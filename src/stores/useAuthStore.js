import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {zustandStorage} from '../storage/mmkv';
import {getCurrentUserRequest} from '../api/userProfileApi';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      authAt: null,

      isLoading: false,
      isError: false,
      isFetched: false,

      // Save login info
      setAuth: ({user, accessToken}) => {
        set({
          user,
          accessToken,
          authAt: Date.now(),
        });
      },

      // Update user
      setUser: user => set({user}),

      // Logout
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          authAt: null,
          isFetched: false,
        });
      },

      // Getters
      getUser: () => get().user,
      getToken: () => get().accessToken,

      // Fetch user WITHOUT address
      fetchUser: async () => {
        const token = get().accessToken;

        if (!token) {
          console.warn('fetchUser: không có accessToken → bỏ qua');
          set({isFetched: true});
          return null;
        }

        set({isLoading: true, isError: false});

        try {
          const res = await getCurrentUserRequest();
          const user = res?.data;

          set({
            user,
            isLoading: false,
            isFetched: true,
          });

          return user;
        } catch (err) {
          console.error(
            'fetchUser error:',
            err?.response?.data || err.message || err,
          );

          set({
            isError: true,
            isLoading: false,
            isFetched: true,
          });

          throw err;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: zustandStorage,
    },
  ),
);

// Sync token getter
export const getToken = () => {
  try {
    const store = useAuthStore.getState();
    if (store?.accessToken) return store.accessToken;

    const authData = zustandStorage.getItem('auth-storage');
    if (authData) return authData.accessToken ?? null;

    return null;
  } catch (err) {
    console.warn('getToken error', err);
    return null;
  }
};
