import api from './index'

export const tasksAPI = {
  getAll: async ({ page = 1, per_page = 10, status, priority } = {}) => {
    const params = { page, per_page }
    if (status) params.status = status
    if (priority) params.priority = priority

    const res = await api.get('/tasks/', { params })
    return res.data
  },

  getOne: async (id) => {
    const res = await api.get(`/tasks/${id}`)
    return res.data
  },

  create: async (data) => {
    const res = await api.post('/tasks/', data)
    return res.data
  },

  update: async (id, data) => {
    const res = await api.patch(`/tasks/${id}`, data)
    return res.data
  },

  delete: async (id) => {
    await api.delete(`/tasks/${id}`)
  },
}