
import './style.css'

const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-growth',
    color: 'bg-[#dce8d5]',
    coverColor: 'text-[#294c36]',
    description: 'Tiny changes, remarkable results.'
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    color: 'bg-[#e9dfc9]',
    coverColor: 'text-[#79532d]',
    description: 'A story of dreams and desire.'
  },
  {
    id: 3,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    color: 'bg-[#d9e6e9]',
    coverColor: 'text-[#315c68]',
    description: 'Follow your own personal legend.'
  },
  {
    id: 4,
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Memoir',
    color: 'bg-[#e9d9d2]',
    coverColor: 'text-[#854b3e]',
    description: 'A powerful journey of discovery.'
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Classic',
    color: 'bg-[#f3dce5]',
    coverColor: 'text-[#81445b]',
    description: 'Love, pride, and second chances.'
  },
  {
    id: 6,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fiction',
    color: 'bg-[#e4dfc8]',
    coverColor: 'text-[#5e5930]',
    description: 'An unexpected journey begins.'
  },
  {
    id: 7,
    title: 'Becoming',
    author: 'Michelle Obama',
    category: 'Memoir',
    color: 'bg-[#e8d9d0]',
    coverColor: 'text-[#754b3c]',
    description: 'A story of identity and purpose.'
  },
  {
    id: 8,
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Self-growth',
    color: 'bg-[#dce6ec]',
    coverColor: 'text-[#31516b]',
    description: 'Learn to focus without distraction.'
  },
  {
    id: 9,
    title: 'Little Women',
    author: 'Louisa May Alcott',
    category: 'Classic',
    color: 'bg-[#f0e0d4]',
    coverColor: 'text-[#80553e]',
    description: 'Family, friendship, and growing up.'
  },
  {
    id: 10,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    color: 'bg-[#dedcf0]',
    coverColor: 'text-[#51447c]',
    description: 'Explore the lives you could have lived.'
  },
  {
    id: 11,
    title: 'Man’s Search for Meaning',
    author: 'Viktor E. Frankl',
    category: 'Self-growth',
    color: 'bg-[#e5e2d8]',
    coverColor: 'text-[#56513d]',
    description: 'Discover meaning through difficult times.'
  },
  {
    id: 12,
    title: 'I Know Why the Caged Bird Sings',
    author: 'Maya Angelou',
    category: 'Memoir',
    color: 'bg-[#f1dce0]',
    coverColor: 'text-[#854553]',
    description: 'A moving story of resilience and hope.'
  }
]

function renderBooks(bookList) {
  const grid = document.querySelector('#book-grid')
  const resultCount = document.querySelector('#result-count')

  resultCount.textContent = `Showing ${bookList.length} ${bookList.length === 1 ? 'book' : 'books'}`

  if (bookList.length === 0) {
    grid.innerHTML = `
      <p class="col-span-full py-12 text-center text-stone-500">
        No books found. Try another search or category.
      </p>
    `
    return
  }

  grid.innerHTML = bookList.map((book) => `
    <article class="group">
      <div class="${book.color} flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl p-5 transition-transform duration-300 group-hover:-translate-y-1">
        <div class="flex h-full w-full flex-col items-center justify-center border border-current/20 p-4 text-center ${book.coverColor}">
          <h3 class="text-2xl font-bold leading-tight">${book.title}</h3>
          <div class="my-4 h-px w-10 bg-current/40"></div>
          <p class="text-xs uppercase tracking-widest">${book.author}</p>
          <p class="mt-4 text-sm italic">${book.description}</p>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-widest text-green-800">${book.category}</p>
        <h3 class="mt-1 text-xl font-semibold text-stone-900">${book.title}</h3>
        <p class="mt-1 text-sm text-stone-500">${book.author}</p>
      </div>
    </article>
  `).join('')
}

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-[#FFF0F5] text-stone-900">

    <header class="border-b border-pink-100 bg-[#FFF0F5]">
      <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-10">
        <a href="#home" class="text-lg font-bold tracking-tight text-green-950">
          Your Digital Library
        </a>

        <div class="hidden items-center gap-8 text-sm text-stone-600 md:flex">
          <a href="#home" class="font-semibold text-green-900">Home</a>
          <a href="#discover" class="transition hover:text-green-900">Discover</a>
          <a href="#favorites" class="transition hover:text-green-900">Favorites</a>
          <a href="#about" class="transition hover:text-green-900">About</a>
        </div>

        <a href="#discover" class="rounded-full bg-green-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800">
          Explore books
        </a>
      </nav>
    </header>

    <main>
      <section id="home" class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">

        <div>
          <p class="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-green-800">
            <span class="h-px w-8 bg-green-800"></span>
            A little space for big ideas
          </p>

          <h1 class="max-w-xl font-serif text-5xl font-medium leading-[1.1] tracking-tight text-black sm:text-6xl lg:text-7xl">
            Find your next favorite story.
          </h1>

          <p class="mt-6 max-w-lg text-base leading-7 text-stone-600 md:text-lg">
            Discover new worlds, revisit timeless classics, and build a collection of books that feel like they were made for you.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#discover" class="rounded-full bg-green-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
              Discover books
            </a>

            <a href="#about" class="rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-green-800 hover:text-green-900">
              About the library
            </a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-md">
          <div class="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#f8dce5] sm:-right-5 sm:-top-5"></div>

          <div class="relative rounded-[2rem] bg-[#f8dce5] p-6 sm:p-10">
            <div class="mx-auto mt-7 flex max-w-xs -rotate-3 gap-3">
              <div class="flex aspect-[3/4] flex-1 flex-col justify-between rounded-sm bg-[#294c36] p-4 text-[#f4ecd9] shadow-xl">
                <span class="text-xs uppercase tracking-widest">A classic</span>
                <span class="text-2xl font-bold">The Art of Reading</span>
                <span class="text-xs">A journey between pages</span>
              </div>

              <div class="mt-8 flex aspect-[3/4] flex-1 flex-col justify-between rounded-sm bg-[#d5b98c] p-4 text-[#49351f] shadow-xl">
                <span class="text-xs uppercase tracking-widest">Explore</span>
                <span class="text-2xl font-bold">New Worlds</span>
                <span class="text-xs">Stories to remember</span>
              </div>
            </div>

            <p class="mt-8 text-center text-xl italic text-green-950">
              "One more chapter..."
            </p>
          </div>
        </div>
      </section>

      <section id="discover" class="border-t border-pink-100 bg-[#fff8fa] px-5 py-16 md:px-10 md:py-20">
        <div class="mx-auto max-w-7xl">

          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-green-800">
              Your next read
            </p>

            <h2 class="mt-3 text-4xl font-medium tracking-tight text-green-950 sm:text-5xl">
              A world of books
            </h2>

            <p class="mt-3 text-stone-500">
              A few good places to start your next adventure.
            </p>
          </div>

          <form id="search-form" class="mt-8">
            <label for="book-search" class="mb-2 block text-sm font-semibold text-stone-700">
              Search books
            </label>

            <div class="flex flex-col gap-3 sm:flex-row">
              <input
                id="book-search"
                type="search"
                placeholder="Enter a book title or author's name..."
                aria-label="Search books by title or author"
                class="min-w-0 flex-1 rounded-xl border border-pink-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
              />

              <button
                type="submit"
                class="rounded-xl bg-green-950 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </form>

          <div class="mt-7">
            <h3 class="mb-4 text-sm font-semibold text-stone-700">
              Browse by category
            </h3>

            <div class="flex flex-wrap gap-3" id="category-filters">
              <button type="button" data-category="All" aria-pressed="true" class="rounded-full bg-green-950 px-5 py-2.5 text-sm font-medium text-white transition">
                All Books
              </button>

              <button type="button" data-category="Fiction" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-green-800 hover:text-green-900">
                Fiction
              </button>

              <button type="button" data-category="Classic" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-green-800 hover:text-green-900">
                Classic
              </button>

              <button type="button" data-category="Memoir" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-green-800 hover:text-green-900">
                Memoir
              </button>

              <button type="button" data-category="Self-growth" aria-pressed="false" class="rounded-full border border-pink-100 bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-green-800 hover:text-green-900">
                Self-growth
              </button>
            </div>
          </div>

          <p id="result-count" class="mt-8 text-sm text-stone-500" aria-live="polite"></p>

          <div id="book-grid" class="mt-5 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4"></div>

          <p class="mt-12 text-center text-sm text-stone-500">
            Discover books, explore categories, and find your next favorite read.
          </p>
        </div>
      </section>

      <section id="about" class="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div class="rounded-3xl bg-[#f8dce5] px-6 py-10 text-center sm:px-12 sm:py-14">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-green-800">
            A library for everyone
          </p>

          <h2 class="mx-auto mt-4 max-w-2xl text-3xl font-medium text-green-950 sm:text-4xl">
            Every great journey begins with a page.
          </h2>

          <p class="mx-auto mt-4 max-w-xl leading-7 text-stone-600">
            Your Digital Library helps you explore books, discover your next read, and keep track of the stories you love.
          </p>
        </div>
      </section>
    </main>

    <footer class="border-t border-pink-100 px-5 py-7 md:px-10">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-semibold text-green-950">Your Digital Library</p>
        <p>Made for curious minds and lifelong readers.</p>
      </div>
    </footer>
  </div>
`

let activeCategory = 'All'
let searchTerm = ''

function updateBookList() {
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      activeCategory === 'All' || book.category === activeCategory

    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })

  renderBooks(filteredBooks)
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
      const isActive = categoryButton === button

      categoryButton.setAttribute('aria-pressed', String(isActive))
      categoryButton.classList.toggle('bg-green-950', isActive)
      categoryButton.classList.toggle('text-white', isActive)
      categoryButton.classList.toggle('border-stone-200', !isActive)
      categoryButton.classList.toggle('bg-white', !isActive)
      categoryButton.classList.toggle('text-stone-600', !isActive)
    })

    updateBookList()
  })
})

updateBookList()
