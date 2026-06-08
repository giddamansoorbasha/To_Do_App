const variants = {
  // Status
  todo:        'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-50 text-blue-600',
  completed:   'bg-green-50 text-green-600',
  // Priority
  low:         'bg-gray-100 text-gray-500',
  medium:      'bg-yellow-50 text-yellow-600',
  high:        'bg-red-50 text-red-600',
}

const labels = {
  todo:        'Todo',
  in_progress: 'In Progress',
  completed:   'Completed',
  low:         'Low',
  medium:      'Medium',
  high:        'High',
}

const Badge = ({ value }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[value] || 'bg-gray-100 text-gray-600'}`}>
      {labels[value] || value}
    </span>
  )
}

export default Badge