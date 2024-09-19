import { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react'

function AuthorManager() {
  const [authors, setAuthors] = useState([])
  const [newAuthor, setNewAuthor] = useState({ name: '' })
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/api/authors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch authors')
      }
      const data = await response.json()
      setAuthors(data)
    } catch (error) {
      console.error('Error fetching authors:', error)
      setError('Failed to load authors. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingAuthor) {
      await handleUpdateAuthor()
    } else {
      await handleAddAuthor()
    }
  }

  const handleAddAuthor = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newAuthor),
      })
      if (!response.ok) {
        throw new Error('Failed to add author')
      }
      await response.json()

      // Récupérer la liste complète des auteurs après ajout
      await fetchAuthors()

      // Réinitialiser le formulaire
      setNewAuthor({ name: '' })
    } catch (error) {
      console.error('Error adding author:', error)
      setError('Failed to add author. Please try again.')
    }
  }

  const handleUpdateAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/authors/${editingAuthor.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newAuthor),
      })
      if (!response.ok) {
        throw new Error('Failed to update author')
      }
      await response.json()

      // Récupérer la liste complète des auteurs après mise à jour
      await fetchAuthors()

      // Réinitialiser le formulaire
      setNewAuthor({ name: '' })
      setEditingAuthor(null)
    } catch (error) {
      console.error('Error updating author:', error)
      setError('Failed to update author. Please try again.')
    }
  }

  const handleDeleteAuthor = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/authors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to delete author')
      }
      setAuthors(authors.filter(author => author.id !== id))
    } catch (error) {
      console.error('Error deleting author:', error)
      setError('Failed to delete author. Please try again.')
    }
  }

  const handleEditAuthor = (author) => {
    setNewAuthor({ name: author.name })
    setEditingAuthor(author)
  }

  if (isLoading) {
    return <div className="text-center">Loading authors...</div>
  }

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-amber-700">Gérer les auteurs</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newAuthor.name}
            onChange={(e) => setNewAuthor({ name: e.target.value })}
            placeholder="Nom de l'auteur"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            {editingAuthor ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Modifier
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                Ajouter
              </>
            )}
          </button>
          {editingAuthor && (
            <button
              type="button"
              onClick={() => {
                setNewAuthor({ name: '' })
                setEditingAuthor(null)
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <X className="w-5 h-5 mr-2" />
              Annuler
            </button>
          )}
        </div>
      </form>
      {authors.length === 0 ? (
        <p className="text-gray-500">Aucun auteur trouvé. Ajoutez-en un pour commencer.</p>
      ) : (
        <ul className="space-y-2">
          {authors.map((author) => (
            <li key={author.id} className="flex items-center justify-between">
              <span>{author.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditAuthor(author)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAuthor(author.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AuthorManager
