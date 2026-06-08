import { LayoutDashboard, CheckSquare, Clock, Archive } from 'lucide-react'
import { useTaskStore } from '../../store/taskStore'

const filters = [
  { label: 'All Tasks',    value: '',            icon: LayoutDashboard },
  { label: 'Todo',         value: 'todo',        icon: CheckSquare },
  { label: 'In Progress',  value: 'in_progress', icon: Clock },
  { label: 'Completed',    value: 'completed',   icon: Archive },
]

const Sidebar = () => {
  const { filters: activeFilters, setFilter } = useTaskStore()

  return (
    <aside className="w-56 bg-white border-r border-gray-100 min-h-screen p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
        Filter by Status
      </p>
      <ul className="space-y-1">
        {filters.map(({ label, value, icon: Icon }) => {
          const isActive = activeFilters.status === value
          return (
            <li key={value}>
              <button
                onClick={() => setFilter('status', value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar