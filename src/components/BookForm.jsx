import PropTypes from 'prop-types'
import { PlusCircle, Save } from 'lucide-react'

function BookForm({ newBook, setNewBook, handleSubmit, isEditing = false, authors = [] }) {
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  // Ajout d'une vérification pour newBook
  if (!newBook) {
    return <div>Chargement...</div>
  }

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-amber-700">
        {isEditing ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">Auteur</label>
          <select
            id="authorId"
            name="authorId"
            value={newBook.authorId || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            required
          >
            <option value="">Sélectionnez un auteur</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">Année de publication</label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={newBook.publishedYear || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
          {isEditing ? (
            <>
              <Save className="w-5 h-5 mr-2" />
              Sauvegarder les modifications
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-2" />
              Ajouter le livre
            </>
          )}
        </button>
      </form>
    </div>
  )
}

BookForm.propTypes = {
  newBook: PropTypes.shape({
    title: PropTypes.string,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    publishedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setNewBook: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
}

export default BookForm