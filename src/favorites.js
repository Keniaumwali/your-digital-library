
const STORAGE_KEY = 'digital-library-favorites'

// Get saved favorite books from localStorage
export function getFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY)
    return savedFavorites ? JSON.parse(savedFavorites) : []
  } catch (error) {
    console.error('Could not load favorites:', error)
    return []
  }
}

// Save favorite books to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites()

  const alreadyFavorite = favorites.some(
    (favorite) => favorite.id === book.id
  )

  if (alreadyFavorite) {
    return favorites
  }

  const updatedFavorites = [...favorites, book]
  saveFavorites(updatedFavorites)

  return updatedFavorites
}

// Remove a book from favorites
export function removeFavorite(bookId) {
  const favorites = getFavorites()

  const updatedFavorites = favorites.filter(
    (book) => book.id !== Number(bookId)
  )

  saveFavorites(updatedFavorites)

  return updatedFavorites
}

// Check whether a book is already a favorite
export function isFavorite(bookId) {
  return getFavorites().some(
    (book) => book.id === Number(bookId)
  )
}
