import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  filters: {
    status: '',
    priority: '',
    page: 1,
    per_page: 10,
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value, page: 1 },
    })),

  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),

  resetFilters: () =>
    set({
      filters: { status: '', priority: '', page: 1, per_page: 10 },
    }),
}))