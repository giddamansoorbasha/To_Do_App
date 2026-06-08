import { Trash2, Pencil, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import Badge from '../ui/Badge'

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusFlow = {
    todo: 'in_progress',
    in_progress: 'completed',
    completed: 'todo',
  }

  const nextStatus = statusFlow[task.status]

  return (
    <div className="card p-4 hover:shadow-md transition-shadow duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`font-medium text-gray-900 text-sm leading-snug flex-1 ${
          task.status === 'completed' ? 'line-through text-gray-400' : ''
        }`}>
          {task.title}
        </h3>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        <Badge value={task.status} />
        <Badge value={task.priority} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {task.due_date ? (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} />
            {format(new Date(task.due_date), 'MMM dd, yyyy')}
          </div>
        ) : (
          <span />
        )}

        {/* Move to next status */}
        <button
          onClick={() => onStatusChange(task.id, { status: nextStatus })}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
        >
          → Mark as {nextStatus.replace('_', ' ')}
        </button>
      </div>
    </div>
  )
}

export default TaskCard