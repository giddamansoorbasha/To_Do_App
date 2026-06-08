import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksAPI } from '../api/tasks'
import { useTaskStore } from '../store/taskStore'
import toast from 'react-hot-toast'

export const useTasks = () => {
  const queryClient = useQueryClient()
  const { filters } = useTaskStore()

  const tasksQuery = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksAPI.getAll(filters),
  })

  const createMutation = useMutation({
    mutationFn: tasksAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task created!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to create task')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tasksAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task updated!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to update task')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: tasksAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to delete task')
    },
  })

  return {
    tasks: tasksQuery.data?.tasks || [],
    total: tasksQuery.data?.total || 0,
    page: tasksQuery.data?.page || 1,
    perPage: tasksQuery.data?.per_page || 10,
    isLoading: tasksQuery.isLoading,
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}