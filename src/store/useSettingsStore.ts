import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    showTestnetParams: boolean;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    toggleTestnetParams: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'system',
            showTestnetParams: false,
            setTheme: (theme) => set({ theme }),
            toggleTestnetParams: () => set((state) => ({ showTestnetParams: !state.showTestnetParams })),
        }),
        {
            name: 'settings-storage',
        }
    )
);
