import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import TaskList from '../components/tasks/TaskList'
import TaskForm from '../components/tasks/TaskForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../store/taskStore'

const Dashboard = () => {
  const {
    tasks, total, isLoading,
    createTask, updateTask, deleteTask,
    isCreating, isUpdating,
  } = useTasks()

  const { filters, setFilter, setPage } = useTaskStore()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const totalPages = Math.ceil(total / filters.per_page)

  const handleCreate = (data) => {
    createTask(data, { onSuccess: () => setIsCreateOpen(false) })
  }

  const handleUpdate = (data) => {
    updateTask(
      { id: editTask.id, data },
      { onSuccess: () => setEditTask(null) }
    )
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) deleteTask(id)
  }

  const handleStatusChange = (id, data) => {
    updateTask({ id, data })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main */}
        <main className="flex-1 p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
              <p className="text-sm text-gray-500 mt-0.5">{total} task{total !== 1 ? 's' : ''} total</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Priority filter */}
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-gray-400" />
                <select
                  value={filters.priority}
                  onChange={(e) => setFilter('priority', e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
                <Plus size={16} />
                New Task
              </Button>
            </div>
          </div>

          {/* Task Grid */}
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onEdit={setEditTask}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(filters.page - 1)}
                disabled={filters.page === 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {filters.page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreate}
          isLoading={isCreating}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        title="Edit Task"
      >
        <TaskForm
          defaultValues={editTask}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
          onCancel={() => setEditTask(null)}
        />
      </Modal>
    </div>
  )
}

export default Dashboard