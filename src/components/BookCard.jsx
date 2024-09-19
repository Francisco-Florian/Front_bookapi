import { Book, Trash2, Edit } from 'lucide-react'
import PropTypes from 'prop-types'

function BookCard({ book, onDelete, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Book className="w-12 h-12 text-amber-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            {book.author && <p className="text-gray-600">{book.author}</p>}
            <p className="text-gray-500 text-sm">Publié en {book.year}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(book)}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            aria-label="Modifier le livre"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label="Supprimer le livre"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string, // Assurez-vous que `author` est une chaîne de caractères
    year: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default BookCard
