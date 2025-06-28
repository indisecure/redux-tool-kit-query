import { useState } from 'react'
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from '../api/api'

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const { data: todos = [], isLoading, isError, error } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addTodo({ title: newTodo, completed: false })
    setNewTodo('')
  }

  const handleUpdate = (todo) => {
    updateTodo({ _id: todo._id, title: editText, completed: todo.completed })
    setEditId(null)
    setEditText('')
  }

  const handleToggleComplete = (todo) => {
    updateTodo({ _id: todo._id, title: todo.title, completed: !todo.completed })
  }

  return (
    <div className="container py-5 bg-body-secondary">
      <h1 className="text-center mb-4">📝 To-Do List</h1>
      <form onSubmit={handleSubmit} className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-info btn-outline-success" type="submit">Add Task</button>
      </form>

      {isLoading && <p className="text-muted text-center">Loading...</p>}
      {isError && <p className="text-danger text-center">Error: {error.message}</p>}

      <ul className="list-group">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input fs-5 border border-dark"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
            </div>
            <div className="flex-grow-1 me-3">
              {editId === todo._id ? (
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span
                  className={
                    'text-capitalize' + (todo.completed ? ' text-decoration-line-through text-muted' : '')
                  }
                >
                  {todo.title}
                </span>
              )}
            </div>
            <div className="d-flex flex-nowrap">
              {editId === todo._id ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleUpdate(todo)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => {
                      setEditId(todo._id)
                      setEditText(todo.title)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTodo({ _id: todo._id })}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
