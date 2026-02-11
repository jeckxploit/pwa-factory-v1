import type { StateCreator } from 'zustand';
import { create } from 'zustand';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  appsCreated: number;
  incrementApps: () => void;
}

const storeCreator: StateCreator<AppState> = (set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  appsCreated: 0,
  incrementApps: () => set((state) => ({ appsCreated: state.appsCreated + 1 })),
})

export const useAppStore = create<AppState>(storeCreator)