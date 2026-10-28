
const SEARCH_API = 'https://openlibrary.org/search.json'
const COVERS_API = 'https://covers.openlibrary.org'

export async function fetchBooks(searchTerm = 'fiction') {
  const params = new URLSearchParams({
    q: searchTerm.trim() || 'fiction',
    limit: '40',
    fields: 'key,title,author_name,first_publish_year,cover_i,isbn,subject'
  })

  const response = await fetch(`${SEARCH_API}?${params}`)

  if (!response.ok) {
    throw new Error(`Open Library error: ${response.status}`)
  }

  const data = await response.json()

  const books = (data.docs || []).map(book => {
    const coverId = book.cover_i || null
    const isbn = book.isbn || []

    let coverUrl = null

    if (coverId) {
      coverUrl = `${COVERS_API}/b/id/${coverId}-L.jpg`
    } else if (isbn.length > 0) {
      coverUrl = `${COVERS_API}/b/isbn/${isbn[0]}-L.jpg`
    }

    return {
      id: book.key,
      title: book.title || 'Untitled Book',
      author: book.author_name?.[0] || 'Unknown Author',
      year: book.first_publish_year || 'Year unknown',
      coverId,
      coverUrl,
      isbn,
      subject: book.subject || []
    }
  })

  // Display books with known covers first.
  books.sort(
    (a, b) =>
      Number(Boolean(b.coverUrl)) - Number(Boolean(a.coverUrl))
  )

  return books
}
