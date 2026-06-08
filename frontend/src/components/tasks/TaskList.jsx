import { Loader2, Inbox } from 'lucide-react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, isLoading, onEdit, onDelete, onStatusChange }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary-500" size={28} />
      </div>
    )
  }

  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Inbox size={40} className="mb-3 opacity-50" />
        <p className="text-sm font-medium">No tasks found</p>
        <p className="text-xs mt-1">Create your first task to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

export default TaskList