import BookCard from './BookCard'
import PropTypes from 'prop-types'

function BookList({ books, onDeleteBook, onEditBook }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <BookCard 
          key={book.id} 
          book={book} 
          onDelete={onDeleteBook}
          onEdit={onEditBook}
        />
      ))}
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      year: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  onEditBook: PropTypes.func.isRequired,
}

export default BookList