import { useState, useEffect } from 'react'
import BookForm from '../components/BookForm'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import Button from '../components/Button'
import Modal from '../components/Modal'
import AuthorManager from '../components/AuthorManager'

function Home() {
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [newBook, setNewBook] = useState({ title: '', authorId: '', publishedYear: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchBooks()
    fetchAuthors()
  }, [])

  // fonction pour récupérer les livres
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books')
      const data = await response.json()
      const transformedData = data.map(item => ({ 
        id: item.id,
        title: item.title,
        authorId: item.authorId,
        year: item.publishedYear 
      }))
      setBooks(transformedData)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  // fonction pour récupérer les auteurs
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/authors')
      const data = await response.json()
      setAuthors(data)
    } catch (error) {
      console.error('Error fetching authors:', error)
    }
  }

  // fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await handleUpdateBook();
    } else {
      await handleAddBook();
    }
  };

  // fonction pour ajouter un livre
  const handleAddBook = async () => {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // Ajouter le token dans l'en-tête Authorization
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      
      if (response.ok) {
        const transformedBook = {
          id: data.id,
          title: newBook.title,
          authorId: newBook.authorId, // Ajout de authorId
          year: parseInt(newBook.publishedYear, 10),
        };
        setBooks([...books, transformedBook]);
        setNewBook({ title: '', authorId: '', publishedYear: '' }); // Réinitialisation avec authorId
      } else {
        console.error('Error adding book:', data);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // fonction pour mettre à jour un livre
  const handleUpdateBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${editingBook.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newBook),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajout du token ici aussi pour les requêtes PATCH
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const updatedBooks = books.map(book => 
          book.id === editingBook.id 
            ? { ...book, title: newBook.title, authorId: newBook.authorId, year: parseInt(newBook.publishedYear, 10) }
            : book
        );
        setBooks(updatedBooks);
        setNewBook({ title: '', authorId: '', publishedYear: '' }); // Réinitialisation avec authorId
        setEditingBook(null);
        setIsModalOpen(false);
      } else {
        console.error('Error updating book:', data);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // fonction pour supprimer un livre
  const handleDeleteBook = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajout du token pour la suppression
        },
      })
      setBooks(books.filter(book => book.id !== id))
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  // fonction pour éditer un livre
  const handleEditBook = (book) => {
    setNewBook({ title: book.title, authorId: book.authorId, publishedYear: book.year.toString() }); // Ajout de authorId
    setEditingBook(book);
    setIsModalOpen(true);
  };

  // fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setNewBook({ title: '', authorId: '', publishedYear: '' }); // Réinitialisation avec authorId
  };

  // filtrer les livres en fonction du terme de recherche
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 bg-amber-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-amber-800">Ma Bibliothèque</h1>
        <div className="space-x-4">
          <Button to="/register" className="bg-green-500 hover:bg-green-600">
            S&apos;inscrire
          </Button>
          <Button to="/login" className="bg-blue-500 hover:bg-blue-600">
            Se connecter
          </Button>
        </div>
      </div>
      
      <AuthorManager /> {/* Ajout du composant AuthorManager */}
      
      <BookForm 
        newBook={newBook} 
        setNewBook={setNewBook} 
        handleSubmit={handleSubmit}
        isEditing={false}
        authors={authors}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList 
        books={filteredBooks} 
        authors={authors} 
        onDeleteBook={handleDeleteBook}
        onEditBook={handleEditBook}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold mb-4">Modifier le livre</h2>
        <BookForm 
          newBook={newBook} 
          setNewBook={setNewBook} 
          handleSubmit={handleSubmit}
          isEditing={true}
          authors={authors}
        />
      </Modal>
    </div>
  )
}

export default Home