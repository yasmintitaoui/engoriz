import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en',

      setLanguage: (language) => set({ language }),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'en' ? 'fr' : 'en',
        })),
    }),
    {
      name: 'engoriz-language',
    }
  )
)