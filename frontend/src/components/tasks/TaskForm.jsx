import { useState, useEffect } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const initialState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  due_date: '',
}

const TaskForm = ({ onSubmit, defaultValues = null, isLoading = false, onCancel }) => {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (defaultValues) {
      setForm({
        title:       defaultValues.title || '',
        description: defaultValues.description || '',
        status:      defaultValues.status || 'todo',
        priority:    defaultValues.priority || 'medium',
        due_date:    defaultValues.due_date
          ? new Date(defaultValues.due_date).toISOString().split('T')[0]
          : '',
      })
    }
  }, [defaultValues])

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)

    const payload = { ...form }
    if (!payload.due_date) delete payload.due_date
    else payload.due_date = new Date(payload.due_date).toISOString()

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        error={errors.title}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional description..."
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="input-field"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <Input
        label="Due Date"
        name="due_date"
        type="date"
        value={form.due_date}
        onChange={handleChange}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isLoading} className="flex-1">
          {defaultValues ? 'Update Task' : 'Create Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm