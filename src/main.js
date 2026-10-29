
import './style.css'
import { fetchBooks } from './fetchBooks.js'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite
} from './favorites.js'

const app = document.querySelector('#app')

let allBooks = []
let searchTerm = ''
let activeCategory = 'all'
let showFavorites = false
let loading = false
let errorMessage = ''

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char])
}

function getBookId(book) {
  return String(book.id ?? book.key ?? '')
}

function getCoverURL(book) {
  if (book.coverId) {
    return `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
  }

  if (book.coverUrl) {
    return book.coverUrl
  }

  if (book.isbn?.length) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
  }

  return ''
}

function renderHeader() {
  return `
    <header class="border-b border-pink-100 bg-[#FFF0F5]">
      <nav class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-10">
        <a href="#home" id="homeLink"
          class="text-xl font-bold text-green-950">
          Your Digital Library
        </a>

        <div class="flex flex-wrap items-center gap-4 text-sm text-stone-600">
          <button type="button" data-page="home">Home</button>
          <button type="button" data-page="discover">Discover</button>
          <button type="button" data-page="favorites">
            Favorites (${getFavorites().length})
          </button>
          <button type="button" data-page="about">About</button>
        </div>
      </nav>
    </header>
  `
}

function renderSearch() {
  const categories = [
    'all', 'fiction', 'fantasy', 'science', 'history', 'romance'
  ]

  return `
    <section class="mx-auto max-w-7xl px-5 py-8 md:px-10">
      <div class="rounded-2xl bg-[#f8dce5] px-6 py-8 md:px-10">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-green-800">
          Explore Open Library
        </p>

        <h1 class="mb-3 text-3xl font-bold text-green-950 md:text-4xl">
          Find your next favorite book
        </h1>

        <p class="mb-6 text-stone-600">
          Discover books, explore new stories, and save your favorites.
        </p>

        <form id="searchForm" class="flex flex-col gap-3 sm:flex-row">
          <input
            id="searchInput"
            type="search"
            value="${escapeHTML(searchTerm)}"
            placeholder="Search by book title..."
            aria-label="Search books by title"
            class="min-w-0 flex-1 rounded-xl border border-pink-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-green-800"
          />

          <button type="submit"
            class="rounded-xl bg-green-950 px-6 py-3 font-semibold text-white hover:bg-green-800">
            Search Books
          </button>
        </form>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        ${categories.map(category => `
          <button
            type="button"
            data-category="${category}"
            aria-pressed="${activeCategory === category}"
            class="rounded-full border px-4 py-2 capitalize ${
              activeCategory === category
                ? 'border-green-950 bg-green-950 text-white'
                : 'border-pink-200 bg-white text-stone-700 hover:border-green-800'
            }">
            ${category === 'all' ? 'All Books' : category}
          </button>
        `).join('')}
      </div>
    </section>
  `
}

function renderBookCard(book) {
  const id = getBookId(book)
  const title = escapeHTML(book.title || 'Untitled Book')
  const author = escapeHTML(book.author || 'Unknown Author')
  const year = escapeHTML(book.year || 'Year unknown')
  const coverURL = getCoverURL(book)
  const favorite = isFavorite(id)

  return `
    <article class="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div class="book-cover-container flex h-72 items-center justify-center overflow-hidden bg-[#fff8fa]">
        ${
          coverURL
            ? `<img
                src="${escapeHTML(coverURL)}"
                alt="Cover of ${title}"
                class="book-cover block h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />`
            : `<div class="flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center">
                <p class="font-semibold text-green-950">${title}</p>
                <p class="text-sm text-stone-500">No cover available</p>
              </div>`
        }
      </div>

      <div class="p-4">
        <h2 class="mb-2 line-clamp-2 text-lg font-bold text-green-950">${title}</h2>
        <p class="mb-1 text-sm text-stone-600">By ${author}</p>
        <p class="mb-4 text-sm text-stone-500">${year}</p>

        <button
          type="button"
          data-favorite-id="${escapeHTML(id)}"
          class="w-full rounded-lg border px-3 py-2 font-semibold ${
            favorite
              ? 'border-pink-200 bg-pink-50 text-pink-800'
              : 'border-green-200 bg-green-50 text-green-900'
          }">
          ${favorite ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
      </div>
    </article>
  `
}

function renderBooks() {
  const grid = document.querySelector('#bookGrid')
  const status = document.querySelector('#bookStatus')

  if (!grid || !status) return

  // Exercise 3.4: Show a spinner while books are loading.
  if (loading) {
    status.innerHTML = `
      <div role="status" aria-live="polite"
        class="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-green-950"
          aria-hidden="true"></div>
        <p class="font-semibold text-green-950">
          Loading books from Open Library...
        </p>
        <p class="text-sm text-stone-500">
          Please wait while we find your books.
        </p>
      </div>
    `
    grid.innerHTML = ''
    return
  }

  // Exercise 3.4: Show a useful message if the API request fails.
  if (errorMessage) {
    status.innerHTML = `
      <div role="alert"
        class="mx-auto max-w-xl py-10 text-center">
        <p class="mb-2 text-lg font-semibold text-red-700">
          Unable to load books
        </p>
        <p class="mb-5 text-stone-600">
          ${escapeHTML(errorMessage)}
        </p>
        <button id="retryButton" type="button"
          class="rounded-xl bg-green-950 px-6 py-3 font-semibold text-white hover:bg-green-800">
          Try Again
        </button>
      </div>
    `
    grid.innerHTML = ''
    return
  }

  let books = showFavorites ? getFavorites() : allBooks

  if (searchTerm && showFavorites) {
    books = books.filter(book =>
      (book.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (activeCategory !== 'all') {
    books = books.filter(book =>
      (book.subject || []).some(subject =>
        subject.toLowerCase().includes(activeCategory)
      )
    )
  }

  // Exercise 3.4: Show a message when no books match.
  if (!books.length) {
    status.innerHTML = `
      <div role="status" aria-live="polite"
        class="py-12 text-center">
        <p class="mb-3 text-4xl" aria-hidden="true"></p>
        <h2 class="mb-2 text-xl font-bold text-green-950">
          ${showFavorites ? 'No favorite books yet' : 'No results found'}
        </h2>
        <p class="text-stone-600">
          ${showFavorites
            ? 'Explore the library and add books to your favorites.'
            : 'We could not find any books matching your search. Try another title or category.'}
        </p>
      </div>
    `
    grid.innerHTML = ''
    return
  }

  status.innerHTML = `
    <p class="mb-4 text-sm text-stone-500" aria-live="polite">
      Showing ${books.length} ${books.length === 1 ? 'book' : 'books'}
    </p>
  `

  grid.innerHTML = books.map(renderBookCard).join('')

  grid.querySelectorAll('.book-cover').forEach(img => {
    img.addEventListener('error', () => {
      const container = img.closest('.book-cover-container')
      if (!container) return

      const fallback = document.createElement('div')
      fallback.className =
        'flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center'

      const title = document.createElement('p')
      title.className = 'font-semibold text-green-950'
      title.textContent = img.alt.replace('Cover of ', '')

      const message = document.createElement('p')
      message.className = 'text-sm text-stone-500'
      message.textContent = 'Cover unavailable'

      fallback.append(title, message)
      container.replaceChildren(fallback)
    }, { once: true })
  })
}

function render() {
  app.innerHTML = `
    <div class="min-h-screen bg-[#FFF0F5] text-stone-900">
      ${renderHeader()}

      <main>
        <section id="home" class="mx-auto max-w-7xl px-5 py-12 md:px-10">
          <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-green-800">
            A little space for big ideas
          </p>
          <h1 class="max-w-2xl font-serif text-4xl font-medium text-green-950 sm:text-6xl">
            Find your next favorite story.
          </h1>
          <p class="mt-5 max-w-xl leading-7 text-stone-600">
            Search real book data from Open Library, discover new reads, and save your favorites.
          </p>
          <button type="button" data-page="discover"
            class="mt-6 rounded-full bg-green-950 px-6 py-3 font-semibold text-white">
            Discover books
          </button>
        </section>

        <section id="discover" class="border-t border-pink-100 bg-[#fff8fa] py-8">
          ${renderSearch()}
          <div class="mx-auto max-w-7xl px-5 pb-12 md:px-10">
            <div id="bookStatus"></div>
            <div id="bookGrid"
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            </div>
          </div>
        </section>

        <section id="favoritesPage" class="hidden min-h-96 px-5 py-10 md:px-10">
          <h2 class="mb-6 text-3xl font-bold text-green-950">My Favorite Books</h2>
          <div id="favoritesStatus"></div>
          <div id="favoritesGrid"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          </div>
        </section>

        <section id="about" class="px-5 py-12 md:px-10">
          <div class="mx-auto max-w-3xl rounded-3xl bg-[#f8dce5] px-6 py-10 text-center">
            <h2 class="text-3xl font-bold text-green-950">About Your Digital Library</h2>
            <p class="mt-4 leading-7 text-stone-600">
              A responsive book explorer powered by the Open Library API.
              Search books, view available covers, and keep your favorite books saved.
            </p>
            <a href="https://openlibrary.org/" target="_blank" rel="noreferrer"
              class="mt-4 inline-block text-green-900 underline">
              Visit Open Library
            </a>
          </div>
        </section>
      </main>

      <footer class="border-t border-pink-100 px-5 py-7 text-center text-sm text-stone-500">
        Your Digital Library · Book information from Open Library
      </footer>
    </div>
  `

  renderBooks()

  document.querySelector('#searchForm')?.addEventListener('submit', event => {
    event.preventDefault()
    searchTerm = document.querySelector('#searchInput').value.trim()
    showFavorites = false
    loadBooks(searchTerm || 'fiction')
  })

  document.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category
      render()
    })
  })

  document.querySelector('#retryButton')?.addEventListener('click', () => {
    loadBooks(searchTerm || 'fiction')
  })
}

function renderFavoritesPage() {
  const grid = document.querySelector('#favoritesGrid')
  const status = document.querySelector('#favoritesStatus')
  const favorites = getFavorites()

  if (!favorites.length) {
    status.innerHTML = `
      <p class="mb-5 text-stone-600">
        No favorites saved yet. Add books from Discover.
      </p>
    `
    grid.innerHTML = ''
    return
  }

  status.innerHTML = `
    <p class="mb-5 text-sm text-stone-500">
      ${favorites.length} saved books
    </p>
  `
  grid.innerHTML = favorites.map(renderBookCard).join('')

  grid.querySelectorAll('.book-cover').forEach(img => {
    img.addEventListener('error', () => {
      img.replaceWith(document.createTextNode('Cover unavailable'))
    }, { once: true })
  })
}

app.addEventListener('click', event => {
  const favoriteButton = event.target.closest('[data-favorite-id]')

  if (favoriteButton) {
    const id = favoriteButton.dataset.favoriteId
    const book = [...allBooks, ...getFavorites()].find(
      item => getBookId(item) === id
    )

    if (!book) return

    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite({ ...book, id, coverUrl: getCoverURL(book) })
    }

    render()
    return
  }

  const pageButton = event.target.closest('[data-page]')

  if (pageButton) {
    const page = pageButton.dataset.page
    const home = document.querySelector('#home')
    const discover = document.querySelector('#discover')
    const favoritesPage = document.querySelector('#favoritesPage')
    const about = document.querySelector('#about')

    home.classList.toggle('hidden', page !== 'home')
    discover.classList.toggle('hidden', page !== 'home' && page !== 'discover')
    favoritesPage.classList.toggle('hidden', page !== 'favorites')
    about.classList.toggle('hidden', page !== 'home' && page !== 'about')

    if (page === 'favorites') renderFavoritesPage()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

async function loadBooks(query = 'fiction') {
  loading = true
  errorMessage = ''
  render()

  try {
    allBooks = await fetchBooks(query)
  } catch (error) {
    console.error('Failed to fetch books:', error)
    errorMessage =
      'We could not load books from Open Library. Check your internet connection and try again.'
  } finally {
    loading = false
    render()
  }
}

render()
loadBooks('fiction')
