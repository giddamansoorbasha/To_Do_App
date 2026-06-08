import api from './index'

export const authAPI = {
  register: async (data) => {
    const res = await api.post('/auth/register', data)
    return res.data
  },

  login: async (data) => {
    // OAuth2 form format
    const formData = new URLSearchParams()
    formData.append('username', data.email)
    formData.append('password', data.password)

    const res = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return res.data
  },

  getMe: async () => {
    const res = await api.get('/auth/me')
    return res.data
  },

  updateProfile: async (data) => {
    const res = await api.patch('/users/me', data)
    return res.data
  },

  deleteAccount: async () => {
    const res = await api.delete('/users/me')
    return res.data
  },
}