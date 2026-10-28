
import './style.css'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite
} from './favorites.js'

const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'Self-growth', color: 'bg-[#dce8d5]', coverColor: 'text-[#294c36]', description: 'Tiny changes, remarkable results.' },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', color: 'bg-[#e9dfc9]', coverColor: 'text-[#79532d]', description: 'A story of dreams and desire.' },
  { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', color: 'bg-[#d9e6e9]', coverColor: 'text-[#315c68]', description: 'Follow your own personal legend.' },
  { id: 4, title: 'Educated', author: 'Tara Westover', category: 'Memoir', color: 'bg-[#e9d9d2]', coverColor: 'text-[#854b3e]', description: 'A powerful journey of discovery.' },
  { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Classic', color: 'bg-[#f3dce5]', coverColor: 'text-[#81445b]', description: 'Love, pride, and second chances.' },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', color: 'bg-[#e4dfc8]', coverColor: 'text-[#5e5930]', description: 'An unexpected journey begins.' },
  { id: 7, title: 'Becoming', author: 'Michelle Obama', category: 'Memoir', color: 'bg-[#e8d9d0]', coverColor: 'text-[#754b3c]', description: 'A story of identity and purpose.' },
  { id: 8, title: 'Deep Work', author: 'Cal Newport', category: 'Self-growth', color: 'bg-[#dce6ec]', coverColor: 'text-[#31516b]', description: 'Learn to focus without distraction.' },
  { id: 9, title: 'Little Women', author: 'Louisa May Alcott', category: 'Classic', color: 'bg-[#f0e0d4]', coverColor: 'text-[#80553e]', description: 'Family, friendship, and growing up.' },
  { id: 10, title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiction', color: 'bg-[#dedcf0]', coverColor: 'text-[#51447c]', description: 'Explore the lives you could have lived.' },
  { id: 11, title: 'Man’s Search for Meaning', author: 'Viktor E. Frankl', category: 'Self-growth', color: 'bg-[#e5e2d8]', coverColor: 'text-[#56513d]', description: 'Discover meaning through difficult times.' },
  { id: 12, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', category: 'Memoir', color: 'bg-[#f1dce0]', coverColor: 'text-[#854553]', description: 'A moving story of resilience and hope.' }
]

let activeCategory = 'All'
let searchTerm = ''

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-[#FFF0F5] text-stone-900">
    <header class="border-b border-pink-100 bg-[#FFF0F5]">
      <nav class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-10">
        <a href="#home" data-page="home" class="text-lg font-bold text-green-950">
          Your Digital Library
        </a>

        <div class="flex flex-wrap items-center gap-4 text-sm text-stone-600 md:gap-8">
          <a href="#home" data-page="home" class="hover:text-green-900">Home</a>
          <a href="#discover" data-page="discover" class="hover:text-green-900">Discover</a>
          <a href="#favorites" data-page="favorites" class="hover:text-green-900">
            Favorites (<span id="favorite-count">0</span>)
          </a>
          <a href="#about" data-page="about" class="hover:text-green-900">About</a>
        </div>
      </nav>
    </header>

    <main>
      <section id="home" class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <p class="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-green-800">
            A little space for big ideas
          </p>
          <h1 class="max-w-xl font-serif text-5xl font-medium leading-tight text-black sm:text-6xl">
            Find your next favorite story.
          </h1>
          <p class="mt-6 max-w-lg text-base leading-7 text-stone-600">
            Discover new worlds, revisit timeless classics, and build a collection of books that feel like they were made for you.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button data-page="discover" class="rounded-full bg-green-950 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800">
              Discover books
            </button>
            <button data-page="favorites" class="rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-stone-700 hover:border-green-800">
              View my favorites
            </button>
          </div>
        </div>

        <div class="rounded-[2rem] bg-[#f8dce5] p-8 sm:p-12">
          <div class="mx-auto flex max-w-xs -rotate-3 gap-3">
            <div class="flex aspect-[3/4] flex-1 flex-col justify-between rounded-sm bg-[#294c36] p-4 text-[#f4ecd9] shadow-xl">
              <span class="text-xs uppercase">A classic</span>
              <span class="text-2xl font-bold">The Art of Reading</span>
              <span class="text-xs">A journey between pages</span>
            </div>
            <div class="mt-8 flex aspect-[3/4] flex-1 flex-col justify-between rounded-sm bg-[#d5b98c] p-4 text-[#49351f] shadow-xl">
              <span class="text-xs uppercase">Explore</span>
              <span class="text-2xl font-bold">New Worlds</span>
              <span class="text-xs">Stories to remember</span>
            </div>
          </div>
          <p class="mt-8 text-center text-xl italic text-green-950">"One more chapter..."</p>
        </div>
      </section>

      <section id="discover" class="border-t border-pink-100 bg-[#fff8fa] px-5 py-16 md:px-10">
        <div class="mx-auto max-w-7xl">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-green-800">Your next read</p>
          <h2 class="mt-3 text-4xl font-medium text-green-950">A world of books</h2>
          <p class="mt-3 text-stone-500">A few good places to start your next adventure.</p>

          <form id="search-form" class="mt-8">
            <label for="book-search" class="mb-2 block text-sm font-semibold text-stone-700">Search books</label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <input id="book-search" type="search" placeholder="Enter a book title or author's name..."
                class="min-w-0 flex-1 rounded-xl border border-pink-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-green-800" />
              <button type="submit" class="rounded-xl bg-green-950 px-8 py-3.5 text-sm font-semibold text-white hover:bg-green-800">Search</button>
            </div>
          </form>

          <div class="mt-7">
            <h3 class="mb-4 text-sm font-semibold text-stone-700">Browse by category</h3>
            <div class="flex flex-wrap gap-3" id="category-filters">
              <button type="button" data-category="All" aria-pressed="true" class="rounded-full bg-green-950 px-5 py-2.5 text-sm text-white">All Books</button>
              <button type="button" data-category="Fiction" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm">Fiction</button>
              <button type="button" data-category="Classic" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm">Classic</button>
              <button type="button" data-category="Memoir" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm">Memoir</button>
              <button type="button" data-category="Self-growth" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm">Self-growth</button>
            </div>
          </div>

          <p id="result-count" class="mt-8 text-sm text-stone-500" aria-live="polite"></p>
          <div id="book-grid" class="mt-5 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4"></div>
        </div>
      </section>

      <section id="favorites" class="hidden min-h-screen border-t border-pink-100 bg-[#FFF0F5] px-5 py-16 md:px-10">
        <div class="mx-auto max-w-7xl">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-green-800">Your personal collection</p>
          <h2 class="mt-3 text-4xl font-medium text-green-950 sm:text-5xl">My Favorite Books</h2>
          <p class="mt-3 text-stone-500">Your saved books are collected here.</p>
          <p id="favorites-count" class="mt-6 text-sm text-stone-500"></p>
          <div id="favorites-grid" class="mt-5 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4"></div>
          <button data-page="discover" class="mt-10 rounded-full bg-green-950 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800">
            Back to Discover
          </button>
        </div>
      </section>

      <section id="about" class="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div class="rounded-3xl bg-[#f8dce5] px-6 py-10 text-center sm:px-12">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-green-800">A library for everyone</p>
          <h2 class="mx-auto mt-4 max-w-2xl text-3xl font-medium text-green-950 sm:text-4xl">Every great journey begins with a page.</h2>
          <p class="mx-auto mt-4 max-w-xl leading-7 text-stone-600">
            Your Digital Library helps you explore books and keep track of the stories you love.
          </p>
        </div>
      </section>
    </main>

    <footer class="border-t border-pink-100 px-5 py-7 text-sm text-stone-500">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:justify-between">
        <p class="font-semibold text-green-950">Your Digital Library</p>
        <p>Made for curious minds and lifelong readers.</p>
      </div>
    </footer>
  </div>
`

function renderBookCards(bookList, gridSelector, favoritesMode = false) {
  const grid = document.querySelector(gridSelector)

  if (bookList.length === 0) {
    grid.innerHTML = favoritesMode
      ? `<div class="col-span-full rounded-2xl bg-white p-10 text-center">
          <p class="text-lg font-semibold text-green-950">No favorite books yet.</p>
          <p class="mt-2 text-sm text-stone-500">Go to Discover and add a book to your favorites.</p>
          <button type="button" data-page="discover" class="mt-5 rounded-full bg-green-950 px-6 py-3 text-sm font-semibold text-white">Discover books</button>
        </div>`
      : `<p class="col-span-full py-12 text-center text-stone-500">No books found. Try another search or category.</p>`
    return
  }

  grid.innerHTML = bookList.map((book) => {
    const saved = isFavorite(book.id)

    return `
      <article class="group">
        <div class="${book.color} flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-xl p-4 transition-transform duration-300 group-hover:-translate-y-1 sm:p-5">
          <div class="flex h-full w-full flex-col items-center justify-center border border-current/20 p-3 text-center ${book.coverColor} sm:p-4">
            <h3 class="text-xl font-bold leading-tight sm:text-2xl">${book.title}</h3>
            <div class="my-3 h-px w-10 bg-current/40"></div>
            <p class="text-xs uppercase tracking-widest">${book.author}</p>
            <p class="mt-3 text-sm italic">${book.description}</p>

            <button
              type="button"
              data-favorite-id="${book.id}"
              aria-pressed="${saved}"
              class="mt-5 w-full rounded-lg px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
                saved
                  ? 'bg-[#f5c6d6] text-[#702b45] hover:bg-[#efb2c7]'
                  : 'bg-green-950 text-white hover:bg-green-800'
              }"
            >
              ${saved ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>

        <div class="mt-4">
          <p class="text-xs font-semibold uppercase tracking-widest text-green-800">${book.category}</p>
          <h3 class="mt-1 text-lg font-semibold text-stone-900">${book.title}</h3>
          <p class="mt-1 text-sm text-stone-500">${book.author}</p>
        </div>
      </article>
    `
  }).join('')
}

function updateFavoriteCount() {
  const count = getFavorites().length
  document.querySelector('#favorite-count').textContent = count
  document.querySelector('#favorites-count').textContent =
    `${count} ${count === 1 ? 'favorite book' : 'favorite books'} saved`
}

function updateBookList() {
  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })

  document.querySelector('#result-count').textContent =
    `Showing ${filteredBooks.length} ${filteredBooks.length === 1 ? 'book' : 'books'}`

  renderBookCards(filteredBooks, '#book-grid')
}

function renderFavorites() {
  renderBookCards(getFavorites(), '#favorites-grid', true)
  updateFavoriteCount()
}

function showPage(page) {
  const sections = ['home', 'discover', 'favorites', 'about']

  sections.forEach((id) => {
    document.getElementById(id).classList.add('hidden')
  })

  if (page === 'home') {
    document.querySelector('#home').classList.remove('hidden')
    document.querySelector('#discover').classList.remove('hidden')
    document.querySelector('#about').classList.remove('hidden')
  } else if (page === 'discover') {
    document.querySelector('#discover').classList.remove('hidden')
  } else if (page === 'favorites') {
    document.querySelector('#favorites').classList.remove('hidden')
    renderFavorites()
  } else if (page === 'about') {
    document.querySelector('#about').classList.remove('hidden')
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault()
  searchTerm = document.querySelector('#book-search').value.trim().toLowerCase()
  updateBookList()
})

document.querySelectorAll('[data-category]').forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category

    document.querySelectorAll('[data-category]').forEach((categoryButton) => {
      const active = categoryButton === button

      categoryButton.setAttribute('aria-pressed', String(active))
      categoryButton.classList.toggle('bg-green-950', active)
      categoryButton.classList.toggle('text-white', active)
      categoryButton.classList.toggle('bg-white', !active)
      categoryButton.classList.toggle('text-stone-600', !active)
    })

    updateBookList()
  })
})

document.querySelector('#app').addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('[data-favorite-id]')

  if (favoriteButton) {
    const bookId = Number(favoriteButton.dataset.favoriteId)
    const book = books.find((item) => item.id === bookId)

    if (isFavorite(bookId)) {
      removeFavorite(bookId)
    } else if (book) {
      addFavorite(book)
    }

    updateBookList()
    renderFavorites()
    return
  }

  const pageLink = event.target.closest('[data-page]')

  if (pageLink) {
    event.preventDefault()
    showPage(pageLink.dataset.page)
  }
})

updateBookList()
renderFavorites()
showPage('home')

