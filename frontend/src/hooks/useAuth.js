import { useAuthStore } from '../store/authStore'
import { authAPI } from '../api/auth'
import api from '../api/index'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const { setAuth, logout, user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: async (data) => {
      // Save token FIRST before calling /me
      const token = data.access_token
      const me = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAuth(me.data, token)
      toast.success(`Welcome back, ${me.data.username}!`)
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Login failed')
    },
  })

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: () => {
      toast.success('Account created! Please login.')
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Registration failed')
    },
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('Logged out!')
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  }
}